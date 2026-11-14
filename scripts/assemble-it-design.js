// One-off assembly of the IT design source from the existing IT page, the shared header and demo form, and the new blocks.
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");

const it = read("public/it-suite.html");
const hr = read("scripts/designs/hr-suite.html");

let body = it.slice(0, it.indexOf("\n<script>"));

const headerStart = body.indexOf('<header class="panel"');
const headerEnd = body.indexOf("</header>") + "</header>".length;
if (headerStart < 0) throw new Error("header not found");
const hrHeader = hr.slice(hr.indexOf('<header class="panel"'), hr.indexOf("</header>") + "</header>".length);
body = body.slice(0, headerStart) + hrHeader + body.slice(headerEnd);

function swap(source, startMark, endMark, replacement) {
  const a = source.indexOf(startMark);
  const b = source.indexOf(endMark, a + 1);
  if (a < 0 || b < 0) throw new Error("marker missing: " + startMark + " / " + endMark);
  return source.slice(0, a) + replacement + source.slice(b);
}

body = swap(body, "<!-- TICKET WORKFLOW -->", "<!-- ASSETS -->", read("scripts/designs/it-parts/tickets.html"));
body = swap(body, "<!-- ESTIMATOR -->", '<section id="demo"', read("scripts/designs/it-parts/estimator.html"));
body = swap(body, '<section id="demo"', "<footer", hr.slice(hr.indexOf('<section id="demo"'), hr.indexOf("<footer")));

// The shared script, with step buttons (Back / Next) added.
let script = hr.slice(hr.indexOf("\n<script>"));
const anchor = "    if (e.target.closest('[data-send]')) {";
if (!script.includes(anchor)) throw new Error("script anchor missing");
script = script.split(anchor).join(
  "    var step = e.target.closest('[data-step]');\n" +
  "    if (step) {\n" +
  "      var g = step.getAttribute('data-step'), total = count(g);\n" +
  "      showPanel(g, (current[g] + Number(step.getAttribute('data-dir')) + total) % total);\n" +
  "      return;\n" +
  "    }\n" +
  anchor
);

fs.writeFileSync(path.join(root, "scripts", "designs", "it-suite.html"), body + script);
console.log("wrote scripts/designs/it-suite.html", (body + script).length);
