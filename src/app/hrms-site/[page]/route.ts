// Serves the HRMS subdomain pages from their templates, filled with the text saved in the admin dashboard.
import { readFileSync } from "node:fs";
import path from "node:path";
import { getPageContent } from "@/lib/content-store";
import { renderHrmsTemplate } from "@/lib/hrms-template";

export const dynamic = "force-dynamic";

const PAGES = ["home", "hr", "it"];

const SIZES = [50, 100, 250, 500];

// HR estimator: the monthly numbers for each company size. The assumptions are written on the page.
function hrSizes() {
  return SIZES.map((people) => ({
    label: `${people} people`,
    hrs: Math.round((people * 25) / 60),
    requests: people * 2,
    approvals: Math.round((people * 15) / 60),
  }));
}

// IT estimator: the monthly numbers for each company size. The assumptions are written on the page.
function itSizes() {
  return SIZES.map((people) => {
    const ticketHrs = Math.round((people * 0.5 * 10) / 60);
    const assetHrs = Math.round((people * 3) / 60);
    const onboardHrs = Math.max(1, Math.round(people * 0.02));
    return { label: `${people} people`, ticketHrs, assetHrs, onboardHrs, totalHrs: ticketHrs + assetHrs + onboardHrs };
  });
}

export async function GET(_request: Request, { params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  if (!PAGES.includes(page)) return new Response("Not Found", { status: 404 });

  const template = readFileSync(path.join(process.cwd(), "src", "hrms-templates", `${page}.html`), "utf8");
  const content = getPageContent("hrms") as unknown as { pages?: Record<string, Record<string, unknown>> };
  const data: Record<string, unknown> = { ...(content.pages?.[page] ?? {}) };
  if (page === "hr") data.sizes = hrSizes();
  if (page === "it") data.sizes = itSizes();
  const html = renderHrmsTemplate(template, data);
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
  });
}
