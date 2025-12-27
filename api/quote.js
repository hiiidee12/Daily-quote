// api/quote.js — Random Quote Generator for Farcaster Frame

export default function handler(req, res) {
  // Daftar kutipan dalam bahasa Inggris
  const quotes = [
    { text: "Don't trust, verify.", author: "Vitalik Buterin" },
    { text: "Code is law.", author: "Lawrence Lessig" },
    { text: "Freedom is the ability to speak your mind without fear.", author: "Edward Snowden" },
    { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
    { text: "Be fearful when others are greedy. Be greedy when others are fearful.", author: "Warren Buffett" },
    { text: "Not your keys, not your crypto.", author: "Anonymous" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "The Internet is becoming the town square for the global village of tomorrow.", author: "Bill Gates" },
    { text: "Privacy is not an option, and it shouldn't be the price we accept for just getting on the Internet.", author: "Gary Kovacs" },
    { text: "Farcaster is the decentralized social layer we've been waiting for.", author: "DWR" }
  ];

  // Pilih kutipan acak
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  // Ambil data Farcaster
  let fid = "–";
  let address = "–";
  try {
    if (req.body?.untrustedData) {
      fid = req.body.untrustedData.fid || "–";
      address = req.body.untrustedData.address || "–";
    }
  } catch (e) {
    // Ignore
  }

  // Buat HTML respons
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Quote</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #f8fafc;
          color: #0f172a;
          text-align: center;
          padding: 20px;
          line-height: 1.6;
        }
        .container {
          max-width: 500px;
          margin: 0 auto;
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .quote {
          font-size: 18px;
          margin: 20px 0;
          font-style: italic;
          color: #1e293b;
        }
        .author {
          font-weight: 600;
          color: #0ea5e9;
          margin-top: 8px;
        }
        .info {
          margin: 20px 0;
          padding: 12px;
          background: #f1f5f9;
          border-radius: 10px;
          font-size: 14px;
        }
        .btn {
          display: inline-block;
          background: #0ea5e9;
          color: white;
          text-decoration: none;
          padding: 12px 28px;
          border-radius: 12px;
          font-weight: 600;
          margin-top: 16px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>✨ Daily Quote</h2>
        <div class="quote">“${randomQuote.text}”</div>
        <div class="author">— ${randomQuote.author}</div>

        <div class="info">
          <p><strong>FID:</strong> ${fid}</p>
          <p><strong>Wallet:</strong> ${address}</p>
        </div>

        <a href="/" class="btn">🔁 New Quote</a>
      </div>
    </body>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}
