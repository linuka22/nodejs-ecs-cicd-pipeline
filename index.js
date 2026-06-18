const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const totalMem = Math.round(os.totalmem() / 1024 / 1024);
  const freeMem = Math.round(os.freemem() / 1024 / 1024);
  const usedMem = totalMem - freeMem;
  const memPercent = Math.round((usedMem / totalMem) * 100);
  const uptime = Math.floor(os.uptime());

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>System Info API</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; background: #f5f5f5; min-height: 100vh; }
    .header { background: #0F6E56; color: #E1F5EE; padding: 1.5rem 2rem; display: flex; align-items: center; justify-content: space-between; }
    .header h1 { font-size: 22px; font-weight: 500; }
    .header p { font-size: 13px; color: #9FE1CB; margin-top: 4px; }
    .badge { background: #1D9E75; color: #E1F5EE; font-size: 12px; padding: 4px 14px; border-radius: 20px; }
    .container { max-width: 860px; margin: 2rem auto; padding: 0 1.5rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 12px; }
    .card { background: #fff; border: 0.5px solid #e0e0e0; border-radius: 12px; padding: 1.25rem; }
    .card-label { font-size: 12px; color: #888; margin-bottom: 8px; }
    .card-value { font-size: 22px; font-weight: 500; color: #1a1a1a; }
    .card-sub { font-size: 12px; color: #aaa; margin-top: 4px; }
    .card-wide { grid-column: span 2; }
    .mem-bar { height: 8px; background: #f0f0f0; border-radius: 4px; margin-top: 10px; overflow: hidden; }
    .mem-fill { height: 100%; background: #1D9E75; border-radius: 4px; transition: width 0.5s; }
    .footer { background: #fff; border: 0.5px solid #e0e0e0; border-radius: 12px; padding: 1rem 1.25rem; display: flex; justify-content: space-between; font-size: 12px; color: #aaa; }
    .dot { display: inline-block; width: 8px; height: 8px; background: #1D9E75; border-radius: 50%; margin-right: 6px; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1>System Info API</h1>
      <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:10px;">
  <span style="background:#1D9E75; color:#E1F5EE; font-size:11px; font-weight:500; padding:4px 12px; border-radius:20px;">🐳 Docker</span>
  <span style="background:#1D9E75; color:#E1F5EE; font-size:11px; font-weight:500; padding:4px 12px; border-radius:20px;">📦 AWS ECR</span>
  <span style="background:#1D9E75; color:#E1F5EE; font-size:11px; font-weight:500; padding:4px 12px; border-radius:20px;">☁️ AWS ECS Fargate</span>
  <span style="background:#1D9E75; color:#E1F5EE; font-size:11px; font-weight:500; padding:4px 12px; border-radius:20px;">⚙️ GitHub Actions CI/CD</span>
  <span style="background:#1D9E75; color:#E1F5EE; font-size:11px; font-weight:500; padding:4px 12px; border-radius:20px;">🔁 Auto Deploy on Push</span>
</div>
    </div>
    <span class="badge"><span class="dot"></span>Live</span>
  </div>

  <div class="container">
    <div class="grid">
      <div class="card">
        <div class="card-label">Hostname</div>
        <div class="card-value" style="font-size:15px; word-break:break-all;">${os.hostname()}</div>
        <div class="card-sub">Container ID</div>
      </div>
      <div class="card">
        <div class="card-label">Platform</div>
        <div class="card-value">${os.platform()}</div>
        <div class="card-sub">${os.arch()} architecture</div>
      </div>
      <div class="card">
        <div class="card-label">Node.js</div>
        <div class="card-value">${process.version}</div>
        <div class="card-sub">Runtime version</div>
      </div>
      <div class="card">
        <div class="card-label">Uptime</div>
        <div class="card-value">${uptime.toLocaleString()}s</div>
        <div class="card-sub">Since container start</div>
      </div>
    </div>

    <div class="grid">
      <div class="card card-wide">
        <div class="card-label">Memory usage</div>
        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
          <span style="font-size:14px; color:#1a1a1a;">${usedMem} MB used (${memPercent}%)</span>
          <span style="font-size:14px; color:#888;">${totalMem} MB total</span>
        </div>
        <div class="mem-bar"><div class="mem-fill" style="width:${memPercent}%"></div></div>
        <div class="card-sub" style="margin-top:6px;">${freeMem} MB free</div>
      </div>
      <div class="card">
        <div class="card-label">Timestamp</div>
        <div class="card-value" style="font-size:14px;">${new Date().toISOString()}</div>
        <div class="card-sub">Current server time</div>
      </div>
    </div>

    <div class="footer">
      <span>Built with Node.js + Express</span>
      <span>GET /health → { status: "healthy" }</span>
    </div>
  </div>
</body>
</html>`);
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
