const { spawn } = require('child_process');
const http = require('http');

async function run() {
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const chrome = spawn(chromePath, [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    '--window-size=1280,800',
    'http://localhost:3001/'
  ]);

  // Wait 2s for Chrome to start
  await new Promise(r => setTimeout(r, 2000));

  // Get debug target
  http.get('http://127.0.0.1:9222/json', (res) => {
    let data = '';
    res.on('data', d => data += d);
    res.on('end', async () => {
      const targets = JSON.parse(data);
      console.log('Targets:', targets.map(t => t.url));
      const pageTarget = targets.find(t => t.type === 'page');
      if (!pageTarget) {
        console.error('No page target');
        chrome.kill();
        return;
      }
      
      const wsUrl = pageTarget.webSocketDebuggerUrl;
      console.log('WS URL:', wsUrl);
      chrome.kill();
    });
  });
}

run().catch(console.error);
