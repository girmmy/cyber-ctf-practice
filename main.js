'use strict';

/* ═══════════════════════════════════════════════════════════
   THEME SYSTEM
   To create a new theme: add an entry to THEMES below, then
   change ACTIVE_THEME to its key.
═══════════════════════════════════════════════════════════ */
const THEMES = {
  barbie: {
    siteTitle:      "💖 Barbie's Cyber Dreamhouse 💖",
    primaryColor:   "#ff1493",
    secondaryColor: "#c71585",
    accentColor:    "#ffd700",
    bgGradient:     "linear-gradient(160deg,#ff69b4 0%,#ff1493 40%,#c71585 80%,#8b0057 100%)",
    panelFrom:      "#ff69b4",
    panelTo:        "#c71585",
    sparkles:       true,
    confetti:       ["#ff69b4","#ffd700","#ff1493","#fff","#da70d6","#ffb6c1"],
    doneTitle:      "Dreamhouse Conquered!",
    doneMsg:        "You're officially a Cyber Barbie Champion! 💅",
  },
  // ── Add future themes here ───────────────────────────────
  // space: { siteTitle: "🚀 Space CTF 🚀", primaryColor: "#6366f1", ... },
};

const ACTIVE_THEME = 'barbie';
const T = THEMES[ACTIVE_THEME];

/* ═══════════════════════════════════════════════════════════
   CATEGORIES
═══════════════════════════════════════════════════════════ */
const CATS = {
  general:  { label: "General Skills",      color: "#FF85A1", emoji: "🎀" },
  crypto:   { label: "Cryptography",        color: "#D891EF", emoji: "🔐" },
  forensics:{ label: "Forensics",           color: "#93C5FD", emoji: "🔍" },
  web:      { label: "Web Exploitation",    color: "#86EFAC", emoji: "🌐" },
  reversing:{ label: "Reversing",           color: "#FDBA74", emoji: "⚙️"  },
  binary:   { label: "Binary Exploitation", color: "#F87171", emoji: "💣" },
};

/* ═══════════════════════════════════════════════════════════
   QUESTIONS  (20 total)
   Fields: id, cat (key of CATS), title, desc (HTML),
           files (array of {href,dl,label} — dl=null means open in tab),
           hint, ans (case-insensitive match)
═══════════════════════════════════════════════════════════ */
const QS = [

  /* ── GENERAL SKILLS ─────────────────────────────────── */
  {
    id:1, cat:"general", title:"Barbie's Dream Diary",
    desc:`Barbie's digital diary got scrambled by a rogue program!
    The flag was split into <strong>5 fragments</strong> and scattered throughout her
    morning log, mixed in with normal diary entries.<br><br>
    Download the log file, filter out the noise, and piece the fragments together
    <em>in order</em> to reconstruct the full flag.`,
    files:[{href:"barbie_diary.txt", dl:"barbie_diary.txt", label:"📔 Download Diary Log"}],
    hint:"Use Ctrl+F to search for 'CTF' in the file. Five separate lines contain flag fragments — find them all and concatenate them in the order they appear in the file.",
    ans:"b84698cf1fd668a869de501631dc6558fa9934be8718a6a7272c0d6dc10f7ced",
  },
  {
    id:2, cat:"general", title:"Ken's Java Vault",
    desc:`Ken built a password-protected vault for Barbie's dreamhouse. He claims it's
    "totally secure" — but he may have made a classic beginner mistake.<br><br>
    Download the Java source and find the password <em>without running it</em>.
    Read carefully!<br><br>
    <strong>The flag is:</strong> <code>CTF{password}</code> where
    <em>password</em> is what you find in the code.`,
    files:[{href:"ken_vault.txt", dl:"KensDreamhouseVault.java", label:"☕ Download Source Code"}],
    hint:"Look at the checkPassword() method. Ken left the password as a plain string literal right there in the code. Wrap it in CTF{} to get the flag.",
    ans:"8ab1ecfd61d73a079023221975144add5f0e2ec97499a9c117ec1aa58335c7fd",
  },
  {
    id:3, cat:"general", title:"Base64 Beach Party",
    desc:`Barbie's tech-savvy friend Nikki sent an encoded message from the beach.
    "It's just base64," she said casually, sipping a smoothie. Decode it!<br><br>
    <code>Q1RGe2I0czM2NF9tNGszMHYzcl9jMG1wbDN0M30=</code><br><br>
    <strong>Hint:</strong> Base64 uses letters, numbers, <code>+</code>, <code>/</code>,
    and <code>=</code> padding. Try <strong>CyberChef</strong>
    (gchq.github.io/CyberChef) → "From Base64" operation.`,
    files:[],
    hint:"CyberChef → From Base64. Or in a terminal: echo 'Q1RGe2I0czM2NF9tNGszMHYzcl9jMG1wbDN0M30=' | base64 -d",
    ans:"51c97f2a66501044b3e0ad43b6f5f5c995fa4d6673dec8fdd7075e80aa36abf7",
  },
  {
    id:4, cat:"general", title:"Hex Heels",
    desc:`Barbie designed a limited-edition shoe collection and hid the product code
    in hexadecimal — because she's classy like that. Decode the hex!<br><br>
    <code>43 54 46 7b 68 33 78 5f 68 33 33 6c 73 5f 34 72 33 5f 66 34 62 75 6c 30 75 73 7d</code><br><br>
    <strong>Hint:</strong> Each pair of hex digits = one ASCII character.
    <code>43</code>=C, <code>54</code>=T, <code>46</code>=F…
    Try CyberChef → "From Hex".`,
    files:[],
    hint:"In Python: bytes.fromhex('435446...').decode(). In CyberChef: 'From Hex' operation. The result starts with CTF{.",
    ans:"72cc16f3afb4f1427f71ef32b888933491850c3a1ffbc905450159302cafbb5d",
  },

  /* ── CRYPTOGRAPHY ────────────────────────────────────── */
  {
    id:5, cat:"crypto", title:"Pink Caesar",
    desc:`Raquelle intercepted Barbie's secret message! It's been encrypted with a
    classic cipher. Can you recover the original?<br><br>
    <code>PGS{e0g13_1f_f0_y4fg_f34f0a}</code><br><br>
    <strong>Hint:</strong> ROT13 is a Caesar cipher with a shift of exactly 13.
    Only letters are shifted — numbers and symbols stay the same.`,
    files:[],
    hint:"ROT13: shift every letter 13 places forward (wrapping around). P→C, G→T, S→F… In terminal: echo 'PGS{e0g13_1f_f0_y4fg_f34f0a}' | tr 'A-Za-z' 'N-ZA-Mn-za-m'",
    ans:"3780d9dcaea7230bbaa6a49de194d478a976f1633a87225c12b77ea56b45ec1f",
  },
  {
    id:6, cat:"crypto", title:"Barbie's Mirror Code",
    desc:`Barbie's magic mirror encodes messages by reversing the entire alphabet —
    A↔Z, B↔Y, C↔X, and so on. This is called an <strong>Atbash cipher</strong>!<br><br>
    Decode this mirror-encoded message:<br><br>
    <code>XGU{zgyzsh_rh_toznlilfh}</code><br><br>
    <strong>Hint:</strong> Each letter maps to its "mirror image" in the alphabet.
    Numbers and symbols stay the same.`,
    files:[],
    hint:"Atbash: A=Z, B=Y, C=X... X=C, G=T, U=F → starts with CTF. Finish decoding the rest. Try dcode.fr/atbash-cipher or CyberChef → Atbash.",
    ans:"eb411287850e30727d0f69e028f6e5ded9b459f211d4f7b791cdf54d960f8429",
  },
  {
    id:7, cat:"crypto", title:"Vigenere Vanity",
    desc:`A mysterious admirer sent Barbie an encoded love letter. The hint says the
    key is… Barbie's name! Download and decode the Vigenere cipher.<br><br>
    <strong>Key: BARBIE</strong><br><br>
    <strong>Hint:</strong> In a Vigenere cipher, each letter is shifted by the
    corresponding key letter (A=0, B=1, …). The key repeats: B,A,R,B,I,E,B,A,R…
    Only letters are shifted.`,
    files:[{href:"vigenere_msg.txt", dl:"secret_letter.txt", label:"💌 Download Secret Letter"}],
    hint:"Use CyberChef → 'Vigenère Decode' with key BARBIE. Or try dcode.fr/vigenere-cipher. Non-letter characters (numbers, underscores, brackets) pass through unchanged.",
    ans:"84c928f53c01cea0f69626e8c490b825b81b6b7ccb24c5f694ba035674678571",
  },
  {
    id:8, cat:"crypto", title:"Hash Bash",
    desc:`Ken thought hashing his vault password would keep it safe. A spy intercepted
    the MD5 hash — now can you crack it?<br><br>
    Download the challenge file for full details.<br><br>
    Once you crack the plaintext password, wrap it in <code>CTF{password}</code>
    to get the flag.`,
    files:[{href:"hash_challenge.txt", dl:"hash_challenge.txt", label:"🔒 Download Hash Challenge"}],
    hint:"Try crackstation.net — paste the MD5 hash to look it up instantly. The password is a shade of pink, all lowercase, one word. Wrap it in CTF{} for the flag.",
    ans:"11c40cf09d63751a00eece294816f2dfc078fdad3b0d12816d92b6e4ee2265c5",
  },

  /* ── FORENSICS ───────────────────────────────────────── */
  {
    id:9, cat:"forensics", title:"Barbie's Hidden Selfie",
    desc:`Barbie took what looks like an innocent selfie — but Skipper suspects
    something is hidden <em>inside</em> the file itself.<br><br>
    This technique is called <strong>steganography</strong> — hiding data within
    another file. Download the image and investigate!<br><br>
    <strong>Tools:</strong> <code>steghide</code>, <code>binwalk</code>,
    or <code>strings</code> on the command line.`,
    files:[{href:"hidden_image.jpg", dl:"barbie_selfie.jpg", label:"🤳 Download Selfie"}],
    hint:"Try: strings barbie_selfie.jpg | grep CTF  — or — binwalk barbie_selfie.jpg  — or — steghide extract -sf barbie_selfie.jpg (try an empty passphrase when prompted).",
    ans:"58be59f9c7d67ce612776fbdd9fcc0a6c9ead42f1312413360db119d35e263b0",
  },
  {
    id:10, cat:"forensics", title:"Ken's Corrupted Photo",
    desc:`Ken took a beautiful photo but the image file won't open — the
    <strong>file header was tampered with</strong>!<br><br>
    Download the corrupted image and open it in a hex editor. JPEG files must
    start with the magic bytes <code>FF D8 FF</code>. Fix the header to restore
    the image — the flag is inside!`,
    files:[{href:"Palace.jpg", dl:"corrupted_photo.jpg", label:"🖼️ Download Corrupted Photo"}],
    hint:"Use HxD (Windows), hexedit (Linux), or xxd (terminal). A valid JPEG starts with FF D8 FF E0 or FF D8 FF E1. Fix the first bytes, save, and open the image. The flag is visible in the picture.",
    ans:"d28d1a0f583bf6d38f9bdd984ff6e06547c24f5ab4bc38e46f3b8c4cd8f3488c",
  },
  {
    id:11, cat:"forensics", title:"Barbie's Git Lab",
    desc:`Barbie's coding team is working on a super-secret project — but someone's
    git commits keep <em>breaking the build</em>. The team needs to know:
    <strong>who is the culprit?</strong><br><br>
    Download the project, explore the git history, and identify the bad commit.`,
    files:[{href:"problem_5.zip", dl:"BarbieLab.zip", label:"💻 Download Project Files"}],
    hint:"Extract the zip and run: git log --oneline  — look for a suspicious commit. Then git show <hash> to inspect it. The flag is hidden in the git history.",
    ans:"879442231179b323a43835b529f7b458d23fc0dea2824e2f93e6f98b2f226e88",
  },
  {
    id:12, cat:"forensics", title:"Barbie's Time Capsule",
    desc:`Barbie was working on something important when an accident
    <em>overwrote everything</em>. But git never truly forgets!<br><br>
    Download the repository and travel back through the commit history to recover
    what Barbie was originally working on. The flag is hidden in an older version.`,
    files:[{href:"problem_6.zip", dl:"TimeCapsule.zip", label:"⏳ Download Time Capsule"}],
    hint:"Extract and run: git log --all --oneline  — then: git checkout <old-hash>  to travel back in time. Look at file contents across different commits.",
    ans:"3097231e1b472a4afbba50b4cb7ede02bb4e457228ed1c2ffc18939525fba425",
  },

  /* ── WEB EXPLOITATION ────────────────────────────────── */
  {
    id:13, cat:"web", title:"Barbie's Secret Source",
    desc:`Barbie has an official fan website! It looks perfect on the surface —
    but developers sometimes leave secrets in the HTML <em>source code</em>
    by accident.<br><br>
    Visit the page and use <strong>View Source</strong> to hunt for hidden comments.<br><br>
    <strong>How:</strong> Right-click → "View Page Source" or press
    <code>Ctrl+U</code> / <code>Cmd+U</code>`,
    files:[{href:"dream_website.html", dl:null, label:"🌐 Visit Barbie's Website"}],
    hint:"The flag is inside an HTML comment <!-- like this --> in the source code. Press Ctrl+U to view source, then Ctrl+F and search for 'CTF'.",
    ans:"6c209ebdafa186af05673cdf225674d63e2afd97519422688d1e6619062857aa",
  },
  {
    id:14, cat:"web", title:"Ken's Cookie Jar",
    desc:`Ken built a VIP members-only club secured by a browser
    <strong>cookie</strong>. Only admins can see the secret content — but his
    cookie check might be a little too easy to bypass…<br><br>
    Visit the challenge page and figure out how to set the right cookie!<br><br>
    <strong>Hint:</strong> Open DevTools (F12) → Console tab.
    Cookies can be set with <code>document.cookie</code>.`,
    files:[{href:"cookie_challenge.html", dl:null, label:"🍪 Visit the VIP Club"}],
    hint:"Open the VIP page → F12 → Console → type: document.cookie = \"isAdmin=true\" → click 'Check My VIP Status'. The page's JS reads the cookie to decide whether to show the flag.",
    ans:"ff56a8bddb0bb822003329e48225c543c2b171913b911db3ad4a76e93948728d",
  },
  {
    id:15, cat:"web", title:"Barbie's JS Wardrobe",
    desc:`Barbie locked her most treasured secret in a JavaScript file. The data is
    <em>right there</em> in the file — it's just encoded as character codes.<br><br>
    Download the JS file and decode the <code>barbieSecret</code> array to find
    the flag.<br><br>
    <strong>Hint:</strong> JavaScript's <code>String.fromCharCode()</code>
    converts numbers back to characters.`,
    files:[{href:"wardrobe.js", dl:"wardrobe.js", label:"👗 Download wardrobe.js"}],
    hint:"In browser DevTools (F12 → Console): String.fromCharCode(67,84,70,123,...)  using all numbers from the barbieSecret array. Or in Node.js: var a=[...]; a.map(x=>String.fromCharCode(x)).join('')",
    ans:"fde147e1c3e23f2801af18cbb60013ab582cedd307484eeb5f57908eedd10769",
  },

  /* ── REVERSING ───────────────────────────────────────── */
  {
    id:16, cat:"reversing", title:"Barbie's Python Puzzle",
    desc:`Ken wrote a Python password checker for Barbie's dreamhouse — but he
    forgot to write down what the actual password is!<br><br>
    Download the script and <strong>reverse-engineer</strong> the
    <code>check_password()</code> function to figure out what input makes it
    return <code>True</code>. That input <em>is</em> the flag.`,
    files:[{href:"barbie_puzzle.py", dl:"barbie_puzzle.py", label:"🐍 Download Python Puzzle"}],
    hint:"The function checks: [ord(c)+1 for c in s] == expected. To reverse it: original char = chr(expected[i]-1). In Python: ''.join([chr(x-1) for x in [68,85,71,124,113,122,117,105,49,111,96,115,52,119,52,115,116,52,101,126]])",
    ans:"364e97e9412b51dade97b7ccde09133ee3fe308bf13b268c0020f8c1d8b9b7a9",
  },
  {
    id:17, cat:"reversing", title:"Rockstar Barbie",
    desc:`Barbie received a mysterious song written in an <em>unusual programming
    language</em>. It looks like song lyrics — but it's actually a runnable
    program!<br><br>
    What does the program <strong>output</strong> when executed?
    Wrap the output in <code>CTF{}</code> for the flag.<br><br>
    <strong>Hint:</strong> This is the <strong>Rockstar</strong> language by
    Dylan Beattie. Run it at
    <a href="https://codewithrockstar.com/online" target="_blank" rel="noopener"
       style="color:#fde68a">codewithrockstar.com/online</a>`,
    files:[{href:"lyrics.txt", dl:"mystery_song.txt", label:"🎸 Download the Song"}],
    hint:"Go to codewithrockstar.com/online, paste all the lyrics, and click Run. Whatever it prints is the flag content — wrap it in CTF{}.",
    ans:"04355489417661cfdd422ba2b5bd50144f90da3df16c98f4e74a052fc22ecd05",
  },
  {
    id:18, cat:"reversing", title:"Ken's Assembly",
    desc:`Ken's old computer has an assembly program he forgot about. The program
    computes a value and prints it — <strong>what decimal number does it
    print?</strong><br><br>
    Download the file and trace through each instruction step by step to find the
    value in <code>rax</code> when <code>PRINT</code> is called.<br><br>
    The flag is <code>CTF{VALUE}</code> where VALUE is that decimal number.`,
    files:[{href:"ken_assembly.txt", dl:"ken_assembly.txt", label:"⚙️ Download Assembly Code"}],
    hint:"Work through it: rax=10, rbx=5, rax=15, rcx=15, rax=2, rax=2×15=30, rax=26, push 26, rax=100, pop rbx=26, rax=100+26=? Wrap the answer in CTF{}.",
    ans:"49c7bf568d04f19eed98a1db9b1e213cecf23451ebd01ac102cc2bfc8d1ef44b",
  },

  /* ── BINARY EXPLOITATION ─────────────────────────────── */
  {
    id:19, cat:"binary", title:"Barbie's Buffer",
    desc:`Barbie's dreamhouse security program was coded in a hurry and contains a
    <strong>classic vulnerability</strong>.<br><br>
    Download the C source and answer:<br>
    <ol>
      <li>What vulnerability exists in <code>enter_dreamhouse()</code>?</li>
      <li>What does <code>secret_room()</code> print?
          <em>(That string, wrapped in CTF{}, is the flag!)</em></li>
    </ol>
    You don't need to compile it — just read the code carefully.`,
    files:[{href:"buffer_barbie.c", dl:"buffer_barbie.c", label:"💻 Download buffer_barbie.c"}],
    hint:"The vulnerability is a buffer overflow — strcpy() and gets() have no length limits. secret_room() concatenates three char arrays: part1, part2, part3. Join them together and wrap in CTF{}.",
    ans:"9ef45d339e1a5f2d6db5f3e691da7e01b002cc18b475b229f0ddbb32fac743de",
  },
  {
    id:20, cat:"binary", title:"Ken's Format String",
    desc:`Ken built a diary app with a secret message hidden in memory. He also
    accidentally introduced a dangerous bug!<br><br>
    Download the C source and:<br>
    <ol>
      <li>Find <code>secret[]</code> — what string does it hold?
          Wrap it in <code>CTF{}</code> for the flag.</li>
      <li>Bonus: What is the format string vulnerability and how would you fix it?</li>
    </ol>`,
    files:[{href:"format_ken.c", dl:"format_ken.c", label:"💻 Download format_ken.c"}],
    hint:"Read the code: char secret[] = \"...\"; — that string IS the flag content, just wrap it in CTF{}. The bug: printf(diary_entry) should be printf(\"%s\", diary_entry).",
    ans:"a39341c8230010f8b9faae472964feceeeb0d97ba66662f8d285f7219357dd48",
  },
];

/* ═══════════════════════════════════════════════════════════
   STORAGE KEYS
═══════════════════════════════════════════════════════════ */
const KEY_USER   = n => 'barbieCtf_u_' + n;
const KEY_LAST   = 'barbieCtf_lastUser';
const KEY_LB     = 'barbieCtf_leaderboard';

/* ═══════════════════════════════════════════════════════════
   RUNTIME STATE
═══════════════════════════════════════════════════════════ */
let user          = null;   // current user object
let timerHandle   = null;
let activeDrawer  = null;
let pendingHintId = null;

/* ═══════════════════════════════════════════════════════════
   BOOT
═══════════════════════════════════════════════════════════ */
window.addEventListener('load', function () {
  applyTheme();
  buildLegend();
  buildGrid();
  buildDrawers();
  bindEvents();
  if (T.sparkles) spawnSparkles();

  const last = ls(KEY_LAST);
  if (last) {
    loginUser(last);
  } else {
    showModal('modal-user');
  }
});

/* ── Theme ──────────────────────────────────────────────── */
function applyTheme() {
  document.body.style.background = T.bgGradient;
  setVar('--primary',   T.primaryColor);
  setVar('--secondary', T.secondaryColor);
  setVar('--accent',    T.accentColor);
  setVar('--panel-from', T.panelFrom);
  setVar('--panel-to',   T.panelTo);
  el('site-title').textContent = T.siteTitle;
}
function setVar(k, v) { document.documentElement.style.setProperty(k, v); }

/* ── Sparkles ───────────────────────────────────────────── */
function spawnSparkles() {
  for (let i = 0; i < 28; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.style.cssText = [
      'left:'   + (Math.random() * 100) + 'vw',
      'top:'    + (Math.random() * 100) + 'vh',
      'width:'  + (4 + Math.random() * 6) + 'px',
      'height:' + (4 + Math.random() * 6) + 'px',
      '--d:'    + (2 + Math.random() * 4) + 's',
      '--dl:'   + (Math.random() * 5) + 's',
    ].join(';');
    document.body.appendChild(s);
  }
}

/* ── Legend ─────────────────────────────────────────────── */
function buildLegend() {
  const wrap = el('cat-legend');
  Object.values(CATS).forEach(function (c) {
    const d = document.createElement('div');
    d.className = 'leg-item';
    d.innerHTML = '<div class="leg-dot" style="background:' + c.color + '"></div>' +
                  c.emoji + '&nbsp;' + c.label;
    wrap.appendChild(d);
  });
}

/* ── Grid ───────────────────────────────────────────────── */
function buildGrid() {
  const grid = el('grid');
  QS.forEach(function (q) {
    const c = CATS[q.cat];
    const cell = document.createElement('div');
    cell.className = 'gcell';
    cell.dataset.id = q.id;
    cell.tabIndex = 0;
    cell.setAttribute('role', 'listitem');
    cell.setAttribute('aria-label', 'Challenge ' + q.id + ': ' + q.title);
    cell.innerHTML =
      '<div class="gcell-bar" style="background:' + c.color + '"></div>' +
      '<div class="gcell-body">' +
        '<div class="gcell-num">' + pad2(q.id) + '</div>' +
        '<div class="gcell-title">' + q.title + '</div>' +
        '<div class="gcell-cat">' + c.emoji + ' ' + c.label + '</div>' +
      '</div>' +
      '<div class="gcell-solved-overlay">✅</div>';
    cell.addEventListener('click', function ()  { openDrawer(q.id); });
    cell.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDrawer(q.id); }
    });
    grid.appendChild(cell);
  });
}

/* ── Drawers ────────────────────────────────────────────── */
function buildDrawers() {
  const wrap = el('drawers');
  QS.forEach(function (q) {
    const c = CATS[q.cat];
    const fileHtml = (q.files || []).map(function (f) {
      return f.dl
        ? '<a class="file-link" href="' + f.href + '" download="' + f.dl + '">' + f.label + '</a>'
        : '<a class="file-link" href="' + f.href + '" target="_blank" rel="noopener">' + f.label + '</a>';
    }).join('');

    const d = document.createElement('div');
    d.className = 'drawer';
    d.id = 'dr-' + q.id;
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-modal', 'true');
    d.setAttribute('aria-labelledby', 'dtitle-' + q.id);
    d.innerHTML =
      '<div class="drawer-panel">' +
        '<div class="drawer-header">' +
          '<div class="d-title-row">' +
            '<span class="d-cat-badge" style="background:' + c.color + '">' + c.emoji + ' ' + c.label + '</span>' +
            '<span class="d-title" id="dtitle-' + q.id + '">' + pad2(q.id) + '. ' + q.title + '</span>' +
          '</div>' +
          '<button class="d-close" data-close>✕ Close</button>' +
        '</div>' +
        '<div class="drawer-body">' +
          '<div class="d-desc">' + q.desc + '</div>' +
          fileHtml +
          '<div class="ans-label">🚩 Your Flag</div>' +
          '<div class="ans-row">' +
            '<input class="ans-input" type="text" placeholder="CTF{…}" autocomplete="off" data-qid="' + q.id + '" />' +
            '<button class="btn-submit" data-submit="' + q.id + '">Submit</button>' +
          '</div>' +
          '<div class="feedback" role="status" aria-live="polite"></div>' +
          '<div class="hint-section">' +
            '<button class="btn-hint" data-hint="' + q.id + '">💡 Get Hint (−1 point)</button>' +
            '<div class="hint-text" id="hint-box-' + q.id + '"></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="drawer-backdrop" data-close></div>';
    wrap.appendChild(d);
  });

  /* ── Drawer event delegation ────────────────────────── */
  wrap.addEventListener('click', function (e) {
    if (e.target.closest('[data-close]')) {
      const dr = e.target.closest('.drawer');
      if (dr) closeDrawerEl(dr);
      return;
    }
    const sub = e.target.closest('[data-submit]');
    if (sub) {
      const qid = +sub.dataset.submit;
      const inp = wrap.querySelector('.ans-input[data-qid="' + qid + '"]');
      if (inp) doSubmit(qid, inp);
      return;
    }
    const hint = e.target.closest('[data-hint]');
    if (hint) { showHintPrompt(+hint.dataset.hint); }
  });

  wrap.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && activeDrawer) { closeDrawerEl(activeDrawer); return; }
    if (e.key === 'Enter' && e.target.classList.contains('ans-input')) {
      const qid = +e.target.dataset.qid;
      doSubmit(qid, e.target);
    }
  });
}

/* ── Open / Close drawers ───────────────────────────────── */
function openDrawer(id) {
  if (activeDrawer) closeDrawerEl(activeDrawer);
  const dr = document.getElementById('dr-' + id);
  if (!dr) return;
  dr.classList.add('open');
  dr.setAttribute('aria-hidden', 'false');
  activeDrawer = dr;
  const inp = dr.querySelector('.ans-input');
  if (inp) setTimeout(function () { inp.focus(); }, 330);
}
function closeDrawerEl(dr) {
  dr.classList.remove('open');
  dr.setAttribute('aria-hidden', 'true');
  if (activeDrawer === dr) activeDrawer = null;
}

/* ── SHA-256 helper (Web Crypto API) ────────────────────── */
async function sha256hex(str) {
  const buf = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(str)
  );
  return Array.from(new Uint8Array(buf))
    .map(function(b){ return b.toString(16).padStart(2,'0'); })
    .join('');
}

/* ── Answer checking ────────────────────────────────────── */
async function doSubmit(qid, inp) {
  if (!user) return;
  const dr  = document.getElementById('dr-' + qid);
  const fb  = dr.querySelector('.feedback');
  const val = (inp.value || '').trim();

  if (!val) { setFb(fb, 'Please enter a flag.', ''); return; }

  if (user.solved[qid]) { setFb(fb, '✅ Already solved!', 'already'); return; }

  const q = QS.find(function (x) { return x.id === qid; });
  if (!q) return;

  const inputHash = await sha256hex(val.toLowerCase());
  if (inputHash === q.ans) {
    user.score++;
    user.solved[qid] = true;
    saveUser();
    refreshScore();
    markSolved(qid);
    setFb(fb, '🎉 Correct! +1 point', 'correct');
    confetti();
    checkDone();
  } else {
    setFb(fb, '❌ Incorrect — try again!', 'incorrect');
    inp.select();
  }
}
function setFb(el, msg, cls) {
  el.textContent = msg;
  el.className = 'feedback' + (cls ? ' ' + cls : '');
}

/* ── Hints ──────────────────────────────────────────────── */
function showHintPrompt(qid) {
  const q = QS.find(function (x) { return x.id === qid; });
  if (!q) return;

  if (user && user.hintUsed[qid]) {
    const box = document.getElementById('hint-box-' + qid);
    if (box) { box.textContent = q.hint; box.classList.add('visible'); }
    return;
  }

  pendingHintId = qid;
  el('hint-preview-text').textContent = q.hint;
  el('hint-penalty-text').textContent = user && user.score > 0
    ? 'This will deduct 1 point from your score.'
    : 'No deduction (score is already 0).';
  showModal('modal-hint');
}

/* ── User management ────────────────────────────────────── */
function loginUser(name) {
  name = name.trim();
  if (!name) return;

  let data = null;
  try { data = JSON.parse(ls(KEY_USER(name))); } catch (e) {}

  if (!data) {
    data = { name, score: 0, solved: {}, hintUsed: {}, firstStartMs: Date.now(), elapsedSec: 0, completedAt: null };
    QS.forEach(function (q) { data.solved[q.id] = false; data.hintUsed[q.id] = false; });
  } else {
    QS.forEach(function (q) {
      if (data.solved[q.id]   === undefined) data.solved[q.id]   = false;
      if (data.hintUsed[q.id] === undefined) data.hintUsed[q.id] = false;
    });
  }

  user = data;
  lsSet(KEY_LAST, name);
  saveUser();

  el('user-display').textContent = '👤 ' + user.name;
  refreshScore();

  // Restore solved cells
  QS.forEach(function (q) { if (user.solved[q.id]) markSolved(q.id); });

  // Resume timer from saved elapsed
  if (user.elapsedSec > 0 && !user.completedAt) {
    user.firstStartMs = Date.now() - user.elapsedSec * 1000;
  }
  el('timer-display').textContent = fmtTime(user.elapsedSec);
  if (!user.completedAt) startTimer();

  hideModal('modal-user');
}

function saveUser() {
  if (!user) return;
  lsSet(KEY_USER(user.name), JSON.stringify(user));
}

/* ── Timer ──────────────────────────────────────────────── */
function startTimer() {
  if (timerHandle) clearInterval(timerHandle);
  timerHandle = setInterval(function () {
    if (!user || user.completedAt) return;
    user.elapsedSec = Math.floor((Date.now() - user.firstStartMs) / 1000);
    el('timer-display').textContent = fmtTime(user.elapsedSec);
  }, 1000);
}
function stopTimer() { clearInterval(timerHandle); timerHandle = null; }
function fmtTime(s) {
  return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
}

/* ── Score ──────────────────────────────────────────────── */
function refreshScore() { el('score-display').textContent = user ? user.score : 0; }

/* ── Mark cell solved ───────────────────────────────────── */
function markSolved(qid) {
  const cell = document.querySelector('.gcell[data-id="' + qid + '"]');
  if (cell) cell.classList.add('solved');
}

/* ── Completion check ───────────────────────────────────── */
function checkDone() {
  if (!user) return;
  const done = QS.every(function (q) { return user.solved[q.id]; });
  if (!done) return;

  stopTimer();
  user.completedAt = Date.now();
  saveUser();
  updateLeaderboard(user.name, user.score, user.elapsedSec);

  el('done-title').textContent = T.doneTitle;
  el('done-score').textContent = user.score + ' / ' + QS.length;
  el('done-time').textContent  = '⏰ ' + fmtTime(user.elapsedSec);
  el('done-msg').textContent   = T.doneMsg;
  showModal('modal-done');
  confetti(80);
}

/* ── Leaderboard ────────────────────────────────────────── */
function updateLeaderboard(name, score, time) {
  let lb = [];
  try { lb = JSON.parse(ls(KEY_LB)) || []; } catch (e) {}
  const idx = lb.findIndex(function (e) { return e.name === name; });
  const entry = { name, score, time, at: Date.now() };
  if (idx >= 0) lb[idx] = entry; else lb.push(entry);
  lsSet(KEY_LB, JSON.stringify(lb));
}

function renderLeaderboard() {
  let lb = [];
  try { lb = JSON.parse(ls(KEY_LB)) || []; } catch (e) {}
  // Include current user even if not on LB yet
  if (user && !lb.some(function (e) { return e.name === user.name; })) {
    lb.push({ name: user.name, score: user.score, time: user.elapsedSec, at: Date.now() });
  }
  lb.sort(function (a, b) { return b.score - a.score || a.time - b.time; });

  const wrap = el('lb-content');
  if (!lb.length) {
    wrap.innerHTML = '<p style="color:#aaa;text-align:center;padding:.5rem 0">No scores yet!</p>';
    return;
  }
  const icons = ['🥇', '🥈', '🥉'];
  const clses = ['rk-gold', 'rk-silver', 'rk-bronze'];
  const rows  = lb.slice(0, 10).map(function (e, i) {
    const you  = user && e.name === user.name ? ' <em style="color:#c71585">(you)</em>' : '';
    const rkCl = clses[i] || '';
    return '<tr><td class="' + rkCl + '">' + (icons[i] || (i + 1)) + '</td>' +
           '<td>' + esc(e.name) + you + '</td>' +
           '<td>' + e.score + '/' + QS.length + '</td>' +
           '<td>' + fmtTime(e.time) + '</td></tr>';
  }).join('');
  wrap.innerHTML =
    '<table class="lb-table">' +
    '<thead><tr><th>#</th><th>Name</th><th>Score</th><th>Time</th></tr></thead>' +
    '<tbody>' + rows + '</tbody></table>';
}

/* ── Confetti ───────────────────────────────────────────── */
function confetti(n) {
  n = n || 30;
  const wrap = el('confetti');
  const cols = T.confetti;
  for (let i = 0; i < n; i++) {
    const p = document.createElement('div');
    p.className = 'cfetti';
    p.style.cssText = [
      'left:'       + (Math.random() * 100) + 'vw',
      'background:' + cols[Math.floor(Math.random() * cols.length)],
      'width:'      + (6 + Math.random() * 8) + 'px',
      'height:'     + (8 + Math.random() * 10) + 'px',
      'border-radius:' + (Math.random() > .5 ? '50%' : '2px'),
      '--fd:'  + (1.5 + Math.random() * 2) + 's',
      '--dl:'  + (Math.random() * .8) + 's',
    ].join(';');
    wrap.appendChild(p);
    setTimeout(function () { p.remove(); }, 4000);
  }
}

/* ── Modal helpers ──────────────────────────────────────── */
function showModal(id) { document.getElementById(id).classList.remove('hidden'); }
function hideModal(id) { document.getElementById(id).classList.add('hidden'); }

/* ── Bind static events ─────────────────────────────────── */
function bindEvents() {
  /* Username submit */
  el('user-submit').addEventListener('click', function () {
    const v = el('user-input').value.trim();
    if (v) loginUser(v);
    else el('user-input').focus();
  });
  el('user-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') el('user-submit').click();
  });

  /* Leaderboard */
  el('btn-lb').addEventListener('click', function () { renderLeaderboard(); showModal('modal-lb'); });
  el('lb-close').addEventListener('click', function () { hideModal('modal-lb'); });

  /* Switch player */
  el('btn-switch').addEventListener('click', function () {
    if (activeDrawer) closeDrawerEl(activeDrawer);
    stopTimer();
    user = null;
    el('user-input').value = '';
    el('score-display').textContent = '0';
    el('timer-display').textContent = '00:00';
    el('user-display').textContent = '';
    document.querySelectorAll('.gcell.solved').forEach(function (c) { c.classList.remove('solved'); });
    lsSet(KEY_LAST, '');
    showModal('modal-user');
  });

  /* Answer key */
  el('btn-key').addEventListener('click', function () { window.open('answer_key.html', '_blank'); });

  /* Hint confirm */
  el('hint-yes').addEventListener('click', function () {
    if (pendingHintId === null || !user) { hideModal('modal-hint'); return; }
    const qid = pendingHintId;
    const q   = QS.find(function (x) { return x.id === qid; });
    user.hintUsed[qid] = true;
    if (user.score > 0) user.score = Math.max(0, user.score - 1);
    saveUser(); refreshScore();
    const box = document.getElementById('hint-box-' + qid);
    if (box && q) { box.textContent = q.hint; box.classList.add('visible'); }
    pendingHintId = null;
    hideModal('modal-hint');
  });
  el('hint-no').addEventListener('click', function () { pendingHintId = null; hideModal('modal-hint'); });

  /* Done modal */
  el('done-close').addEventListener('click', function () { hideModal('modal-done'); confetti(50); });
}

/* ── Tiny helpers ───────────────────────────────────────── */
function el(id)       { return document.getElementById(id); }
function pad2(n)      { return String(n).padStart(2, '0'); }
function ls(k)        { try { return localStorage.getItem(k); } catch(e) { return null; } }
function lsSet(k, v)  { try { localStorage.setItem(k, v); } catch(e) {} }
function esc(s)       {
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
