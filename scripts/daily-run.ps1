# TSE Vending — Daily content generator
# Runs on Windows login: generates articles naturally (random count + delay)
# API key is stored in scripts\.env.local (never committed to git)

# ── PAUSED 2026-06-23 — thin-content SEO remediation ─────────────────────────
# The Gemini generator was producing <600-word articles that Google rejects as
# "Crawled - currently not indexed", which dragged down site-wide rankings.
# Daily auto-generation is paused until the generator reliably emits 600+ words.
# To re-enable: delete this block. (Or fully disable the task as Admin:
#   schtasks /Change /TN "TSEvending-DailyContent" /DISABLE )
Write-Output "daily-run is paused (thin-content remediation). Exiting."
exit 0
# ─────────────────────────────────────────────────────────────────────────────

$RepoPath = "d:\vba\tsevending"
$LogFile  = "$RepoPath\scripts\daily-run.log"
$LockFile = "$RepoPath\scripts\daily-run.lock"
$EnvFile  = "$RepoPath\scripts\.env.local"
$env:VERCEL_ORG_ID     = "team_bFFLK2gWekhRhASuGWhsNypg"
$env:VERCEL_PROJECT_ID = "prj_rsaZzFTCOhBVkOoWcJXHdvwOAweG"

# Only run once per calendar day
$Today = (Get-Date).ToString("yyyy-MM-dd")
if (Test-Path $LockFile) {
    if ((Get-Content $LockFile -Raw).Trim() -eq $Today) { exit 0 }
}

# Load API key from local env file
if (-not (Test-Path $EnvFile)) {
    Write-Error "Missing $EnvFile — create it with: GEMINI_API_KEY=your_key"
    exit 1
}
Get-Content $EnvFile | ForEach-Object {
    if ($_ -match "^(\w+)=(.+)$") {
        [System.Environment]::SetEnvironmentVariable($Matches[1], $Matches[2], "Process")
    }
}

if (-not $env:GEMINI_API_KEY) {
    Write-Error "GEMINI_API_KEY not found in $EnvFile"
    exit 1
}

# Random delay 10–40 minutes after login (looks natural, not robotic)
$DelayMin = Get-Random -Minimum 10 -Maximum 41
Start-Sleep -Seconds ($DelayMin * 60)

Start-Transcript -Path $LogFile -Append -Force | Out-Null
Write-Output "=== TSE Daily Run: $Today (delay was ${DelayMin}m) ==="

Set-Location $RepoPath
git pull origin main 2>&1

# Random article count: 3 or 4
$ArticleCount = Get-Random -InputObject @(3, 3, 4, 4, 4)
$env:ARTICLES_PER_RUN = "$ArticleCount"

Write-Output "Generating $ArticleCount articles..."
npx tsx scripts/generate-article-gemini.ts

if ($LASTEXITCODE -ne 0) {
    Write-Output "ERROR: generation failed"
    Stop-Transcript | Out-Null
    exit 1
}

git config user.name  "tse-content-bot"
git config user.email "actions@users.noreply.github.com"
git add src/content/blog scripts/content-calendar.json public/images/articles

$Changed = git diff --cached --name-only
if ($Changed) {
    $Count = ($Changed | Measure-Object -Line).Lines
    git commit -m "content: add $Count SEO article(s) — $Today"
    git push origin main
    Write-Output "Pushed $Count new files."
} else {
    Write-Output "Nothing new to commit."
}

# Deploy to Vercel
Write-Output "Deploying to Vercel..."
Set-Location $RepoPath
npx vercel --prod --yes --token $env:VERCEL_TOKEN
Write-Output "Deployed."

$Today | Out-File $LockFile -Encoding utf8 -Force
Write-Output "=== Done ==="
Stop-Transcript | Out-Null
