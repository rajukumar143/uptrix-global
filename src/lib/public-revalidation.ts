import "server-only";

export async function revalidatePublic(paths: string[]) {
  if (process.env.APP_MODE === "all" && process.env.NODE_ENV === "development") return;

  const siteUrl = process.env.PUBLIC_SITE_URL;
  const secret = process.env.ADMIN_API_SECRET;
  if (!siteUrl || !secret || secret.length < 32) {
    throw new Error("Public cache revalidation is not configured.");
  }

  const publicUrl = new URL(siteUrl);
  if (
    publicUrl.protocol !== "https:" ||
    publicUrl.pathname !== "/" ||
    publicUrl.search ||
    publicUrl.hash ||
    publicUrl.username ||
    publicUrl.password
  ) {
    throw new Error("PUBLIC_SITE_URL must be an HTTPS origin without a path.");
  }

  const response = await fetch(new URL("/api/revalidate", publicUrl), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ paths }),
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error(`Public cache revalidation returned ${response.status}.`);
}
