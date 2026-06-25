import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";

const HANDLE_COLUMN = "0px";
const PREVIEW_COLUMN = "10px";
const RESIZE_STEP = 0.02;

function clamp(value, min, max) {
  if (max < min) return min;
  return Math.min(Math.max(value, min), max);
}

function getPointerX(event) {
  return event.touches?.[0]?.clientX ?? event.clientX ?? 0;
}

export default function useResizableDesktopPanels({ panels, slots }) {
  const containerRef = useRef(null);
  const panelsByKey = useMemo(
    () => Object.fromEntries(panels.map((panel) => [panel.key, panel])),
    [panels]
  );
  const [ratios, setRatios] = useState({});
  const [resizeSignal, setResizeSignal] = useState(0);
  const [isResizing, setIsResizing] = useState(false);
  const resizeFrameRef = useRef(0);

  const getNextVisibleSlot = useCallback(
    (index) => slots.slice(index + 1).find((slot) => slot.visible),
    [slots]
  );
  const visibleSignature = useMemo(
    () => slots.filter((slot) => slot.visible).map((slot) => slot.key).join("|"),
    [slots]
  );
  const previewGroupByKey = useMemo(() => {
    const groups = {};
    let currentGroup = [];

    const flushGroup = () => {
      if (!currentGroup.length) return;
      currentGroup.forEach((key) => {
        groups[key] = currentGroup;
      });
      currentGroup = [];
    };

    slots.forEach((slot) => {
      if (slot.preview && !slot.visible) {
        currentGroup = [...currentGroup, slot.key];
        return;
      }
      flushGroup();
    });
    flushGroup();

    return groups;
  }, [slots]);

  const shouldRenderHandleAfter = useCallback(
    (key) => {
      const index = slots.findIndex((slot) => slot.key === key);
      if (index < 0 || !slots[index].visible) return false;
      const nextSlot = slots[index + 1];
      return Boolean(nextSlot?.visible);
    },
    [slots]
  );

  const gridTemplate = useMemo(() => {
    const columns = [];
    slots.forEach((slot, index) => {
      if (slot.visible) {
        const panel = panelsByKey[slot.key];
        const ratio = ratios[slot.key];
        const defaultWeight = panel?.defaultWeight ?? 1;
        columns.push(
          ratio
            ? `minmax(${panel?.min ?? 0}px, ${ratio}fr)`
            : panel?.defaultColumn ?? `minmax(${panel?.min ?? 0}px, ${defaultWeight}fr)`
        );
        if (getNextVisibleSlot(index)?.key === slots[index + 1]?.key) {
          columns.push(HANDLE_COLUMN);
        }
        return;
      }
      if (slot.preview) columns.push(PREVIEW_COLUMN);
    });
    return columns.length ? columns.join(" ") : "minmax(0,1fr)";
  }, [getNextVisibleSlot, panelsByKey, ratios, slots]);

  const panelSlotProps = useCallback(
    (key) => ({
      className: "min-w-0 px-3",
      "data-resizable-panel-key": key,
    }),
    []
  );

  const previewSlotProps = useCallback(
    () => ({
      className: "min-w-0",
    }),
    []
  );
  const getPreviewGroupKeys = useCallback(
    (key) => previewGroupByKey[key] ?? [key],
    [previewGroupByKey]
  );
  const getPreviewExpandDirection = useCallback(
    (key) => {
      const group = previewGroupByKey[key] ?? [key];
      const firstIndex = slots.findIndex((slot) => slot.key === group[0]);
      const lastIndex = slots.findIndex((slot) => slot.key === group[group.length - 1]);
      const hasVisibleBefore = firstIndex > 0 && slots.slice(0, firstIndex).some((slot) => slot.visible);
      const hasVisibleAfter = lastIndex >= 0 && slots.slice(lastIndex + 1).some((slot) => slot.visible);

      if (!hasVisibleBefore && !hasVisibleAfter) return "right";
      return hasVisibleAfter ? "right" : "left";
    },
    [previewGroupByKey, slots]
  );

  const emitResize = useCallback(() => {
    if (resizeFrameRef.current) return;
    resizeFrameRef.current = requestAnimationFrame(() => {
      resizeFrameRef.current = 0;
      setResizeSignal((value) => value + 1);
      try {
        window.dispatchEvent(new Event("resize"));
      } catch (error) {
        void error;
      }
    });
  }, []);

  const measureVisibleSizes = useCallback(() => {
    const root = containerRef.current;
    if (!root) return {};
    const next = {};
    slots.forEach((slot) => {
      if (!slot.visible) return;
      const element = root.querySelector(`[data-resizable-panel-key="${slot.key}"]`);
      if (element) next[slot.key] = element.getBoundingClientRect().width;
    });
    return next;
  }, [slots]);

  const widthsToRatios = useCallback((widths) => {
    const visibleKeys = slots.filter((slot) => slot.visible).map((slot) => slot.key);
    const total = visibleKeys.reduce((sum, key) => sum + (widths[key] || 0), 0);
    if (!total) return {};
    return Object.fromEntries(
      visibleKeys
        .filter((key) => widths[key])
        .map((key) => [key, widths[key] / total])
    );
  }, [slots]);

  const ensureMeasuredWidths = useCallback(() => {
    const measured = measureVisibleSizes();
    const measuredRatios = widthsToRatios(measured);
    if (Object.keys(measuredRatios).length) {
      setRatios((current) => ({ ...current, ...measuredRatios }));
    }
    return measured;
  }, [measureVisibleSizes, widthsToRatios]);

  useLayoutEffect(() => {
    let raf = 0;
    raf = requestAnimationFrame(() => {
      const measured = measureVisibleSizes();
      const measuredRatios = widthsToRatios(measured);
      if (Object.keys(measuredRatios).length) {
        setRatios((current) => {
          const changed = Object.entries(measuredRatios).some(
            ([key, value]) => Math.abs((current[key] ?? 0) - value) > 0.001
          );
          return changed ? { ...current, ...measuredRatios } : current;
        });
      }
      emitResize();
    });
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [emitResize, measureVisibleSizes, visibleSignature, widthsToRatios]);

  useLayoutEffect(
    () => () => {
      if (resizeFrameRef.current) cancelAnimationFrame(resizeFrameRef.current);
    },
    []
  );

  const beginResize = useCallback(
    (leftKey, rightKey, event) => {
      event.preventDefault();
      const leftPanel = panelsByKey[leftKey];
      const rightPanel = panelsByKey[rightKey];
      if (!leftPanel || !rightPanel) return;

      const measured = ensureMeasuredWidths();
      const leftStart = measured[leftKey];
      const rightStart = measured[rightKey];
      if (!leftStart || !rightStart) return;

      const startX = getPointerX(event);
      const pairTotal = leftStart + rightStart;
      const leftMin = leftPanel.min ?? 0;
      const rightMin = rightPanel.min ?? 0;
      const maxLeft = Math.max(leftMin, pairTotal - rightMin);

      setIsResizing(true);
      const handleMove = (moveEvent) => {
        const delta = getPointerX(moveEvent) - startX;
        const left = clamp(leftStart + delta, leftMin, maxLeft);
        const right = pairTotal - left;
        const nextWidths = {
          ...measured,
          [leftKey]: left,
          [rightKey]: right,
        };
        setRatios((current) => ({
          ...current,
          ...widthsToRatios(nextWidths),
        }));
        emitResize();
      };

      const handleUp = () => {
        setIsResizing(false);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        window.removeEventListener("pointermove", handleMove);
        window.removeEventListener("pointerup", handleUp);
        window.removeEventListener("pointercancel", handleUp);
        emitResize();
      };

      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
      window.addEventListener("pointermove", handleMove);
      window.addEventListener("pointerup", handleUp, { once: true });
      window.addEventListener("pointercancel", handleUp, { once: true });
    },
    [emitResize, ensureMeasuredWidths, panelsByKey, widthsToRatios]
  );

  const getHandleProps = useCallback(
    (leftKey, rightKey) => ({
      leftKey,
      rightKey,
      onPointerDown: (event) => beginResize(leftKey, rightKey, event),
      onKeyDown: (event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        const measured = ensureMeasuredWidths();
        const leftPanel = panelsByKey[leftKey];
        const rightPanel = panelsByKey[rightKey];
        const leftStart = measured[leftKey] ?? leftPanel?.min ?? 0;
        const rightStart = measured[rightKey] ?? rightPanel?.min ?? 0;
        const pairTotal = leftStart + rightStart;
        const totalVisible = Object.values(measured).reduce((sum, width) => sum + width, 0);
        const delta = Math.max(totalVisible * RESIZE_STEP, 24) * (event.key === "ArrowLeft" ? -1 : 1);
        const maxLeft = Math.max(leftPanel?.min ?? 0, pairTotal - (rightPanel?.min ?? 0));
        const left = clamp(leftStart + delta, leftPanel?.min ?? 0, maxLeft);
        const nextWidths = {
          ...measured,
          [leftKey]: left,
          [rightKey]: pairTotal - left,
        };
        setRatios((current) => ({
          ...current,
          ...widthsToRatios(nextWidths),
        }));
        emitResize();
      },
    }),
    [beginResize, emitResize, ensureMeasuredWidths, panelsByKey, widthsToRatios]
  );

  const nextVisibleKeyAfter = useCallback(
    (key) => {
      const index = slots.findIndex((slot) => slot.key === key);
      return getNextVisibleSlot(index)?.key ?? null;
    },
    [getNextVisibleSlot, slots]
  );

  return {
    containerRef,
    gridTemplate,
    getHandleProps,
    getPreviewExpandDirection,
    isResizing,
    nextVisibleKeyAfter,
    panelSlotProps,
    getPreviewGroupKeys,
    previewSlotProps,
    resizeSignal,
    shouldRenderHandleAfter,
  };
}
