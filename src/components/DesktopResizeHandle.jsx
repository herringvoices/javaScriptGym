export default function DesktopResizeHandle({ leftKey, rightKey, onPointerDown, onKeyDown }) {
  return (
    <div className="relative z-30 flex min-h-[480px] w-0 self-stretch overflow-visible">
      <button
        type="button"
        role="separator"
        aria-orientation="vertical"
        aria-label={`Resize ${leftKey} and ${rightKey} panels`}
        data-toc-toggle
        onPointerDown={onPointerDown}
        onKeyDown={onKeyDown}
        className="desktop-resize-handle absolute left-1/2 top-0 h-full w-6 -translate-x-1/2 cursor-col-resize rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/80"
      >
        <span aria-hidden="true" className="desktop-resize-handle-line" />
      </button>
    </div>
  );
}
