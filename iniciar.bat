@echo off
title ReMem�ria � Servidor
cls

echo ========================================
echo   ReMemoria - Iniciando Servidor
echo ========================================
echo.

set GEMINI_API_KEY=AQ.Ab8RN6JcSAo9rjeB-UcFQO2_9cpy3Y4jt0Jm-ziAfAi7JtwRAQ

echo [OK] Ambiente configurado.
echo [OK] Executando backend...
echo.

node server.js
pause