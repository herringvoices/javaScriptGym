import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { Link, useParams } from "react-router-dom";
import standards, { standardOrder } from "../data/standards";
import { handbookChapters } from "../handbook/manifest";
import HandbookMDXProvider from "../handbook/MDXProvider";

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-");

export default function HandbookPage() {
  const { standardId } = useParams();

  const resolvedId = standards[standardId] ? standardId : standardOrder[0];
  const meta = standards[resolvedId];

  const hasMdx = Boolean(handbookChapters[resolvedId]);

  const [mdxModule, setMdxModule] = useState(null);
  const [mdxError, setMdxError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (!hasMdx) {
      setMdxModule(null);
      return;
    }
    setLoading(true);
    handbookChapters[resolvedId]()
      .then((mod) => {
        if (!cancelled) {
          setMdxModule(mod);
          setMdxError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setMdxError(err);
          setMdxModule(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [resolvedId, hasMdx]);

  // Generate TOC from either MDX frontmatter/content (simplified: rely on legacy for now) or legacy bodyMd.
  const sections = useMemo(() => {
    if (hasMdx) return []; // TODO: optional enhancement - parse compiled AST for headings.
    if (!meta?.bodyMd) return [];
    const matches = [...meta.bodyMd.matchAll(/^###\s+(.*)$/gm)];
    return matches.map(([, heading]) => ({
      heading,
      href: `#${slugify(heading)}`,
    }));
  }, [meta, hasMdx]);

  const standardNav = standardOrder
    .map((id) => standards[id])
    .filter(Boolean)
    .map((item) => ({
      id: item.id,
      title: item.title,
      short: item.short,
      isActive: item.id === resolvedId,
    }));

  if (!meta) {
    return (
      <article className="space-y-4">
        <h1 className="text-3xl font-semibold text-white">Standard not found</h1>
        <p className="text-slate-300">
          We couldn’t find that handbook entry. Pick another standard from the menu.
        </p>
      </article>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">
            Standards
          </p>
          <ul className="mt-3 space-y-1">
            {standardNav.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/handbook/${item.id}`}
                  className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                    item.isActive
                      ? "bg-brand-500 text-white shadow"
                      : "text-slate-200 hover:bg-slate-800 hover:text-white"
                  }`}
                  aria-current={item.isActive ? "page" : undefined}
                >
                  <span className="block font-medium">{item.title}</span>
                  <span className="block text-xs text-slate-300">{item.short}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {sections.length > 0 ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">
              On this page
            </p>
            <ul className="mt-3 space-y-1">
              {sections.map((section) => (
                <li key={section.href}>
                  <a
                    href={section.href}
                    className="block rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </aside>

      <article className="prose prose-invert max-w-none">
        <p className="text-sm uppercase tracking-widest text-brand-300">JavaScript Handbook</p>
        <h1 className="mt-0">{meta.title}</h1>
        {hasMdx ? (
          <div>
            {loading && <p className="text-sm text-slate-400">Loading content…</p>}
            {mdxError && (
              <p className="text-sm text-red-400">Failed to load chapter: {mdxError.message}</p>
            )}
            {mdxModule && (
              <HandbookMDXProvider>
                <mdxModule.default />
              </HandbookMDXProvider>
            )}
          </div>
        ) : meta.bodyMd ? (
          <ReactMarkdown
            rehypePlugins={[rehypeSlug]}
            remarkPlugins={[remarkGfm]}
            components={{
              h2: (props) => <h2 {...props} className="text-2xl font-semibold" />,
              h3: (props) => <h3 {...props} className="text-xl font-semibold" />,
              code: (props) => (
                <code
                  {...props}
                  className="rounded bg-slate-900 px-1.5 py-0.5 text-xs font-medium text-brand-200"
                />
              ),
              pre: (props) => (
                <pre
                  {...props}
                  className="overflow-auto rounded-lg bg-slate-900 p-4 text-sm shadow-inner"
                />
              ),
            }}
          >
            {meta.bodyMd}
          </ReactMarkdown>
        ) : (
          <p className="text-sm text-slate-400">Content coming soon…</p>
        )}
      </article>
    </div>
  );
}
