// eslint-disable-next-line @typescript-eslint/no-require-imports
const { randomBytes, scryptSync } = require("node:crypto");

const chunks = [];
process.stdin.on("data", (chunk) => chunks.push(chunk));
process.stdin.on("end", () => {
  const password = Buffer.concat(chunks).toString("utf8").replace(/[\r\n]+$/, "");
  if (password.length < 12) {
    console.error("Password must be at least 12 characters.");
    process.exitCode = 1;
    return;
  }
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1 });
  process.stdout.write(`scrypt$16384$8$1$${salt.toString("base64url")}$${hash.toString("base64url")}\n`);
});
