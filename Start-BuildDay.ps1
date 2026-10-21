$ErrorActionPreference = 'Stop'
$projectDirectory = $PSScriptRoot
$builddayPort = 4187
$builddayUrl = "http://127.0.0.1:$builddayPort/"
function Test-BuildDay {
  try {
    $page = Invoke-WebRequest -Uri $builddayUrl -TimeoutSec 3 -UseBasicParsing
    return ($page.Content -match '<title>BuildDay' -and $page.Content -match 'src="/local-sync.js"')
  } catch { return $false }
}
if (-not (Test-BuildDay)) {
  $existing = Get-NetTCPConnection -LocalPort $builddayPort -State Listen -ErrorAction SilentlyContinue
  if ($existing) { throw "Port $builddayPort belongs to another app. BuildDay was not started; that app was left running." }
  $process = Start-Process -FilePath (Get-Command node).Source -ArgumentList 'server.cjs', "$builddayPort" -WorkingDirectory $projectDirectory -WindowStyle Hidden -RedirectStandardOutput (Join-Path $projectDirectory 'server.log') -RedirectStandardError (Join-Path $projectDirectory 'server-error.log') -PassThru
  $process.Id | Set-Content (Join-Path $projectDirectory 'server.pid')
  for ($attempt = 0; $attempt -lt 10; $attempt++) {
    if (Test-BuildDay) { break }
    Start-Sleep -Milliseconds 500
  }
  if (-not (Test-BuildDay)) { throw 'BuildDay failed to start. Check server-error.log in this folder.' }
}
Write-Output "BuildDay verified: $builddayUrl"
Get-Content (Join-Path $projectDirectory 'server.log')
