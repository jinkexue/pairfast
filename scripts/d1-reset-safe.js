const { execSync } = require('node:child_process');
const fs = require('node:fs');

const force = process.argv.includes('--force');
const allowFlag = process.env.ALLOW_D1_RESET === '1' || process.env.ALLOW_D1_RESET === 'true';

if (!force && !allowFlag) {
  console.error('\n[SAFE GUARD] D1 reset is blocked by default.');
  console.error('This project does not allow accidental database resets.');
  console.error('To reset intentionally, run one of the following:');
  console.error('  npm run d1:reset:force');
  console.error('  ALLOW_D1_RESET=1 npm run d1:reset');
  console.error('');
  process.exit(1);
}

const sqlFile = './schema-reset.sql';
if (!fs.existsSync(sqlFile)) {
  console.error(`[SAFE GUARD] Missing reset file: ${sqlFile}`);
  process.exit(1);
}

console.warn('\n[WARNING] You are about to reset the remote D1 database.');
console.warn('This action is destructive and should only be used with explicit intent.');
console.warn('Proceeding because force/ALLOW_D1_RESET was provided.\n');

execSync('npx wrangler d1 execute pairfast --remote --file=./schema-reset.sql', { stdio: 'inherit' });
