# 💖 Barbie's Cyber Dreamhouse CTF

A Barbie-themed Capture The Flag (CTF) practice platform built for TSA Cybersecurity competitions. 20 beginner-friendly challenges across 6 security categories, fully static (no backend required), with multi-user support via browser localStorage.

**Live demo:** _(paste your Netlify URL here after deployment)_

---

## Player Instructions

### Getting Started

1. Open the site URL in your browser.
2. Enter your name when prompted — your progress is saved automatically in your browser.
3. Click any challenge card to open it. Read the description, download any provided files, and submit your flag in the input box.
4. Flags follow the format `CTF{...}` — submission is case-insensitive.
5. Use the **💡 Hint** button if you're stuck (costs 0 points, but is tracked).
6. The **🏆 Leaderboard** button shows scores for all players who have used this browser.

### Categories

| Category | Emoji | Topics Covered |
|---|---|---|
| General Skills | 🎀 | File analysis, source reading, Base64, hex encoding |
| Cryptography | 🔐 | Caesar/ROT13, Atbash, Vigenere, MD5 hash cracking |
| Forensics | 🔍 | Steganography, file headers, git history, timestamps |
| Web Exploitation | 🌐 | HTML comments, cookie manipulation, JS obfuscation |
| Reversing | ⚙️ | Python reversing, Rockstar language, x86 assembly |
| Binary Exploitation | 💣 | Buffer overflow concepts, format string vulnerabilities |

### Useful Tools

- [CyberChef](https://gchq.github.io/CyberChef) — encoding/decoding (Base64, hex, ciphers)
- [crackstation.net](https://crackstation.net) — MD5 hash cracking
- Browser DevTools (`F12`) — cookie editing, JS console
- `steghide` / `binwalk` — steganography extraction
- `xxd` / hex editor — file header inspection

---

## Organizer / Hosting Instructions

### Answer Key

Open `answer_key.html` in the browser (same domain as the CTF). Enter the admin password when prompted. The answer key shows every flag, full solution walkthrough, and hints for each challenge.

> The admin password is shared separately with organizers and is **not** stored anywhere in plain text in the source code.

### Resetting a Player's Progress

Player data is stored in the browser's `localStorage` under keys prefixed with `barbieCtf_u_`. To reset a specific player:

```js
// Open DevTools Console on the CTF page
localStorage.removeItem('barbieCtf_u_PlayerName');
```

To wipe all CTF data entirely:

```js
Object.keys(localStorage)
  .filter(k => k.startsWith('barbieCtf_'))
  .forEach(k => localStorage.removeItem(k));
```

### Theme System

To create a new theme, open `main.js` and:

1. Add a new entry to the `THEMES` object following the existing `barbie` key as a template.
2. Change `const ACTIVE_THEME = 'barbie'` to your new theme key.
3. No other files need to be changed.

---

## Deploying to Netlify

This is a fully static site — no build step, no package.json.

### Option A: Drag & Drop (fastest)

1. Go to [netlify.com](https://netlify.com) and log in.
2. From the dashboard, drag the entire project folder into the deploy drop zone.
3. Done. Netlify gives you a URL instantly.

### Option B: Connect GitHub Repo (recommended for updates)

1. Push this repo to GitHub.
2. In Netlify: **Add new site → Import an existing project → GitHub**.
3. Select your repo.
4. Build settings:
   - **Build command:** _(leave blank)_
   - **Publish directory:** `.` (root)
5. Click **Deploy site**.

Every `git push` to `main` will automatically redeploy the site.

### Custom Domain (optional)

In Netlify: **Site settings → Domain management → Add custom domain**.

---

## Project Structure

```
.
├── index.html              # Main CTF interface
├── main.js                 # All game logic, questions, theme system
├── answer_key.html         # Password-protected answer key (organizers only)
├── netlify.toml            # Netlify deployment config + security headers
│
├── barbie_diary.txt        # Challenge 1 file
├── ken_vault.txt           # Challenge 2 file
├── vigenere_msg.txt        # Challenge 7 file
├── hash_challenge.txt      # Challenge 8 file
├── hidden_image.jpg        # Challenge 9 (steganography)
├── Palace.jpg              # Challenge 10 (corrupted header)
├── problem_5.zip           # Challenge 11 (git forensics)
├── problem_6.zip           # Challenge 12 (timestamp forensics)
├── dream_website.html      # Challenge 13 (view source)
├── cookie_challenge.html   # Challenge 14 (cookie manipulation)
├── wardrobe.js             # Challenge 15 (JS obfuscation)
├── barbie_puzzle.py        # Challenge 16 (Python reversing)
├── lyrics.txt              # Challenge 17 (Rockstar language)
├── ken_assembly.txt        # Challenge 18 (assembly trace)
├── buffer_barbie.c         # Challenge 19 (buffer overflow)
└── format_ken.c            # Challenge 20 (format string)
```

---

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
