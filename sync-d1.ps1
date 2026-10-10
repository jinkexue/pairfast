# Sync schema-reset.sql to Cloudflare D1 (remote)
# Prerequisites: working Node + npm, then: npm install
# First time: npx wrangler login

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

if (-not (Test-Path ".\node_modules\wrangler")) {
  Write-Host "Installing wrangler..." -ForegroundColor Cyan
  npm install
}

Write-Host "Executing schema-reset.sql against remote D1: pairfast ..." -ForegroundColor Cyan
npx wrangler d1 execute pairfast --remote --file=.\schema-reset.sql

Write-Host ""
Write-Host "Verify users:" -ForegroundColor Cyan
npx wrangler d1 execute pairfast --remote --command "SELECT id, name, role FROM users;"

Write-Host "Done." -ForegroundColor Green
