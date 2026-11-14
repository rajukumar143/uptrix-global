// One-off assembly of the home design source: the AI and connect sections become editable lists,
// the demo form and header are shared with the HR page, and the script is the shared one.
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");

const home = read("scripts/designs/hrms-home.html");
const hr = read("scripts/designs/hr-suite.html");

let body = home.slice(0, home.indexOf("\n<script>"));

const headerStart = body.indexOf('<header class="panel"');
const headerEnd = body.indexOf("</header>") + "</header>".length;
if (headerStart < 0) throw new Error("header not found");
body = body.slice(0, headerStart) + hr.slice(hr.indexOf('<header class="panel"'), hr.indexOf("</header>") + "</header>".length) + body.slice(headerEnd);

function swap(source, startMark, endMark, replacement) {
  const a = source.indexOf(startMark);
  const b = source.indexOf(endMark, a + 1);
  if (a < 0 || b < 0) throw new Error("marker missing: " + startMark + " / " + endMark);
  return source.slice(0, a) + replacement + source.slice(b);
}

body = swap(body, "<!-- AI ASSISTANT -->", "<!-- CHALLENGES -->", read("scripts/designs/home-parts/ai.html"));
body = swap(body, "<!-- CONNECT -->", "<!-- BENEFITS -->", read("scripts/designs/home-parts/connect.html"));
body = swap(body, '<section id="demo"', "<footer", hr.slice(hr.indexOf('<section id="demo"'), hr.indexOf("<footer")));

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

fs.writeFileSync(path.join(root, "scripts", "designs", "hrms-home.html"), body + script);
console.log("wrote scripts/designs/hrms-home.html", (body + script).length);
