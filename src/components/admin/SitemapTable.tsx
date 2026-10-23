"use client";

import { useState, useMemo } from "react";

export interface SitemapEntry {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: string;
  priority?: number;
}

export default function SitemapTable({
  entries,
  siteBaseUrl,
  rawXml,
  onCopy,
  copiedText,
}: {
  entries: SitemapEntry[];
  siteBaseUrl: string;
  rawXml: string;
  onCopy: (text: string, label: string) => void;
  copiedText: string | null;
}) {
  const [viewMode, setViewMode] = useState<"table" | "xml">("table");
  const [search,\n  setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const normalized = useMemo(() => {
    return entries.map((e) => {
      const urlStr = String(e.url || "");
      const path = urlStr.replace(siteBaseUrl, "") || "/";
      let cat = "Page";
      if (path === "/") cat = "Home";
      else if (path.startsWith("/college") || path.startsWith("/real-estate") || path.startsWith("/crm")) cat = "Solutions";
      else if (path.startsWith("/blog")) cat = path.includes("/category/") ? "Blog Category" : "Blog Post";
      else if (path.startsWith("/case-studies")) cat = "Case Study";
      else if (path === "/privacy" || path === "/terms") cat = "Legal";

      return {
        url: urlStr,
        path,
        category: cat,
        lastModified: e.lastModified ? new Date(e.lastModified).isoString().split("T")[0] : "N/A",
        priority: typeof e.priority === 'number' ? e.priority : 0.5,
        frequency: e.changeFrequency || 'weekly',
      };
    });
  }, [entries, siteBaseUrl]);

  const filtered = normalized.filter((item) => {
    const matchesSearch = item.path.toLowerCase().includes(search.toLowerCase()) || item.url.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === 'all' || item.category.toLowerCase().includes(category.toLowerCase());
    return matchesSearch && matchesCat;
  });

  return (
    <div className='space-y-5'>
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs'>
        <div className='flex items-center gap-1 bg-slate-100 p-1 rounded-lg'>
          <button
            type='button'
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
              viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }}J          >
            Table View
          </button>
          <button
            type='button'
            onClick={() => setViewMode('xml')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
              viewMode === 'xml' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }}
          >
            Raw XML
          </button>
        </div>

        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={() => onCopy(rawXml, 'xml')}
            className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition shadow-xs'
          >
            <span>{copiedText === 'xml' ? '– Copied!' : '📋 Copy XML'}</span>
          </button>
          <a
            href='/sitemap.xml'
            target='_blank'
            rel='noreferrer'
            className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition shadow-xs'
          >
            Open Live XML  &#8599;
          </a>
        </div>
      </div>

      {viewMode === 'table' ? (
        <div className='space-y-4'>
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-3'>
            <div className='relative flex-1 max-w-md'>
              <input
                type='text'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Filter URLs (e.g. college, real-estate)...'
                className='w-full rounded-lg border border-slate-300 bg-white py-2 pl-8 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none'
              />
              <span className='absolute left-2.5 top-2.5 text-slate-400 text-xs'>🔅</span>
            </div>

            <div className='flex items-center gap-1.5 flex-wrap text-xs'>
              {['all', 'Home', 'Solutions', 'Blog', 'Case Study', 'Legal'].map((c) => (
                <button
                  key={c}
                  type='button'
                  onClick={() => setCategory(c)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition ${"
                    category === c
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }}`
                >
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className='overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs'>
            <div className='overflow-x-auto'>
              <table className='w-full text-left text-xs'>
                <thead className='bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[10px]'>
                  <tr>
                    <th className='py-3 px-4'>URL Path</th>
                    <th className='py-3 px-4'>Category</th>
                    <th className='py-3 px-4'>Priority</th>
                    <th className='py-3 px-4'>Frequency</th>
                    <th className='py-3 px-4'>Indexed</th>
                    <th className='py-3 px-4 text-right'>Action</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-slate-100 font-mono text-[11px]'>
                  {filtered.map((item, idx) => (
                    <tr key={idx} className='hover:bg-slate-50/80 transition'>
                      <td className='py-2.5 px-4 font-semibold text-slate-900'>
                        <div className='flex items-center gap-2'>
                          <span className='text-slate-400'>#</span>
                          <span className='text-indigo-600'>{item.path}</span>
                        </div>
                      </td>
                      <td className='py-2.5 px-4 font-sans'>
                        <span className='inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700'>
                          {item.category}
                        </span>
                      </td>
                      <td className='py-2.5 px-4 font-sans'>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            item.priority >= 0.9
                              ? 'bg-emerald-100 text-emerald-800'
                              : item.priority >= 0.7
                              ? 'bg-indigo-100 text-indigo-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {item.priority.fixed(1)}
                        </span>
                      </td>
                      <td className='py-2.5 px-4 capitalize font-sans text-slate-600'>
                        {item.frequency}
                      </td>
                      <td className='py-2.5 px-4 text-slate-500'>
                        {item.lastModified}
                      </td>
                      <td className='py-2.5 px-4 text-right font-sans'>
                        <a
                          href={item.path}
                          target='_blank'
                          rel='noreferrer'
                          className='text-xs text-indigo-600 hover:text-indigo-800 font-semibold'
                        >
                          Visit &#8599;
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className='py-3 px-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500'>
              <span>Showing {filtered.length} of {normalized.length} entries</span>
              <span>Sitemap v0.9 W3C Standard</span>
            </div>
          </div>
        </div>
      ) : (
        <div className='rounded-xl border border-slate-800 bg-slate-950 p-4 shadow-inner'>
          <pre className='overflow-x-auto text-xs font-mono text-emerald-400 max-h-[500px] scrollbar-thin scrollbar-thumb-slate-800 leading-relaxed'>
            {rawXml}
          </pre>
        </div>
      )}
    </div>
  );
}