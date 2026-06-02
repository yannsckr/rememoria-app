@echo off
title ReMem�ria � Servidor
cls

echo ========================================
echo   ReMemoria - Iniciando Servidor
echo ========================================
echo.

set GEMINI_API_KEY=AQ.Ab8RN6K0ubyuFPjaGv6a5O1jG5j8HJI7GDNnzZ-s8Lg6k8n1jg

echo [OK] Ambiente configurado.
echo [OK] Executando backend...
echo.

node server.js
pause