# One-step deploy to Cloudflare Workers.
# Loads tokens from scripts/.env.local (gitignored) then runs the OpenNext
# build + deploy. Usage from the project root:  ./scripts/deploy.ps1
$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$envFile = Join-Path $PSScriptRoot ".env.local"

if (-not (Test-Path $envFile)) {
  Write-Error "Missing scripts/.env.local (needs CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID)."
}

# Load KEY=VALUE lines into the process environment.
foreach ($line in Get-Content $envFile) {
  if ($line -match '^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$') {
    [Environment]::SetEnvironmentVariable($Matches[1], $Matches[2].Trim(), "Process")
  }
}

if (-not $env:CLOUDFLARE_API_TOKEN -or -not $env:CLOUDFLARE_ACCOUNT_ID) {
  Write-Error "CLOUDFLARE_API_TOKEN / CLOUDFLARE_ACCOUNT_ID not found in scripts/.env.local."
}

Set-Location $root

# Optimize any new images to WebP first (skips ones already converted), so
# freshly added article images ship optimized without a separate step.
Write-Host "Optimizing images to WebP..." -ForegroundColor Cyan
npm run images:webp
if ($LASTEXITCODE -ne 0) { Write-Error "Image optimization failed." }

Write-Host "Deploying tsevending to Cloudflare (account $env:CLOUDFLARE_ACCOUNT_ID)..." -ForegroundColor Cyan
npm run deploy
