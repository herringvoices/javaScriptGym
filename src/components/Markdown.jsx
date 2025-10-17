import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const cx = (...classes) => classes.filter(Boolean).join(" ");

const defaultComponents = {
  p: ({ className, ...props }) => (
    <p
      {...props}
      className={cx("mt-2 mb-2 leading-relaxed first:mt-0 last:mb-0", className)}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul
      {...props}
      className={cx("mt-2 list-disc space-y-1 pl-5", className)}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      {...props}
      className={cx("mt-2 list-decimal space-y-1 pl-5", className)}
    />
  ),
  li: ({ className, ...props }) => (
    <li
      {...props}
      className={cx("leading-relaxed", className)}
    />
  ),
  strong: ({ className, ...props }) => (
    <strong
      {...props}
      className={cx("font-semibold text-white", className)}
    />
  ),
  em: ({ className, ...props }) => <em {...props} className={cx("italic", className)} />,
  code: ({ inline, className, children, ...props }) => {
    if (inline) {
      return (
        <code
          {...props}
          className={cx(
            "rounded bg-slate-900/70 px-1.5 py-0.5 text-xs font-medium text-brand-200",
            className
          )}
        >
          {children}
        </code>
      );
    }

    return (
      <code {...props} className={className}>
        {children}
      </code>
    );
  },
  pre: ({ className, ...props }) => (
    <pre
      {...props}
      className={cx("overflow-auto rounded-xl bg-slate-900/80 p-4 text-sm shadow-inner", className)}
    />
  ),
};

export default function Markdown({
  children,
  className = "",
  components = {},
  remarkPlugins = [],
  rehypePlugins = [],
  ...rest
}) {
  if (!children) return null;

  const { root: userRoot, ...restComponents } = components;
  const rootClassName = cx("space-y-3", className);

  const root = userRoot
    ? (props) =>
        userRoot({
          ...props,
          className: cx(rootClassName, props.className),
        })
    : ({ className: providedClassName, ...props }) => (
        <div
          {...props}
          className={cx(rootClassName, providedClassName)}
        />
      );

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, ...remarkPlugins]}
      rehypePlugins={[...rehypePlugins]}
      components={{
        root,
        ...defaultComponents,
        ...restComponents,
      }}
      {...rest}
    >
      {children}
    </ReactMarkdown>
  );
}
