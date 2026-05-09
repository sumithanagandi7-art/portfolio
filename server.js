// =============================================
//  Portfolio Backend — server.js
//  Stack: Node.js + Express
//  Purpose: Handle contact form submissions
// =============================================

const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ─────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS) from current folder
app.use(express.static(path.join(__dirname)));

// ── In-memory message store (no DB needed) ─
const messages = [];

// ── Routes ────────────────────────────────

// Home — serve the portfolio
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// POST /contact — receive form data
app.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Name, email, and message are required.'
    });
  }

  // Email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email format.' });
  }

  // Save message
  const entry = {
    id: messages.length + 1,
    name,
    email,
    subject: subject || 'No subject',
    message,
    receivedAt: new Date().toISOString()
  };
  messages.push(entry);

  console.log(`\n📨 New message from ${name} <${email}>`);
  console.log(`   Subject : ${entry.subject}`);
  console.log(`   Message : ${message}`);
  console.log(`   Time    : ${entry.receivedAt}\n`);

  return res.status(200).json({
    success: true,
    message: `Thanks ${name}! Your message has been received. I'll reply to ${email} soon.`
  });
});

// GET /messages — view all submitted messages (admin)
app.get('/messages', (req, res) => {
  res.json({ total: messages.length, messages });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── Start Server ───────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Portfolio server running at http://localhost:${PORT}`);
  console.log(`📬 Contact form endpoint: POST http://localhost:${PORT}/contact`);
});
