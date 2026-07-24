const http = require("http");
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(process.argv[2] || ".");
const PORT = parseInt(process.argv[3] || "8080", 10);
const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".json": "application/json",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".webp": "image/webp", ".gif": "image/gif", ".mp4": "video/mp4",
  ".ico": "image/x-icon", ".svg": "image/svg+xml", ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};
http.createServer((req, res) => {
  try {
    let p = decodeURIComponent(req.url.split("?")[0]);
    if (p === "/") p = "/index.html";
    const fp = path.join(ROOT, p);
    if (!fp.startsWith(ROOT)) { res.writeHead(403); return res.end("Forbidden"); }
    fs.stat(fp, (e, st) => {
      if (e || !st.isFile()) { res.writeHead(404); return res.end("Not found: " + p); }
      const ext = path.extname(fp).toLowerCase();
      const type = MIME[ext] || "application/octet-stream";
      const range = req.headers.range;
      if (range && (ext === ".mp4")) {
        const m = /bytes=(\d*)-(\d*)/.exec(range) || [];
        const start = parseInt(m[1] || "0", 10);
        const end = m[2] ? parseInt(m[2], 10) : st.size - 1;
        res.writeHead(206, {
          "Content-Type": type, "Accept-Ranges": "bytes",
          "Content-Range": `bytes ${start}-${end}/${st.size}`,
          "Content-Length": end - start + 1,
        });
        fs.createReadStream(fp, { start, end }).pipe(res);
      } else {
        res.writeHead(200, { "Content-Type": type, "Cache-Control": "no-cache", "Accept-Ranges": "bytes", "Content-Length": st.size });
        fs.createReadStream(fp).pipe(res);
      }
    });
  } catch (err) { res.writeHead(500); res.end(String(err)); }
}).listen(PORT, () => console.log("Static server on http://localhost:" + PORT + " root=" + ROOT));
