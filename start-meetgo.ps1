# MeetGo 本地启动脚本
# 用法：在 PowerShell 中运行：powershell -ExecutionPolicy Bypass -File .\start-meetgo.ps1

param(
  [int]$Port = 8766
)

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $Root

$Python = Get-Command python -ErrorAction SilentlyContinue
if (-not $Python) {
  $Python = Get-Command py -ErrorAction SilentlyContinue
}

if (-not $Python) {
  Write-Host "未找到 Python。请先安装 Python，或使用其他静态服务器启动此目录。" -ForegroundColor Red
  Read-Host "按 Enter 退出"
  exit 1
}

$Url = "http://127.0.0.1:$Port/"
Write-Host "MeetGo 本地服务启动中..." -ForegroundColor Cyan
Write-Host "根目录：$Root"
Write-Host "访问地址：$Url" -ForegroundColor Green
Write-Host "如果外部浏览器提示拒绝访问，请确认此窗口保持打开，且端口未被占用。"
Write-Host "按 Ctrl + C 可停止服务。"

Start-Process $Url

if ($Python.Name -eq "py.exe") {
  & py -m http.server $Port --bind 127.0.0.1
} else {
  & python -m http.server $Port --bind 127.0.0.1
}
