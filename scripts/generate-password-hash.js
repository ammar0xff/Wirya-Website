#!/usr/bin/env node

/**
 * Password Hash Generator for Admin Authentication
 *
 * This script generates a bcrypt hash for your admin password.
 * Usage: node scripts/generate-password-hash.js <your-password>
 *
 * Example: node scripts/generate-password-hash.js MySecurePassword123
 */

import { createHash } from "crypto"

// Simple bcrypt-like hash using Node.js crypto (for demonstration)
// In production, you should use actual bcrypt
function hashPassword(password) {
  // Using SHA-256 with salt for demonstration
  // This is NOT as secure as bcrypt but works without additional dependencies
  const salt = "wirya-admin-salt-2024" // In production, use random salt per password
  const hash = createHash("sha256")
    .update(password + salt)
    .digest("hex")
  return hash
}

// Get password from command line argument
const password = process.argv[2]

if (!password) {
  console.error("\n❌ Error: No password provided\n")
  console.log("Usage: node scripts/generate-password-hash.js <your-password>")
  console.log("Example: node scripts/generate-password-hash.js MySecurePassword123\n")
  process.exit(1)
}

// Validate password strength
if (password.length < 8) {
  console.error("\n❌ Error: Password must be at least 8 characters long\n")
  process.exit(1)
}

// Generate hash
const hash = hashPassword(password)

console.log("\n✅ Password hash generated successfully!\n")
console.log("Add this to your .env file or Vercel environment variables:\n")
console.log(`ADMIN_PASSWORD_HASH=${hash}\n`)
console.log("⚠️  IMPORTANT: Keep this hash secure and never commit it to version control!\n")
