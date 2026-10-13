"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isPageKey, pageInfo, pageKeys } from "@/content";
import {
  SESSION_COOKIE,
  checkCredentials,
  clearFailures,
  clientAddress,
  cookieSecure,
  createSessionToken,
  lockedFor,
  recordFailure,
  requireAdmin,
} from "@/lib/admin-auth";
import { resetPageContent, restoreBackup, savePageContent } from "@/lib/content-store";

export type LoginState = { error?: string };

export async function login(_prev: LoginState, form: FormData): Promise<LoginState> {
  const ip = await clientAddress();
  const wait = lockedFor(ip);
  if (wait) return { error: `Too many wrong attempts. Try again in ${wait} minute${wait === 1 ? "" : "s"}.` };

  const username = String(form.get("username") ?? "");
  const password = String(form.get("password") ?? "");
  if (!checkCredentials(username, password)) {
    recordFailure(ip);
    return { error: "Wrong username or password." };
  }
  clearFailures(ip);
  const { token, expires } = createSessionToken();
  (await cookies()).set(SESSION_COOKIE, token, { httpOnly: true, secure: cookieSecure(), sameSite: "lax", path: "/", expires });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

// Rebuild every public page so the new text shows straight away
function refreshSite(pageKey?: keyof typeof pageInfo) {
  revalidatePath("/", "layout");
  const paths = pageKey ? pageInfo[pageKey].paths : pageKeys.flatMap((key) => pageInfo[key].paths);
  for (const path of new Set(paths)) revalidatePath(path);
}

export type SaveResult = { ok: true; savedAt: string } | { ok: false; error: string };

export async function savePage(pageKey: string, value: unknown): Promise<SaveResult> {
  await requireAdmin();
  if (!isPageKey(pageKey)) return { ok: false, error: "Unknown page." };
  try {
    await savePageContent(pageKey, value);
    refreshSite(pageKey);
    return { ok: true, savedAt: new Date().toISOString() };
  } catch (e) {
    console.error("Admin save failed", e);
    return { ok: false, error: "Could not save. Check that the server can write to the content folder." };
  }
}

export async function resetPage(pageKey: string) {
  await requireAdmin();
  if (!isPageKey(pageKey)) return;
  await resetPageContent(pageKey);
  refreshSite(pageKey);
  redirect(`/admin/pages/${pageKey}?reset=1`);
}

export async function restoreVersion(form: FormData) {
  await requireAdmin();
  await restoreBackup(String(form.get("id") ?? ""));
  refreshSite();
  redirect("/admin?restored=1");
}
