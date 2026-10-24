// One-time migration: convert any plaintext passwords in the local JSON store
// into bcrypt hashes. Safe to run more than once — already-hashed passwords and
// empty passwords are skipped.
//
// Usage:
//   node migrate-passwords.js                 (uses ./data/store.json)
//   DATA_DIR=/path/to/data node migrate-passwords.js
//
// NOTE: this only handles the local JSON store. If you run in Supabase or
// Firebase mode, passwords are upgraded automatically on each user's next
// login (lazy migration), so no manual step is required there.

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const BCRYPT_ROUNDS = Math.min(15, Math.max(8, Number(process.env.BCRYPT_ROUNDS) || 10));
const dataDir = process.env.DATA_DIR || path.join(__dirname, 'data');
const dataFile = path.join(dataDir, 'store.json');

function isBcryptHash(value) {
  return /^\$2[aby]\$\d{2}\$/.test(String(value || ''));
}

async function main() {
  if (!fs.existsSync(dataFile)) {
    console.log(`No store file found at ${dataFile} — nothing to migrate.`);
    return;
  }

  const store = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  const users = Array.isArray(store.users) ? store.users : [];
  const counts = { hashed: 0, alreadyHashed: 0, empty: 0 };

  for (const user of users) {
    const value = String(user.password || '');
    if (!value) {
      counts.empty += 1;
      continue;
    }
    if (isBcryptHash(value)) {
      counts.alreadyHashed += 1;
      continue;
    }
    user.password = await bcrypt.hash(value, BCRYPT_ROUNDS);
    counts.hashed += 1;
  }

  fs.writeFileSync(dataFile, JSON.stringify(store, null, 2));
  console.log(
    `Done. Hashed: ${counts.hashed}, already hashed: ${counts.alreadyHashed}, empty: ${counts.empty}.`
  );
}

main().catch((error) => {
  console.error('Migration failed:', error);
  process.exit(1);
});
