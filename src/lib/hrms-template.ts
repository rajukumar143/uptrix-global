// Tiny template renderer for the HRMS pages.
//   {{path.to.value}}            HTML-escaped text or attribute value
//   {{{path.to.value}}}          raw value (trusted markup such as SVG path data)
//   {{#each list}}...{{/each}}   repeat the block for every item; inside it, {{field}} reads the item
//                                {{$index}} is the 1-based position, {{$i}} the 0-based position, {{$value}} a plain item
//   {{#if path}}...{{/if}}       show the block only when the value is set
// Blocks may be nested.

type Scope = Record<string, unknown>;
type Node = { kind: "text"; text: string } | { kind: "each" | "if"; path: string; body: Node[] };

const TOKEN = /\{\{#each ([\w.]+)\}\}|\{\{#if ([\w.]+)\}\}|\{\{\/each\}\}|\{\{\/if\}\}/g;

function parse(tpl: string): Node[] {
  const root: Node[] = [];
  const stack: { node: Node & { body: Node[] }; parent: Node[] }[] = [];
  let current = root;
  let last = 0;
  let match: RegExpExecArray | null;
  TOKEN.lastIndex = 0;
  while ((match = TOKEN.exec(tpl))) {
    if (match.index > last) current.push({ kind: "text", text: tpl.slice(last, match.index) });
    last = match.index + match[0].length;
    if (match[1] !== undefined || match[2] !== undefined) {
      const node = { kind: match[1] !== undefined ? "each" : "if", path: (match[1] ?? match[2]) as string, body: [] as Node[] } as Node & { body: Node[] };
      current.push(node);
      stack.push({ node, parent: current });
      current = node.body;
    } else {
      const open = stack.pop();
      if (!open) throw new Error("Unbalanced template block");
      current = stack.length ? stack[stack.length - 1].node.body : root;
    }
  }
  if (last < tpl.length) current.push({ kind: "text", text: tpl.slice(last) });
  if (stack.length) throw new Error("Unclosed template block");
  return root;
}

function lookup(path: string, scopes: Scope[]): unknown {
  const [head, ...rest] = path.trim().split(".");
  for (let i = scopes.length - 1; i >= 0; i--) {
    if (head in scopes[i]) {
      let value: unknown = scopes[i][head];
      for (const key of rest) value = value && typeof value === "object" ? (value as Scope)[key] : undefined;
      return value;
    }
  }
  return undefined;
}

const ESC: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const escapeHtml = (v: unknown) => String(v ?? "").replace(/[&<>"']/g, (c) => ESC[c]);

function substitute(text: string, scopes: Scope[]): string {
  return text
    .replace(/\{\{\{([\w.$]+)\}\}\}/g, (_, path) => String(lookup(path, scopes) ?? ""))
    .replace(/\{\{([\w.$]+)\}\}/g, (_, path) => escapeHtml(lookup(path, scopes)));
}

function render(nodes: Node[], scopes: Scope[]): string {
  let out = "";
  for (const node of nodes) {
    if (node.kind === "text") {
      out += substitute(node.text, scopes);
    } else if (node.kind === "if") {
      const value = lookup(node.path, scopes);
      if (value !== undefined && value !== null && value !== "" && value !== false) out += render(node.body, scopes);
    } else {
      const list = lookup(node.path, scopes);
      if (!Array.isArray(list)) continue;
      list.forEach((item, index) => {
        const itemScope: Scope = {
          ...(item && typeof item === "object" ? (item as Scope) : { $value: item }),
          $index: index + 1,
          $i: index,
        };
        out += render(node.body, [...scopes, itemScope]);
      });
    }
  }
  return out;
}

export function renderHrmsTemplate(tpl: string, data: Scope): string {
  return render(parse(tpl), [data]);
}
