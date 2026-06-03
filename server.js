require('dotenv').config();
const http  = require("http");
const https = require("https");
const path  = require("path");
const fs    = require("fs");

// Porta 4000 isolada para evitar conflito com o VS Code
const PORT = process.env.PORT || 4000;
const API_KEY    = process.env.GEMINI_API_KEY;
const STATIC_DIR = __dirname;

// Usando o modelo universal compatível com qualquer chave de API
const GEMINI_MODEL = "gemini-2.5-flash";

if (!API_KEY) {
  console.error("❌ Defina a variável GEMINI_API_KEY no arquivo .env");
  process.exit(1);
}

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

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/api/chat") {
    let chunks = [];
    req.on("data", chunk => chunks.push(chunk));
    req.on("end", () => {
      const body = Buffer.concat(chunks).toString("utf8");

      let parsed;
      try { parsed = JSON.parse(body); }
      catch { res.writeHead(400); res.end("JSON inválido"); return; }

      const systemPrompt = parsed.system || "";
      const messages     = parsed.messages || [];

      // 1. SANITIZAÇÃO DE HISTÓRICO
      let sanitizedContents = [];
      for (let m of messages) {
        let mappedRole = m.role === "assistant" ? "model" : "user";
        
        if (sanitizedContents.length > 0 && sanitizedContents[sanitizedContents.length - 1].role === mappedRole) {
          sanitizedContents[sanitizedContents.length - 1].parts[0].text += "\n" + m.content;
        } else {
          sanitizedContents.push({ role: mappedRole, parts: [{ text: m.content }] });
        }
      }

      // Injeção de personalidade manual na primeira mensagem (funciona em qualquer modelo)
      if (sanitizedContents.length > 0 && sanitizedContents[0].role === "user" && systemPrompt) {
         sanitizedContents[0].parts[0].text = `[INSTRUÇÕES DE COMPORTAMENTO]:\n${systemPrompt}\n\n[PERGUNTA DO USUÁRIO]:\n${sanitizedContents[0].parts[0].text}`;
      }

      // 2. Payload limpo (sem o campo systemInstruction que causava bloqueio)
      const payload = JSON.stringify({
        contents: sanitizedContents,
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

            if (apiRes.statusCode !== 200) {
              console.error("Erro do Google:", geminiResp);
              const errMsg = geminiResp.error?.message || `HTTP ${apiRes.statusCode}`;
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ reply: `⚠️ IA offline: ${errMsg}` }));
              return;
            }

            const text = geminiResp?.candidates?.[0]?.content?.parts?.map(p => p.text || "").join("") || "";
            res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
            res.end(JSON.stringify({ reply: text }));
          } catch (e) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ reply: "⚠️ Falha ao ler a resposta do servidor do Google." }));
          }
        });
      });

      apiReq.on("error", err => {
        console.error("Erro ao chamar Gemini:", err.message);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ reply: `⚠️ Erro de rede com a API: ${err.message}` }));
      });

      apiReq.write(payload, "utf8");
      apiReq.end();
    });
    return;
  }

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

// ── ROTA DE UPLOAD LOCAL DE IMAGENS ──
  if (req.method === "POST" && req.url === "/api/upload") {
    let chunks = [];
    req.on("data", chunk => chunks.push(chunk));
    req.on("end", () => {
      const body = Buffer.concat(chunks).toString("utf8");
      try {
        const parsed = JSON.parse(body);
        
        // Remove o cabeçalho do base64 (ex: "data:image/jpeg;base64,")
        const base64Data = parsed.data.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, 'base64');
        
        // Gera um nome único e salva na pasta uploads
        const fileName = 'uploads/' + Date.now() + '_' + parsed.filename.replace(/[^a-zA-Z0-9.]/g, '');
        const filePath = path.join(STATIC_DIR, fileName);

        // Garante que a pasta uploads existe e salva o arquivo
        if (!fs.existsSync(path.join(STATIC_DIR, 'uploads'))) {
          fs.mkdirSync(path.join(STATIC_DIR, 'uploads'));
        }
        fs.writeFileSync(filePath, buffer);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ url: fileName })); // Retorna o caminho da foto salva
      } catch(e) {
        console.error("Erro ao salvar imagem:", e);
        res.writeHead(500);
        res.end(JSON.stringify({ error: "Erro ao salvar imagem no servidor local." }));
      }
    });
    return;
  }

server.listen(PORT, "0.0.0.0", () => {
  console.log("════════════════════════════════════════");
  console.log("  🏛️  ReMemória — Servidor iniciado!");
  console.log(`  📡  Local: http://localhost:${PORT}`);
  console.log(`  🤖  IA: ${GEMINI_MODEL}`);
  console.log("════════════════════════════════════════");
});