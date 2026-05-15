function normalizeName(name) {
  return String(name || "")
    .trim()
    .replace(/[`"]/g, "")
    .replace(/[^\w]/g, "_")
    .toUpperCase();
}

function cleanType(type) {
  return String(type || "string")
    .trim()
    .replace(/[^\w]/g, "_");
}

function stripInlineComment(line) {
  return String(line || "").replace(/\/\/.*$/, "").trim();
}

function parseTableBlock(tableName, body) {
  const fields = [];

  const lines = body
    .split("\n")
    .map(stripInlineComment)
    .filter(Boolean);

  for (const line of lines) {
    if (line.startsWith("Indexes")) continue;
    if (line.startsWith("Note:")) continue;

    const match = line.match(/^([A-Za-z_][\w]*)\s+([A-Za-z_][\w()]*)(?:\s+(\[[^\]]+\]))?/);

    if (!match) continue;

    const [, rawName, rawType, rawAttrs = ""] = match;
    const attrs = rawAttrs.toLowerCase();

    const markers = [];
    if (attrs.includes("primary key") || attrs.includes("pk")) markers.push("PK");
    if (attrs.includes("unique")) markers.push("UK");

    fields.push({
      name: rawName,
      type: cleanType(rawType),
      markers,
    });
  }

  return {
    name: tableName,
    mermaidName: normalizeName(tableName),
    fields,
  };
}

function parseTables(dbml) {
  const tables = [];
  const tableRegex = /Table\s+([A-Za-z_][\w]*)\s*\{([\s\S]*?)\}/g;

  let match;
  while ((match = tableRegex.exec(dbml)) !== null) {
    const [, tableName, body] = match;
    tables.push(parseTableBlock(tableName, body));
  }

  return tables;
}

function parseRefs(dbml) {
  const refs = [];
  const refRegex =
    /Ref\s*:\s*([A-Za-z_][\w]*)\.([A-Za-z_][\w]*)\s*([<>-])\s*([A-Za-z_][\w]*)\.([A-Za-z_][\w]*)/g;

  let match;
  while ((match = refRegex.exec(dbml)) !== null) {
    const [, leftTable, leftField, operator, rightTable, rightField] = match;

    refs.push({
      leftTable,
      leftField,
      operator,
      rightTable,
      rightField,
    });
  }

  return refs;
}

function markForeignKeys(tables, refs) {
  const byName = new Map(tables.map((table) => [table.name, table]));

  for (const ref of refs) {
    const childTable = ref.operator === ">" ? byName.get(ref.leftTable) : byName.get(ref.rightTable);
    const childFieldName = ref.operator === ">" ? ref.leftField : ref.rightField;

    const field = childTable?.fields.find((candidate) => candidate.name === childFieldName);
    if (field && !field.markers.includes("FK")) {
      field.markers.push("FK");
    }
  }
}

function refToMermaid(ref) {
  const left = normalizeName(ref.leftTable);
  const right = normalizeName(ref.rightTable);

  if (ref.operator === ">") {
    return `  ${right} ||--o{ ${left} : has`;
  }

  if (ref.operator === "<") {
    return `  ${left} ||--o{ ${right} : has`;
  }

  return `  ${left} ||--|| ${right} : relates_to`;
}

export function dbmlToMermaidEr(dbml) {
  const source = String(dbml || "").trim();

  if (!source) {
    return "erDiagram\n";
  }

  const tables = parseTables(source);
  const refs = parseRefs(source);

  markForeignKeys(tables, refs);

  const lines = ["erDiagram"];

  for (const ref of refs) {
    lines.push(refToMermaid(ref));
  }

  if (refs.length > 0 && tables.length > 0) {
    lines.push("");
  }

  for (const table of tables) {
    lines.push(`  ${table.mermaidName} {`);

    for (const field of table.fields) {
      const markerText = field.markers.length ? ` ${field.markers.join(" ")}` : "";
      lines.push(`    ${field.type} ${field.name}${markerText}`);
    }

    lines.push("  }");
    lines.push("");
  }

  return lines.join("\n").trimEnd();
}

export default dbmlToMermaidEr;
