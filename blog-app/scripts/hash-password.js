#!/usr/bin/env node

/**
 * Script to generate a secure bcrypt hash for ADMIN_PASSWORD_HASH.
 *
 * Usage:
 *   node scripts/hash-password.js <your_password>
 * Or:
 *   npm run hash-password -- <your_password>
 */

const bcrypt = require("bcryptjs");
const readline = require("readline");

const SALT_ROUNDS = 12;

function generateHash(password) {
  if (!password || password.trim().length === 0) {
    console.error("\x1b[31mError: Password cannot be empty.\x1b[0m");
    process.exit(1);
  }

  const hash = bcrypt.hashSync(password, SALT_ROUNDS);
  console.log("\n=======================================================");
  console.log("\x1b[32m✔ Password hash generated successfully!\x1b[0m");
  console.log("=======================================================\n");
  console.log("\x1b[36mADMIN_PASSWORD_HASH:\x1b[0m");
  console.log(hash);
  console.log("\nAdd this line to your .env.local file or Hostinger environment:\n");
  console.log(`ADMIN_PASSWORD_HASH="${hash}"\n`);
  console.log("=======================================================\n");
}

const argPassword = process.argv[2];

if (argPassword) {
  generateHash(argPassword);
} else {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter admin password to hash: ", (answer) => {
    rl.close();
    generateHash(answer);
  });
}
