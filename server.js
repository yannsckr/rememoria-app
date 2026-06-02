/* ═══════════════════════════════════════════════
   ReMemória — Proxy Server (Google Gemini)
   Roda localmente e repassa chamadas à API do Gemini
   com a chave guardada em variável de ambiente.
═══════════════════════════════════════════════ */

require('dotenv').config()
const http  = require("http");
const https = require("https");
const path  = require("path");
const fs    = require("fs");

// ── Configurações ──────────────────────────────
const PORT = process.env.PORT || 3000;
const API_KEY    = process.env.GEMINI_API_KEY;
const STATIC_DIR = __dirname;
const GEMINI_MODEL = "gemini-2.5-flash";

if (!API_KEY) {
  console.error("❌  Defina a variável GEMINI_API_KEY antes de iniciar.");
  console.error("    Execute: iniciar.bat (Windows) ou ./iniciar.sh (Mac/Linux)");
  process.exit(1);
}

// ── MIME types ─────────────────────────────────
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css":  "text/css; charset=utf-8",
  ".js":   "application/javascript; charset=utf-8",
  ".json": "application/json",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".svg":  "image/svg+xml",
  ".ico":  "image/x-icon",
};

// ── Servidor HTTP ──────────────────────────────
const server = http.createServer((req, res) => {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

// ── Rota proxy: POST /api/chat ──────────────
  if (req.method === "POST" && req.url === "/api/chat") {
    let chunks = [];
    req.on("data", chunk => chunks.push(chunk));
    req.on("end", () => {
      // Une os pedaços garantindo codificação correta em UTF-8
      const body = Buffer.concat(chunks).toString("utf8");
      
      let parsed;
      try { parsed = JSON.parse(body); }
      catch { res.writeHead(400); res.end("JSON inválido"); return; }

      const systemPrompt = parsed.system || "";
      const messages     = parsed.messages || [];

      // Converte diretamente o histórico recebido para o formato do Gemini
      const geminiContents = messages.map(m => ({
        role:  m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }]
      }));

 // 1. CORREÇÃO DA CHAVE: systemInstruction ao invés de system_instruction
      const payload = JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: geminiContents,
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        }
      });
      
      const geminiPath = `/v1beta/models/${GEMINI_MODEL}:generateContent?key=${API_KEY}`;

      const options = {
        hostname: "generativelanguage.googleapis.com",
        path:     geminiPath,
        method:   "POST",
        headers: {
          "Content-Type":   "application/json; charset=utf-8",
          "Content-Length": Buffer.byteLength(payload, "utf8"),
        },
      };

      const apiReq = https.request(options, apiRes => {
        let dataChunks = [];
        apiRes.on("data", c => dataChunks.push(c));
        apiRes.on("end", () => {
          try {
            const data = Buffer.concat(dataChunks).toString("utf8");
            const geminiResp = JSON.parse(data);

            // 2. CORREÇÃO DE DEBUG: Repassar o erro verdadeiro se o Google reclamar de algo
            if (apiRes.statusCode !== 200) {
              console.error("Erro do Google:", geminiResp);
              res.writeHead(apiRes.statusCode, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ 
                error: { message: geminiResp.error?.message || `HTTP ${apiRes.statusCode} retornado pela API` } 
              }));
              return;
            }

            const text = geminiResp?.candidates?.[0]?.content?.parts
              ?.map(p => p.text || "").join("") || "";
            res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
            res.end(JSON.stringify({ reply: text }));
          } catch (e) {
            res.writeHead(502, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: { message: "Resposta inválida da API Gemini" } }));
          }
        });
      });

      apiReq.on("error", err => {
        console.error("Erro ao chamar Gemini:", err.message);
        res.writeHead(502);
        res.end(JSON.stringify({ error: { message: err.message } }));
      });

      apiReq.write(payload, "utf8");
      apiReq.end();
    });
    return;
  }

  // ── Arquivos estáticos ──────────────────────
  let filePath = path.join(STATIC_DIR, req.url === "/" ? "index.html" : req.url);
  const ext    = path.extname(filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Não encontrado: " + req.url);
      return;
    }
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log("════════════════════════════════════════");
  console.log("  🏛️  ReMemória — Servidor iniciado!");
  console.log(`  📡  http://localhost:${PORT}`);
  console.log("  🤖  IA: Google Gemini 2.0 Flash");
  console.log("  Pressione Ctrl+C para encerrar.");
  console.log("════════════════════════════════════════");

  // Abre o browser automaticamente
  const { exec } = require("child_process");
  const url = `http://localhost:${PORT}`;
  const cmd =
    process.platform === "win32"  ? `start ${url}` :
    process.platform === "darwin" ? `open ${url}`  :
    `xdg-open ${url}`;
  setTimeout(() => exec(cmd), 800);
});
