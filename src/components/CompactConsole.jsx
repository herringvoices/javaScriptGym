import React from "react";
import ConsolePanel from "./ConsolePanel";

/**
 * CompactConsole
 * A minimal console that shows logs and warnings normally, and collapses
 * errors to a single concise line (no long sandbox stack traces).
 */
export default function CompactConsole() {
  return <ConsolePanel compact />;
}
