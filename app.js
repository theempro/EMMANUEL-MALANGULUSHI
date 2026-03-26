/* ============================================
   CyberShield — app.js
   Personal Cybersecurity Dashboard
   ============================================ */

/* ─────────────────────────────────────────────
   1. LIVE CLOCK
   ───────────────────────────────────────────── */
function tick() {
  const t = new Date();
  document.getElementById('live-time').textContent = t.toTimeString().slice(0, 8);
}
tick();
setInterval(tick, 1000);


/* ─────────────────────────────────────────────
   2. SECURITY SCORE SYSTEM
   Weights: Password 30% | Breaches 40% | Activity 30%
   ───────────────────────────────────────────── */
let scores = {
  pw:       0,   // updated by password analyzer
  breach:   50,  // updated by breach checker (50 = unchecked/neutral)
  activity: 70   // updated by activity monitor
};

function updateScore() {
  const total = Math.round(scores.pw * 0.3 + scores.breach * 0.4 + scores.activity * 0.3);

  // Animate the SVG ring
  const arc    = document.getElementById('scoreArc');
  const circ   = 351.86; // 2 * Math.PI * 56
  const offset = circ - (total / 100) * circ;
  arc.style.strokeDashoffset = offset;

  // Animate the number counter
  const numEl = document.getElementById('scoreNum');
  animCount(numEl, parseInt(numEl.textContent) || 0, total);

  // Pick colour + label based on score
  let color, label, badgeBg;
  if (total >= 75) {
    color   = 'var(--green)';
    label   = 'SECURE';
    badgeBg = 'var(--green-dim)';
  } else if (total >= 50) {
    color   = 'var(--yellow)';
    label   = 'MODERATE RISK';
    badgeBg = 'var(--yellow-dim)';
  } else {
    color   = 'var(--red)';
    label   = 'HIGH RISK';
    badgeBg = 'var(--red-dim)';
  }

  arc.style.stroke     = color;
  numEl.style.color    = color;

  const badge          = document.getElementById('statusBadge');
  badge.textContent    = label;
  badge.style.background = badgeBg;
  badge.style.color    = color;

  // Update the three breakdown bars
  const brColor = scores.breach >= 75 ? 'var(--green)'
                : scores.breach >= 50 ? 'var(--yellow)'
                : 'var(--red)';
  const acColor = scores.activity >= 75 ? 'var(--green)' : 'var(--yellow)';

  setBar('barPw', 'pctPw', scores.pw,       color);
  setBar('barBr', 'pctBr', scores.breach,   brColor);
  setBar('barAc', 'pctAc', scores.activity, acColor);

  updateRecs(total);
}

/* Animate a bar + its percentage label */
function setBar(barId, pctId, val, color) {
  const bar = document.getElementById(barId);
  bar.style.width      = val + '%';
  bar.style.background = color;
  document.getElementById(pctId).textContent = val + '%';
}

/* Count-up animation for the score number */
function animCount(el, from, to) {
  const dur   = 800;
  const start = performance.now();

  function step(now) {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.round(from + (to - from) * p);
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}


/* ─────────────────────────────────────────────
   3. PASSWORD ANALYZER
   Uses zxcvbn library (loaded via CDN in HTML)
   ───────────────────────────────────────────── */
const STRENGTH_COLORS = ['#ff4d4d', '#ff9800', '#ffd740', '#00e676'];
const STRENGTH_LABELS = ['VERY WEAK', 'WEAK', 'STRONG', 'VERY STRONG'];
// Score → approximate security score contribution
const SCORE_MAP = [10, 30, 65, 90];

document.getElementById('pwInput').addEventListener('input', analyzePw);

function analyzePw() {
  const pw = document.getElementById('pwInput').value;

  if (!pw) { resetPwUI(); return; }

  // Use zxcvbn if loaded, else fall back to our own heuristic
  const result = (typeof zxcvbn !== 'undefined') ? zxcvbn(pw) : null;
  const rawScore = result ? result.score : guestScore(pw);
  const s = Math.min(rawScore, 3); // clamp 0-3

  // Colour the four strength segments
  for (let i = 0; i < 4; i++) {
    docu/* ============================================
   CyberShield — app.js
   Personal Cybersecurity Dashboard
   ============================================ */

/* ─────────────────────────────────────────────
   1. LIVE CLOCK
   ───────────────────────────────────────────── */
function tick() {
  const t = new Date();
  document.getElementById('live-time').textContent = t.toTimeString().slice(0, 8);
}
tick();
setInterval(tick, 1000);


/* ─────────────────────────────────────────────
   2. SECURITY SCORE SYSTEM
   Weights: Password 30% | Breaches 40% | Activity 30%
   ───────────────────────────────────────────── */
let scores = {
  pw:       0,   // updated by password analyzer
  breach:   50,  // updated by breach checker (50 = unchecked/neutral)
  activity: 70   // updated by activity monitor
};

function updateScore() {
  const total = Math.round(scores.pw * 0.3 + scores.breach * 0.4 + scores.activity * 0.3);

  // Animate the SVG ring
  const arc    = document.getElementById('scoreArc');
  const circ   = 351.86; // 2 * Math.PI * 56
  const offset = circ - (total / 100) * circ;
  arc.style.strokeDashoffset = offset;

  // Animate the number counter
  const numEl = document.getElementById('scoreNum');
  animCount(numEl, parseInt(numEl.textContent) || 0, total);

  // Pick colour + label based on score
  let color, label, badgeBg;
  if (total >= 75) {
    color   = 'var(--green)';
    label   = 'SECURE';
    badgeBg = 'var(--green-dim)';
  } else if (total >= 50) {
    color   = 'var(--yellow)';
    label   = 'MODERATE RISK';
    badgeBg = 'var(--yellow-dim)';
  } else {
    color   = 'var(--red)';
    label   = 'HIGH RISK';
    badgeBg = 'var(--red-dim)';
  }

  arc.style.stroke     = color;
  numEl.style.color    = color;

  const badge          = document.getElementById('statusBadge');
  badge.textContent    = label;
  badge.style.background = badgeBg;
  badge.style.color    = color;

  // Update the three breakdown bars
  const brColor = scores.breach >= 75 ? 'var(--green)'
                : scores.breach >= 50 ? 'var(--yellow)'
                : 'var(--red)';
  const acColor = scores.activity >= 75 ? 'var(--green)' : 'var(--yellow)';

  setBar('barPw', 'pctPw', scores.pw,       color);
  setBar('barBr', 'pctBr', scores.breach,   brColor);
  setBar('barAc', 'pctAc', scores.activity, acColor);

  updateRecs(total);
}

/* Animate a bar + its percentage label */
function setBar(barId, pctId, val, color) {
  const bar = document.getElementById(barId);
  bar.style.width      = val + '%';
  bar.style.background = color;
  document.getElementById(pctId).textContent = val + '%';
}

/* Count-up animation for the score number */
function animCount(el, from, to) {
  const dur   = 800;
  const start = performance.now();

  function step(now) {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.round(from + (to - from) * p);
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}


/* ─────────────────────────────────────────────
   3. PASSWORD ANALYZER
   Uses zxcvbn library (loaded via CDN in HTML)
   ───────────────────────────────────────────── */
const STRENGTH_COLORS = ['#ff4d4d', '#ff9800', '#ffd740', '#00e676'];
const STRENGTH_LABELS = ['VERY WEAK', 'WEAK', 'STRONG', 'VERY STRONG'];
// Score → approximate security score contribution
const SCORE_MAP = [10, 30, 65, 90];

document.getElementById('pwInput').addEventListener('input', analyzePw);

function analyzePw() {
  const pw = document.getElementById('pwInput').value;

  if (!pw) { resetPwUI(); return; }

  // Use zxcvbn if loaded, else fall back to our own heuristic
  const result = (typeof zxcvbn !== 'undefined') ? zxcvbn(pw) : null;
  const rawScore = result ? result.score : guestScore(pw);
  const s = Math.min(rawScore, 3); // clamp 0-3

  // Colour the four strength segments
  for (let i = 0; i < 4; i++) {
    document.getElementById('sb' + (i + 1)).style.background =
      (i <= s) ? STRENGTH_COLORS[s] : 'rgba(255,255,255,0.06)';
  }

  // Label
  const lbl = document.getElementById('strengthLabel');
  lbl.style.color    = STRENGTH_COLORS[s];
  lbl.textContent    = STRENGTH_LABELS[s];

  // Requirement checks
  setCheck('chkLen',   pw.length >= 12);
  setCheck('chkUpper', /[A-Z]/.test(pw));
  setCheck('chkLower', /[a-z]/.test(pw));
  setCheck('chkNum',   /[0-9]/.test(pw));
  setCheck('chkSym',   /[^A-Za-z0-9]/.test(pw));

  // Crack time
  const crack = result
    ? result.crack_times_display.offline_slow_hashing_1e4_per_second
    : estimateCrack(pw);
  document.getElementById('crackTime').innerHTML = 'Crack time: <strong>' + crack + '</strong>';

  // Update global score
  scores.pw = SCORE_MAP[s];
  updateScore();
}

/* Fallback strength heuristic when zxcvbn is unavailable */
function guestScore(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12 && /[A-Z]/.test(pw) && /[0-9]/.test(pw)) s++;
  if (pw.length >= 16 && /[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

/* Very rough crack time estimate */
function estimateCrack(pw) {
  const e = Math.pow(10, pw.length / 2);
  if (e > 1e12) return 'centuries';
  if (e > 1e9)  return 'years';
  if (e > 1e6)  return 'days';
  return 'minutes';
}

/* Reset all password UI elements to default state */
function resetPwUI() {
  for (let i = 1; i <= 4; i++)
    document.getElementById('sb' + i).style.background = 'rgba(255,255,255,0.06)';

  const lbl = document.getElementById('strengthLabel');
  lbl.textContent = 'Enter a password to check';
  lbl.style.color = 'var(--muted)';

  ['chkLen', 'chkUpper', 'chkLower', 'chkNum', 'chkSym']
    .forEach(id => setCheck(id, false));

  document.getElementById('crackTime').innerHTML = 'Crack time: <strong>—</strong>';
  scores.pw = 0;
  updateScore();
}

/* Toggle a single check item between pass / fail */
function setCheck(id, pass) {
  document.getElementById(id).classList.toggle('pass', pass);
}

/* Show / hide password */
function togglePw() {
  const input = document.getElementById('pwInput');
  input.type  = input.type === 'password' ? 'text' : 'password';
}


/* ─────────────────────────────────────────────
  4. DATA BREACH CHECKER
  Uses a mock database. In production replace
  with a real call to the HaveIBeenPwned API.
   ───────────────────────────────────────────── */

// Mock breach database – add any emails you want to demo
const MOCK_BREACHES = {
  'test@test.com': [
    { name: 'LinkedIn', date: '2021-06-22', type: 'Emails, Passwords, Usernames' },
    { name: 'Adobe',    date: '2013-10-04', type: 'Emails, Password hints, Usernames' },
    { name: 'Twitter',  date: '2022-07-22', type: 'Emails, Phone numbers' }
  ],
  'demo@demo.com': [
    { name: 'Dropbox',  date: '2012-07-01', type: 'Emails, Passwords' }
  ],
  'safe@safe.com': []
};

function checkBreach() {
  const email = document.getElementById('emailInput').value.trim().toLowerCase();
  const res   = document.getElementById('breachResult');

  if (!email || !email.includes('@')) {
    res.innerHTML = '<div style="font-family:var(--mono);font-size:11px;color:var(--red);">Invalid email address.</div>';
    return;
  }

  res.innerHTML = '<div style="font-family:var(--mono);font-size:11px;color:var(--muted);animation:pulse 1s infinite;">Scanning breach databases...</div>';

  // Simulate network delay
  setTimeout(() => {
    const breaches = MOCK_BREACHES[email] ?? simulateBreaches(email);
    renderBreachResult(breaches);
  }, 1200);
}

/* Render breach results */
function renderBreachResult(breaches) {
  const res = document.getElementById('breachResult');

  if (breaches.length === 0) {
    res.innerHTML = `
      <div class="breach-item safe">
        <div>
          <div class="breach-name" style="color:var(--green)">No breaches found</div>
          <div class="breach-meta">Your email was not found in any known breaches.</div>
        </div>
      </div>`;
    scores.breach = 90;
  } else {
    res.innerHTML = `<div style="font-family:var(--mono);font-size:11px;color:var(--red);margin-bottom:8px;">Found in ${breaches.length} breach${breaches.length > 1 ? 'es' : ''}:</div>`;
    breaches.forEach(b => {
      res.innerHTML += `
        <div class="breach-item danger">
          <div>
            <div class="breach-name" style="color:var(--red)">${b.name}</div>
            <div class="breach-meta">${b.date} &middot; ${b.type}</div>
          </div>
        </div>`;
    });
    scores.breach = Math.max(10, 80 - breaches.length * 20);
  }

  updateScore();
}

/* Deterministic simulation for unknown emails */
function simulateBreaches(email) {
  const hash = email.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  if (hash % 3 === 0) return [];
  const pool = [
    { name: 'MySpace', date: '2016-05-31', type: 'Emails, Passwords, Usernames' },
    { name: 'Canva',   date: '2019-05-24', type: 'Emails, Names, Usernames' }
  ];
  return pool.slice(0, (hash % 2) + 1);
}


/* ─────────────────────────────────────────────
   5. ACTIVITY MONITOR
   ───────────────────────────────────────────── */
const ACT_EVENTS = [
  { type: 'safe',    title: 'Successful login',            sub: 'Lusaka, ZM · Chrome on Windows',  time: 'just now'  },
  { type: 'warning', title: 'Login from new device',       sub: 'Cape Town, ZA · Firefox on Linux', time: '2 min ago' },
  { type: 'danger',  title: 'Failed login attempt (×3)',   sub: 'Moscow, RU · Unknown device',      time: '15 min ago'},
  { type: 'safe',    title: 'Password changed',            sub: 'Lusaka, ZM · Chrome on Android',   time: '1 hr ago'  },
  { type: 'warning', title: 'Login from unusual location', sub: 'Dubai, AE · Safari on iOS',        time: '3 hr ago'  },
  { type: 'danger',  title: 'Brute-force attempt detected',sub: 'Beijing, CN · Automated script',   time: '5 hr ago'  },
  { type: 'safe',    title: 'Email verified',              sub: 'Lusaka, ZM · Chrome on Windows',   time: '1 day ago' },
];

const ACT_COLORS = {
  safe:    'var(--green)',
  warning: 'var(--yellow)',
  danger:  'var(--red)'
};

/* Render the top 4 activity events */
function renderActivity() {
  const list = document.getElementById('activityList');
  list.innerHTML = '';

  ACT_EVENTS.slice(0, 4).forEach(ev => {
    const el = document.createElement('div');
    el.className = 'activity-item ' + ev.type;
    el.innerHTML = `
      <div class="act-dot" style="background:${ACT_COLORS[ev.type]}"></div>
      <div class="act-info">
        <div class="act-main">${ev.title}</div>
        <div class="act-sub">${ev.sub}</div>
      </div>
      <div class="act-time">${ev.time}</div>`;
    list.appendChild(el);
  });
}

/* Inject a random simulated event */
function addActivity() {
  const newEvents = [
    { type: 'danger',  title: 'Suspicious login from Nigeria',  sub: 'Lagos, NG · Unknown browser',    time: 'just now' },
    { type: 'warning', title: 'Login from new IP',              sub: 'Nairobi, KE · Chrome on Android', time: 'just now' },
    { type: 'safe',    title: 'Profile updated',                sub: 'Lusaka, ZM · Chrome on Windows',  time: 'just now' },
  ];

  const ev = newEvents[Math.floor(Math.random() * newEvents.length)];
  ACT_EVENTS.unshift(ev);

  // Adjust activity score based on event type
  if (ev.type === 'danger')       scores.activity = Math.max(10,  scores.activity - 15);
  else if (ev.type === 'warning') scores.activity = Math.max(10,  scores.activity - 5);
  else                            scores.activity = Math.min(100, scores.activity + 5);

  updateScore();
  renderActivity();
}

// Initial render
renderActivity();


/* ─────────────────────────────────────────────
 6. PASSWORD GENERATOR
   ───────────────────────────────────────────── */
const CHAR_SETS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  nums:  '0123456789',
  syms:  '!@#$%^&*()-_=+[]{}|;:,.<>?'
};

// Which character sets are active
let genOpts = { upper: true, lower: true, nums: true, syms: true };

function genPassword() {
  const len = parseInt(document.getElementById('lenRange').value);

  // Build character pool
  let chars = '';
  Object.keys(CHAR_SETS).forEach(k => { if (genOpts[k]) chars += CHAR_SETS[k]; });
  if (!chars) chars = CHAR_SETS.lower; // fallback

  let pw = '';
  for (let i = 0; i < len; i++) {
    pw += chars[Math.floor(Math.random() * chars.length)];
  }

  document.getElementById('genPw').textContent = pw;
  document.getElementById('copyBtn').textContent = 'COPY';
}

function copyPw() {
  const pw = document.getElementById('genPw').textContent;
  if (pw === '—') return;
  navigator.clipboard.writeText(pw).catch(() => {});
  document.getElementById('copyBtn').textContent = 'COPIED!';
  setTimeout(() => document.getElementById('copyBtn').textContent = 'COPY', 2000);
}

function updateLen(v) {
  document.getElementById('lenVal').textContent = v;
  genPassword();
}

function toggleOpt(btn) {
  const key = btn.dataset.key;
  genOpts[key] = !genOpts[key];
  btn.classList.toggle('on', genOpts[key]);
  genPassword();
}

// Generate on load
genPassword();


/* ─────────────────────────────────────────────
7. 2FA SIMULATION
Rotates a 6-digit code every 30 seconds,
exactly like a TOTP authenticator app.
   ───────────────────────────────────────────── */
let tfaCode      = '';
let tfaSecsLeft  = 30;

function newTfaCode() {
  tfaCode = String(Math.floor(100000 + Math.random() * 900000));
  // Display with spaces for readability
  document.getElementById('tfaCode').textContent = tfaCode.split('').join(' ');
  tfaSecsLeft = 30;

  // Clear input boxes
  document.querySelectorAll('.tfa-digit').forEach(d => d.value = '');

  // Reset message
  const msg      = document.getElementById('tfaMsg');
  msg.textContent = 'Type the 6-digit code above';
  msg.style.color = 'var(--muted)';
}

function tfaTick() {
  tfaSecsLeft--;
  if (tfaSecsLeft <= 0) { newTfaCode(); return; }

  document.getElementById('tfaSec').textContent = tfaSecsLeft + 's';
  const pct = (tfaSecsLeft / 30) * 100;
  const bar = document.getElementById('tfaBar');
  bar.style.width      = pct + '%';
  bar.style.background = tfaSecsLeft > 10 ? 'var(--green)' : 'var(--red)';
}

setInterval(tfaTick, 1000);
newTfaCode();

/* Handle digit input + auto-focus next field */
function tfaInput(el, idx) {
  // Move focus forward
  if (el.value && idx < 5) el.nextElementSibling?.focus();

  // Check if all 6 digits entered
  const digits  = document.querySelectorAll('.tfa-digit');
  const entered = Array.from(digits).map(d => d.value).join('');

  if (entered.length === 6) {
    const msg = document.getElementById('tfaMsg');
    if (entered === tfaCode) {
      msg.textContent = '✓ Code verified! Authentication successful.';
      msg.style.color = 'var(--green)';
    } else {
      msg.textContent = '✕ Invalid code. Try again.';
      msg.style.color = 'var(--red)';
    }
  }
}


/* ─────────────────────────────────────────────
   8. IP / NETWORK TRACKER
   Uses the free ipapi.co API.
   ───────────────────────────────────────────── */
function fetchIP() {
  // Show loading state
  document.getElementById('ipInfo').innerHTML = `
    <div class="ip-item full-col">
      <div class="ip-label">Status</div>
      <div class="ip-val">Fetching...</div>
    </div>`;

  fetch('https://ipapi.co/json/')
    .then(r => r.json())
    .then(d => {
      document.getElementById('ipInfo').innerHTML = `
        <div class="ip-item">
          <div class="ip-label">IP Address</div>
          <div class="ip-val">${d.ip || '—'}</div>
        </div>
        <div class="ip-item">
          <div class="ip-label">Country</div>
          <div class="ip-val">${d.country_name || '—'}</div>
        </div>
        <div class="ip-item">
          <div class="ip-label">City</div>
          <div class="ip-val">${d.city || '—'}</div>
        </div>
        <div class="ip-item">
          <div class="ip-label">ISP</div>
          <div class="ip-val" style="font-size:10px;">${d.org || '—'}</div>
        </div>
        <div class="ip-item full-col">
          <div class="ip-label">Timezone</div>
          <div class="ip-val">${d.timezone || '—'}</div>
        </div>`;
    })
    .catch(() => {
      document.getElementById('ipInfo').innerHTML = `
        <div class="ip-item full-col">
          <div class="ip-label">Status</div>
          <div class="ip-val" style="color:var(--muted)">Could not fetch (network restricted)</div>
        </div>`;
    });
}


/* ─────────────────────────────────────────────
   9. SMART RECOMMENDATIONS
   Dynamically generated based on current scores.
   ───────────────────────────────────────────── */
function updateRecs(score) {
  const recs = [
    {
      level:  'high',
      text:   'Use a unique, strong password (12+ chars, mixed types) for every account.',
      active: scores.pw < 50
    },
    {
      level:  'high',
      text:   'Immediately change passwords for any breached accounts found above.',
      active: scores.breach < 60
    },
    {
      level:  'med',
      text:   'Enable Two-Factor Authentication (2FA) on all critical accounts.',
      active: true
    },
    {
      level:  'med',
      text:   'Review login activity regularly — unexpected logins may indicate compromise.',
      active: scores.activity < 80
    },
    {
      level:  'low',
      text:   'Use a reputable password manager instead of reusing passwords.',
      active: true
    },
    {
      level:  'low',
      text:   'Keep your browser and OS updated to patch security vulnerabilities.',
      active: score < 90
    },
  ].filter(r => r.active);

  const badgeLabel = { high: 'URGENT', med: 'IMPORTANT', low: 'TIP' };

  document.getElementById('recList').innerHTML = recs.map(r => `
    <div class="rec-item ${r.level}">
      <span class="rec-badge ${r.level}">${badgeLabel[r.level]}</span>
      <span class="rec-text">${r.text}</span>
    </div>`).join('');
}

// Initial render
updateScore();
updateRecs(50);
ment.getElementById('sb' + (i + 1)).style.background =
      (i <= s) ? STRENGTH_COLORS[s] : 'rgba(255,255,255,0.06)';
  }

  // Label
  const lbl = document.getElementById('strengthLabel');
  lbl.style.color    = STRENGTH_COLORS[s];
  lbl.textContent    = STRENGTH_LABELS[s];

  // Requirement checks
  setCheck('chkLen',   pw.length >= 12);
  setCheck('chkUpper', /[A-Z]/.test(pw));
  setCheck('chkLower', /[a-z]/.test(pw));
  setCheck('chkNum',   /[0-9]/.test(pw));
  setCheck('chkSym',   /[^A-Za-z0-9]/.test(pw));

  // Crack time
  const crack = result
    ? result.crack_times_display.offline_slow_hashing_1e4_per_second
    : estimateCrack(pw);
  document.getElementById('crackTime').innerHTML = 'Crack time: <strong>' + crack + '</strong>';

  // Update global score
  scores.pw = SCORE_MAP[s];
  updateScore();
}

/* Fallback strength heuristic when zxcvbn is unavailable */
function guestScore(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12 && /[A-Z]/.test(pw) && /[0-9]/.test(pw)) s++;
  if (pw.length >= 16 && /[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

/* Very rough crack time estimate */
function estimateCrack(pw) {
  const e = Math.pow(10, pw.length / 2);
  if (e > 1e12) return 'centuries';
  if (e > 1e9)  return 'years';
  if (e > 1e6)  return 'days';
  return 'minutes';
}

/* Reset all password UI elements to default state */
function resetPwUI() {
  for (let i = 1; i <= 4; i++)
    document.getElementById('sb' + i).style.background = 'rgba(255,255,255,0.06)';

  const lbl = document.getElementById('strengthLabel');
  lbl.textContent = 'Enter a password to check';
  lbl.style.color = 'var(--muted)';

  ['chkLen', 'chkUpper', 'chkLower', 'chkNum', 'chkSym']
    .forEach(id => setCheck(id, false));

  document.getElementById('crackTime').innerHTML = 'Crack time: <strong>—</strong>';
  scores.pw = 0;
  updateScore();
}

/* Toggle a single check item between pass / fail */
function setCheck(id, pass) {
  document.getElementById(id).classList.toggle('pass', pass);
}

/* Show / hide password */
function togglePw() {
  const input = document.getElementById('pwInput');
  input.type  = input.type === 'password' ? 'text' : 'password';
}


/* ─────────────────────────────────────────────
  4. DATA BREACH CHECKER
  Uses a mock database. In production replace
  with a real call to the HaveIBeenPwned API.
   ───────────────────────────────────────────── */

// Mock breach database – add any emails you want to demo
const MOCK_BREACHES = {
  'test@test.com': [
    { name: 'LinkedIn', date: '2021-06-22', type: 'Emails, Passwords, Usernames' },
    { name: 'Adobe',    date: '2013-10-04', type: 'Emails, Password hints, Usernames' },
    { name: 'Twitter',  date: '2022-07-22', type: 'Emails, Phone numbers' }
  ],
  'demo@demo.com': [
    { name: 'Dropbox',  date: '2012-07-01', type: 'Emails, Passwords' }
  ],
  'safe@safe.com': []
};

function checkBreach() {
  const email = document.getElementById('emailInput').value.trim().toLowerCase();
  const res   = document.getElementById('breachResult');

  if (!email || !email.includes('@')) {
    res.innerHTML = '<div style="font-family:var(--mono);font-size:11px;color:var(--red);">Invalid email address.</div>';
    return;
  }

  res.innerHTML = '<div style="font-family:var(--mono);font-size:11px;color:var(--muted);animation:pulse 1s infinite;">Scanning breach databases...</div>';

  // Simulate network delay
  setTimeout(() => {
    const breaches = MOCK_BREACHES[email] ?? simulateBreaches(email);
    renderBreachResult(breaches);
  }, 1200);
}

/* Render breach results */
function renderBreachResult(breaches) {
  const res = document.getElementById('breachResult');

  if (breaches.length === 0) {
    res.innerHTML = `
      <div class="breach-item safe">
        <div>
          <div class="breach-name" style="color:var(--green)">No breaches found</div>
          <div class="breach-meta">Your email was not found in any known breaches.</div>
        </div>
      </div>`;
    scores.breach = 90;
  } else {
    res.innerHTML = `<div style="font-family:var(--mono);font-size:11px;color:var(--red);margin-bottom:8px;">Found in ${breaches.length} breach${breaches.length > 1 ? 'es' : ''}:</div>`;
    breaches.forEach(b => {
      res.innerHTML += `
        <div class="breach-item danger">
          <div>
            <div class="breach-name" style="color:var(--red)">${b.name}</div>
            <div class="breach-meta">${b.date} &middot; ${b.type}</div>
          </div>
        </div>`;
    });
    scores.breach = Math.max(10, 80 - breaches.length * 20);
  }

  updateScore();
}

/* Deterministic simulation for unknown emails */
function simulateBreaches(email) {
  const hash = email.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  if (hash % 3 === 0) return [];
  const pool = [
    { name: 'MySpace', date: '2016-05-31', type: 'Emails, Passwords, Usernames' },
    { name: 'Canva',   date: '2019-05-24', type: 'Emails, Names, Usernames' }
  ];
  return pool.slice(0, (hash % 2) + 1);
}


/* ─────────────────────────────────────────────
   5. ACTIVITY MONITOR
   ───────────────────────────────────────────── */
const ACT_EVENTS = [
  { type: 'safe',    title: 'Successful login',            sub: 'Lusaka, ZM · Chrome on Windows',  time: 'just now'  },
  { type: 'warning', title: 'Login from new device',       sub: 'Cape Town, ZA · Firefox on Linux', time: '2 min ago' },
  { type: 'danger',  title: 'Failed login attempt (×3)',   sub: 'Moscow, RU · Unknown device',      time: '15 min ago'},
  { type: 'safe',    title: 'Password changed',            sub: 'Lusaka, ZM · Chrome on Android',   time: '1 hr ago'  },
  { type: 'warning', title: 'Login from unusual location', sub: 'Dubai, AE · Safari on iOS',        time: '3 hr ago'  },
  { type: 'danger',  title: 'Brute-force attempt detected',sub: 'Beijing, CN · Automated script',   time: '5 hr ago'  },
  { type: 'safe',    title: 'Email verified',              sub: 'Lusaka, ZM · Chrome on Windows',   time: '1 day ago' },
];

const ACT_COLORS = {
  safe:    'var(--green)',
  warning: 'var(--yellow)',
  danger:  'var(--red)'
};

/* Render the top 4 activity events */
function renderActivity() {
  const list = document.getElementById('activityList');
  list.innerHTML = '';

  ACT_EVENTS.slice(0, 4).forEach(ev => {
    const el = document.createElement('div');
    el.className = 'activity-item ' + ev.type;
    el.innerHTML = `
      <div class="act-dot" style="background:${ACT_COLORS[ev.type]}"></div>
      <div class="act-info">
        <div class="act-main">${ev.title}</div>
        <div class="act-sub">${ev.sub}</div>
      </div>
      <div class="act-time">${ev.time}</div>`;
    list.appendChild(el);
  });
}

/* Inject a random simulated event */
function addActivity() {
  const newEvents = [
    { type: 'danger',  title: 'Suspicious login from Nigeria',  sub: 'Lagos, NG · Unknown browser',    time: 'just now' },
    { type: 'warning', title: 'Login from new IP',              sub: 'Nairobi, KE · Chrome on Android', time: 'just now' },
    { type: 'safe',    title: 'Profile updated',                sub: 'Lusaka, ZM · Chrome on Windows',  time: 'just now' },
  ];

  const ev = newEvents[Math.floor(Math.random() * newEvents.length)];
  ACT_EVENTS.unshift(ev);

  // Adjust activity score based on event type
  if (ev.type === 'danger')       scores.activity = Math.max(10,  scores.activity - 15);
  else if (ev.type === 'warning') scores.activity = Math.max(10,  scores.activity - 5);
  else                            scores.activity = Math.min(100, scores.activity + 5);

  updateScore();
  renderActivity();
}

// Initial render
renderActivity();


/* ─────────────────────────────────────────────
 6. PASSWORD GENERATOR
   ───────────────────────────────────────────── */
const CHAR_SETS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  nums:  '0123456789',
  syms:  '!@#$%^&*()-_=+[]{}|;:,.<>?'
};

// Which character sets are active
let genOpts = { upper: true, lower: true, nums: true, syms: true };

function genPassword() {
  const len = parseInt(document.getElementById('lenRange').value);

  // Build character pool
  let chars = '';
  Object.keys(CHAR_SETS).forEach(k => { if (genOpts[k]) chars += CHAR_SETS[k]; });
  if (!chars) chars = CHAR_SETS.lower; // fallback

  let pw = '';
  for (let i = 0; i < len; i++) {
    pw += chars[Math.floor(Math.random() * chars.length)];
  }

  document.getElementById('genPw').textContent = pw;
  document.getElementById('copyBtn').textContent = 'COPY';
}

function copyPw() {
  const pw = document.getElementById('genPw').textContent;
  if (pw === '—') return;
  navigator.clipboard.writeText(pw).catch(() => {});
  document.getElementById('copyBtn').textContent = 'COPIED!';
  setTimeout(() => document.getElementById('copyBtn').textContent = 'COPY', 2000);
}

function updateLen(v) {
  document.getElementById('lenVal').textContent = v;
  genPassword();
}

function toggleOpt(btn) {
  const key = btn.dataset.key;
  genOpts[key] = !genOpts[key];
  btn.classList.toggle('on', genOpts[key]);
  genPassword();
}

// Generate on load
genPassword();


/* ─────────────────────────────────────────────
7. 2FA SIMULATION
Rotates a 6-digit code every 30 seconds,
exactly like a TOTP authenticator app.
   ───────────────────────────────────────────── */
let tfaCode      = '';
let tfaSecsLeft  = 30;

function newTfaCode() {
  tfaCode = String(Math.floor(100000 + Math.random() * 900000));
  // Display with spaces for readability
  document.getElementById('tfaCode').textContent = tfaCode.split('').join(' ');
  tfaSecsLeft = 30;

  // Clear input boxes
  document.querySelectorAll('.tfa-digit').forEach(d => d.value = '');

  // Reset message
  const msg      = document.getElementById('tfaMsg');
  msg.textContent = 'Type the 6-digit code above';
  msg.style.color = 'var(--muted)';
}

function tfaTick() {
  tfaSecsLeft--;
  if (tfaSecsLeft <= 0) { newTfaCode(); return; }

  document.getElementById('tfaSec').textContent = tfaSecsLeft + 's';
  const pct = (tfaSecsLeft / 30) * 100;
  const bar = document.getElementById('tfaBar');
  bar.style.width      = pct + '%';
  bar.style.background = tfaSecsLeft > 10 ? 'var(--green)' : 'var(--red)';
}

setInterval(tfaTick, 1000);
newTfaCode();

/* Handle digit input + auto-focus next field */
function tfaInput(el, idx) {
  // Move focus forward
  if (el.value && idx < 5) el.nextElementSibling?.focus();

  // Check if all 6 digits entered
  const digits  = document.querySelectorAll('.tfa-digit');
  const entered = Array.from(digits).map(d => d.value).join('');

  if (entered.length === 6) {
    const msg = document.getElementById('tfaMsg');
    if (entered === tfaCode) {
      msg.textContent = '✓ Code verified! Authentication successful.';
      msg.style.color = 'var(--green)';
    } else {
      msg.textContent = '✕ Invalid code. Try again.';
      msg.style.color = 'var(--red)';
    }
  }
}


/* ─────────────────────────────────────────────
   8. IP / NETWORK TRACKER
   Uses the free ipapi.co API.
   ───────────────────────────────────────────── */
function fetchIP() {
  // Show loading state
  document.getElementById('ipInfo').innerHTML = `
    <div class="ip-item full-col">
      <div class="ip-label">Status</div>
      <div class="ip-val">Fetching...</div>
    </div>`;

  fetch('https://ipapi.co/json/')
    .then(r => r.json())
    .then(d => {
      document.getElementById('ipInfo').innerHTML = `
        <div class="ip-item">
          <div class="ip-label">IP Address</div>
          <div class="ip-val">${d.ip || '—'}</div>
        </div>
        <div class="ip-item">
          <div class="ip-label">Country</div>
          <div class="ip-val">${d.country_name || '—'}</div>
        </div>
        <div class="ip-item">
          <div class="ip-label">City</div>
          <div class="ip-val">${d.city || '—'}</div>
        </div>
        <div class="ip-item">
          <div class="ip-label">ISP</div>
          <div class="ip-val" style="font-size:10px;">${d.org || '—'}</div>
        </div>
        <div class="ip-item full-col">
          <div class="ip-label">Timezone</div>
          <div class="ip-val">${d.timezone || '—'}</div>
        </div>`;
    })
    .catch(() => {
      document.getElementById('ipInfo').innerHTML = `
        <div class="ip-item full-col">
          <div class="ip-label">Status</div>
          <div class="ip-val" style="color:var(--muted)">Could not fetch (network restricted)</div>
        </div>`;
    });
}


/* ─────────────────────────────────────────────
   9. SMART RECOMMENDATIONS
   Dynamically generated based on current scores.
   ───────────────────────────────────────────── */
function updateRecs(score) {
  const recs = [
    {
      level:  'high',
      text:   'Use a unique, strong password (12+ chars, mixed types) for every account.',
      active: scores.pw < 50
    },
    {
      level:  'high',
      text:   'Immediately change passwords for any breached accounts found above.',
      active: scores.breach < 60
    },
    {
      level:  'med',
      text:   'Enable Two-Factor Authentication (2FA) on all critical accounts.',
      active: true
    },
    {
      level:  'med',
      text:   'Review login activity regularly — unexpected logins may indicate compromise.',
      active: scores.activity < 80
    },
    {
      level:  'low',
      text:   'Use a reputable password manager instead of reusing passwords.',
      active: true
    },
    {
      level:  'low',
      text:   'Keep your browser and OS updated to patch security vulnerabilities.',
      active: score < 90
    },
  ].filter(r => r.active);

  const badgeLabel = { high: 'URGENT', med: 'IMPORTANT', low: 'TIP' };

  document.getElementById('recList').innerHTML = recs.map(r => `
    <div class="rec-item ${r.level}">
      <span class="rec-badge ${r.level}">${badgeLabel[r.level]}</span>
      <span class="rec-text">${r.text}</span>
    </div>`).join('');
}

// Initial render
updateScore();
updateRecs(50);
