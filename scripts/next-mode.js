// eslint-disable-next-line @typescript-eslint/no-require-imports
const { spawn } = require("node:child_process");

const [mode, command] = process.argv.slice(2);
if (!["public", "admin", "all"].includes(mode) || !["dev", "build", "start"].includes(command)) {
  console.error("Usage: node scripts/next-mode.js <public|admin|all> <dev|build|start>");
  process.exit(2);
}
if (mode === "all" && command !== "dev") {
  console.error("APP_MODE=all is only supported for local development.");
  process.exit(2);
}

const nextBin = require.resolve("next/dist/bin/next");
const args = [nextBin, command, ...(command === "dev" || command === "build" ? ["--webpack"] : [])];
const child = spawn(process.execPath, args, {
  stdio: "inherit",
  env: { ...process.env, APP_MODE: mode },
});

child.on("error", (error) => {
  console.error("Could not start Next.js", error);
  process.exitCode = 1;
});
child.on("exit", (code, signal) => {
  process.exitCode = code ?? (signal ? 1 : 0);
});
