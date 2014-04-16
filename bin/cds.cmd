@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\node_modules\draw-string-cli\lib\cli.js" %*
) ELSE (
  node  "%~dp0\..\lib\cli.js" %*
  @REM echo "%~dp0"
)