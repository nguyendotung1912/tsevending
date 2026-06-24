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

Write-Host "Deploying tsevending to Cloudflare (account $env:CLOUDFLARE_ACCOUNT_ID)..." -ForegroundColor Cyan
Set-Location $root
npm run deploy
