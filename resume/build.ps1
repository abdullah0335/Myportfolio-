# Regenerates public/Muhammad_Abdullah_CV.pdf from resume/resume.html using local Chrome.
# Run from the project root:  powershell -File resume/build.ps1
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$src = (Resolve-Path "$PSScriptRoot\resume.html").Path
$out = Join-Path (Resolve-Path "$PSScriptRoot\..\public").Path "Muhammad_Abdullah_CV.pdf"
& $chrome --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="$out" "file:///$($src -replace '\\','/')" | Out-Null
Write-Output "Wrote $out"
