// game/app.js - Full Interactive Sandbox Romance Game for Bailey & Skrappi

// --- STATE MANAGEMENT ---
let state = {
  loveScore: 30,
  unlockedScenes: [],
  isMusicPlaying: false,
  activeAction: null,
  actionTimer: 0
};

// --- SYNTHESIZER / AUDIO SYSTEM (Web Audio API) ---
let audioCtx = null;
let bgmOsc = null;
let bgmGain = null;

function initAudio() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  playBGM();
}

function playBGM() {
  if (!audioCtx) return;
  bgmOsc = audioCtx.createOscillator();
  bgmGain = audioCtx.createGain();
  bgmOsc.type = 'triangle';
  bgmOsc.frequency.setValueAtTime(130.81, audioCtx.currentTime); // C3 chord
  bgmGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
  bgmOsc.connect(bgmGain);
  bgmGain.connect(audioCtx.destination);
  bgmOsc.start();
  
  let notes = [130.81, 146.83, 164.81, 196.00];
  let currentNote = 0;
  setInterval(() => {
    if (state.isMusicPlaying && bgmOsc) {
      currentNote = (currentNote + 1) % notes.length;
      bgmOsc.frequency.setValueAtTime(notes[currentNote], audioCtx.currentTime);
    }
  }, 4000);
}

function playChime(freq = 440) {
  if (!audioCtx || !state.isMusicPlaying) return;
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.8);
}

function playHeartbeatSound() {
  if (!audioCtx || !state.isMusicPlaying) return;
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(85, audioCtx.currentTime);
  gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.3);
}

// --- CG ROMANTIC GRAPHICS FOR THE GALLERY ---
const CG_SCENES = {
  cafe_hug: `
    <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cafe-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2d1747" />
          <stop offset="100%" stop-color="#140624" />
        </linearGradient>
        <linearGradient id="hair-gold-cg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffd700" />
          <stop offset="100%" stop-color="#ff8c00" />
        </linearGradient>
        <linearGradient id="hair-silver-cg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="100%" stop-color="#b0b0b0" />
        </linearGradient>
        <linearGradient id="skin-warm-cg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffdbac" />
          <stop offset="100%" stop-color="#f1c27d" />
        </linearGradient>
        <linearGradient id="skin-cool-cg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#fff0f5" />
          <stop offset="100%" stop-color="#ffd1dc" />
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#cafe-bg)" />
      <circle cx="120" cy="100" r="40" fill="#ffd700" opacity="0.15" filter="blur(15px)" />
      <circle cx="480" cy="120" r="50" fill="#ff3377" opacity="0.1" filter="blur(20px)" />
      <g id="cg-bailey">
        <path d="M 180 400 C 180 260, 280 230, 330 250 L 350 400 Z" fill="#8e2de2" stroke="#ff3377" stroke-width="2"/>
        <path d="M 230 310 C 260 280, 310 280, 330 310" stroke="#ffdbac" stroke-width="8" stroke-linecap="round" fill="none" />
        <ellipse cx="280" cy="210" rx="38" ry="48" fill="url(#skin-warm-cg)" transform="rotate(-10 280 210)" />
        <path d="M 240 190 C 235 150, 310 140, 325 185 C 325 165, 300 155, 280 160 C 260 160, 245 175, 240 190 Z" fill="url(#hair-gold-cg)" />
        <path d="M 252 205 Q 260 212 268 205" stroke="#5c4033" stroke-width="3" stroke-linecap="round" fill="none" />
        <path d="M 268 232 Q 278 240 285 230" stroke="#e25c80" stroke-width="3" stroke-linecap="round" fill="none" />
        <ellipse cx="255" cy="218" rx="8" ry="4" fill="#ff6699" opacity="0.5" />
      </g>
      <g id="cg-skrappi">
        <path d="M 270 400 C 270 250, 390 260, 420 400 Z" fill="#ff8da1" stroke="#8e2de2" stroke-width="2"/>
        <ellipse cx="340" cy="215" rx="36" ry="46" fill="url(#skin-cool-cg)" transform="rotate(5 340 215)" />
        <path d="M 305 195 C 300 150, 370 140, 380 190 Q 315 170 305 195 Z" fill="url(#hair-silver-cg)" />
        <path d="M 345 208 Q 353 214 361 208" stroke="#4682b4" stroke-width="3" stroke-linecap="round" fill="none" />
        <circle cx="348" cy="208" r="12" fill="none" stroke="#c0c0c0" stroke-width="2" />
        <path d="M 332 230 Q 338 236 345 228" stroke="#901a1e" stroke-width="3" stroke-linecap="round" fill="none" />
        <ellipse cx="358" cy="218" rx="8" ry="4" fill="#ff4d6d" opacity="0.6" />
      </g>
      <path d="M 310 140 C 303 125, 288 125, 288 140 C 288 155, 310 170, 310 170 C 310 170, 332 155, 332 140 C 332 125, 317 125, 310 140 Z" fill="#ff3377" filter="drop-shadow(0 0 10px #ff3377)" />
    </svg>
  `,
  starlit_kiss: `
    <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="night-bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#050515" />
          <stop offset="100%" stop-color="#1b003a" />
        </linearGradient>
        <linearGradient id="hair-gold-cg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffd700" />
          <stop offset="100%" stop-color="#ff8c00" />
        </linearGradient>
        <linearGradient id="hair-silver-cg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="100%" stop-color="#b0b0b0" />
        </linearGradient>
        <linearGradient id="skin-warm-cg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffdbac" />
          <stop offset="100%" stop-color="#f1c27d" />
        </linearGradient>
        <linearGradient id="skin-cool-cg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#fff0f5" />
          <stop offset="100%" stop-color="#ffd1dc" />
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#night-bg)" />
      <circle cx="200" cy="40" r="2" fill="#ffd700" opacity="0.9" />
      <circle cx="480" cy="50" r="30" fill="#ffffd0" filter="drop-shadow(0 0 15px #ffd700)" />
      <g id="kiss-bailey">
        <path d="M 0 400 L 150 400 C 150 300, 200 240, 250 240 L 230 400 Z" fill="#8e2de2" />
        <path d="M 190 320 C 210 270, 240 250, 260 250 L 260 320 Z" fill="url(#skin-warm-cg)" />
        <ellipse cx="220" cy="200" rx="45" ry="50" fill="url(#skin-warm-cg)" transform="rotate(15 220 200)" />
        <path d="M 175 180 C 170 120, 240 110, 255 170 Q 230 140 210 145 Z" fill="url(#hair-gold-cg)" />
        <path d="M 218 190 Q 228 196 238 190" stroke="#5c4033" stroke-width="3" stroke-linecap="round" fill="none" />
        <ellipse cx="235" cy="205" rx="8" ry="4" fill="#ff6699" opacity="0.5" />
        <path d="M 285 210 C 285 195, 305 195, 305 210 Z" fill="url(#skin-warm-cg)" transform="rotate(-30 285 210)" />
      </g>
      <g id="kiss-skrappi">
        <path d="M 600 400 L 450 400 C 450 300, 400 240, 350 240 L 370 400 Z" fill="#ff8da1" />
        <path d="M 410 320 C 390 270, 360 250, 340 250 L 340 320 Z" fill="url(#skin-cool-cg)" />
        <ellipse cx="380" cy="200" rx="45" ry="50" fill="url(#skin-cool-cg)" transform="rotate(-15 380 200)" />
        <path d="M 425 180 C 430 120, 360 110, 345 170 Q 370 140 390 145 Z" fill="url(#hair-silver-cg)" />
        <path d="M 382 190 Q 372 196 362 190" stroke="#4682b4" stroke-width="3" stroke-linecap="round" fill="none" />
        <circle cx="372" cy="190" r="14" fill="none" stroke="#c0c0c0" stroke-width="2" />
        <ellipse cx="360" cy="205" rx="8" ry="4" fill="#ff4d6d" opacity="0.6" />
      </g>
      <path d="M 288 215 C 295 212, 305 212, 312 215 C 305 217, 295 217, 288 215" fill="#ff3377" />
      <path d="M 300 160 C 293 145, 278 145, 278 160 C 278 175, 300 190, 300 190 C 300 190, 322 175, 322 160 C 322 145, 307 145, 300 160 Z" fill="#ff3377" filter="drop-shadow(0 0 12px #ff3377)" />
    </svg>
  `,
  cozy_bed: `
    <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="fireplace-warmth" cx="10%" cy="90%" r="80%">
          <stop offset="0%" stop-color="#ff7f00" />
          <stop offset="50%" stop-color="#b21f1f" />
          <stop offset="100%" stop-color="#1c0a2d" />
        </radialGradient>
        <linearGradient id="hair-gold-cg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffd700" />
          <stop offset="100%" stop-color="#ff8c00" />
        </linearGradient>
        <linearGradient id="hair-silver-cg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="100%" stop-color="#b0b0b0" />
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#fireplace-warmth)" />
      <rect x="100" y="240" width="460" height="160" rx="15" fill="#311347" stroke="#ff3377" stroke-width="2" />
      <rect x="120" y="210" width="360" height="50" rx="10" fill="#220b38" />
      <g id="bed-bailey">
        <ellipse cx="260" cy="225" rx="28" ry="34" fill="#ffdbac" />
        <path d="M 230 205 Q 260 180 290 205 Z" fill="url(#hair-gold-cg)" />
        <path d="M 255 220 Q 262 225 268 220" stroke="#5c4033" stroke-width="2" stroke-linecap="round" fill="none" />
        <ellipse cx="258" cy="230" rx="6" ry="3" fill="#ff6699" opacity="0.6" />
      </g>
      <g id="bed-skrappi">
        <ellipse cx="340" cy="225" rx="28" ry="34" fill="#fff0f5" />
        <path d="M 310 205 Q 340 180 370 205 Z" fill="url(#hair-silver-cg)" />
        <circle cx="330" cy="220" r="10" fill="none" stroke="#c0c0c0" stroke-width="2" />
        <path d="M 326 220 Q 332 225 338 220" stroke="#4682b4" stroke-width="2" stroke-linecap="round" fill="none" />
        <ellipse cx="342" cy="230" rx="6" ry="3" fill="#ff4d6d" opacity="0.6" />
      </g>
      <path d="M 100 260 C 200 240, 400 240, 560 260 L 560 400 L 100 400 Z" fill="#e33b5c" />
      <path d="M 230 280 C 280 260, 310 260, 340 280" stroke="#ffdbac" stroke-width="8" stroke-linecap="round" fill="none" />
      <path d="M 300 160 C 295 150, 285 150, 285 160 C 285 170, 300 180, 300 180 C 300 180, 315 170, 315 160 Z" fill="#ff3377" filter="drop-shadow(0 0 10px #ff3377)" />
    </svg>
  `
};

// --- AMBIENT PARTICLE ENGINE ---
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class HeartParticle {
  constructor() {
    this.reset();
    this.y = Math.random() * canvas.height;
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 20;
    this.size = Math.random() * 12 + 6;
    this.speedY = -(Math.random() * 1.2 + 0.4);
    this.speedX = Math.sin(Math.random() * Math.PI) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.3;
    this.hue = Math.random() > 0.5 ? 340 : 25;
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.opacity -= 0.001;
    if (this.y < -20 || this.opacity <= 0) this.reset();
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = `hsla(${this.hue}, 100%, 65%, 1)`;
    ctx.shadowBlur = 8;
    ctx.shadowColor = `hsla(${this.hue}, 100%, 65%, 0.8)`;
    ctx.beginPath();
    const d = this.size;
    ctx.moveTo(this.x, this.y + d / 4);
    ctx.quadraticCurveTo(this.x, this.y, this.x + d / 2, this.y);
    ctx.quadraticCurveTo(this.x + d, this.y, this.x + d, this.y + d / 3);
    ctx.quadraticCurveTo(this.x + d, this.y + (d * 2) / 3, this.x + d / 2, this.y + d);
    ctx.quadraticCurveTo(this.x, this.y + (d * 2) / 3, this.x, this.y + d / 3);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 30; i++) particles.push(new HeartParticle());
}
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
initParticles();
animateParticles();

// --- SANDBOX PHYSICAL GAME LOOP ENGINE ---
const sandboxCanvas = document.getElementById('game-sandbox-canvas');
const sandCtx = sandboxCanvas.getContext('2d');

let keys = {};
let heartsBursts = []; // Dynamic particle pops on kiss/touch

// Characters Physics Objects
let baileyObj = {
  x: 150,
  y: 180,
  width: 75,
  height: 110,
  speed: 4,
  sprite: "bailey",
  isBlushing: false,
  isLeft: false
};

let skrappiObj = {
  x: 400,
  y: 180,
  width: 75,
  height: 110,
  sprite: "skrappi",
  isBlushing: false,
  isLeft: true
};

function initSandbox() {
  // Size to container wrapper
  sandboxCanvas.width = sandboxCanvas.parentElement.clientWidth;
  sandboxCanvas.height = sandboxCanvas.parentElement.clientHeight - 155; // Offset controller HUD height
  
  // Set positions centered
  baileyObj.x = sandboxCanvas.width * 0.25;
  baileyObj.y = sandboxCanvas.height * 0.45;
  skrappiObj.x = sandboxCanvas.width * 0.65;
  skrappiObj.y = sandboxCanvas.height * 0.45;

  window.addEventListener('keydown', (e) => keys[e.code] = true);
  window.addEventListener('keyup', (e) => keys[e.code] = false);

  requestAnimationFrame(sandboxUpdate);
}

function sandboxUpdate() {
  // Keyboard movement updates for Bailey
  if (keys["ArrowLeft"] || keys["KeyA"]) {
    baileyObj.x -= baileyObj.speed;
    baileyObj.isLeft = true;
  }
  if (keys["ArrowRight"] || keys["KeyD"]) {
    baileyObj.x += baileyObj.speed;
    baileyObj.isLeft = false;
  }
  if (keys["ArrowUp"] || keys["KeyW"]) {
    baileyObj.y -= baileyObj.speed;
  }
  if (keys["ArrowDown"] || keys["KeyS"]) {
    baileyObj.y += baileyObj.speed;
  }

  // Constrain boundary bounds
  baileyObj.x = Math.max(10, Math.min(sandboxCanvas.width - baileyObj.width - 10, baileyObj.x));
  baileyObj.y = Math.max(50, Math.min(sandboxCanvas.height - baileyObj.height - 10, baileyObj.y));

  // Determine relative facing orientations
  baileyObj.isLeft = (baileyObj.x > skrappiObj.x);
  skrappiObj.isLeft = (skrappiObj.x > baileyObj.x);

  // Smoothly decay activity bubbles/blushes
  if (state.actionTimer > 0) {
    state.actionTimer--;
    if (state.actionTimer === 0) {
      state.activeAction = null;
      baileyObj.isBlushing = false;
      skrappiObj.isBlushing = false;
      document.getElementById('action-speech-bubble').classList.add('hidden');
    }
  }

  // Update romantic emoji heart pops
  heartsBursts.forEach((hb, idx) => {
    hb.y += hb.speedY;
    hb.x += hb.speedX;
    hb.opacity -= 0.02;
    if (hb.opacity <= 0) heartsBursts.splice(idx, 1);
  });

  drawSandboxScreen();
  requestAnimationFrame(sandboxUpdate);
}

function drawSandboxScreen() {
  sandCtx.clearRect(0, 0, sandboxCanvas.width, sandboxCanvas.height);

  // Draw Ground Path/Plat Carpet
  sandCtx.fillStyle = 'rgba(40, 20, 60, 0.4)';
  sandCtx.beginPath();
  sandCtx.ellipse(sandboxCanvas.width / 2, sandboxCanvas.height * 0.7, sandboxCanvas.width * 0.45, 60, 0, 0, Math.PI * 2);
  sandCtx.fill();

  // Draw romantic fireplace or bed backdrop depending on snuggle state
  if (state.activeAction === "snuggle") {
    sandCtx.fillStyle = 'rgba(227, 59, 92, 0.15)';
    sandCtx.fillRect(0, 0, sandboxCanvas.width, sandboxCanvas.height);
  }

  // Draw Skrappi (Target Static/Dynamic Friend)
  drawCartoonCharacter(sandCtx, skrappiObj);

  // Draw Bailey (Player Controlled Character)
  drawCartoonCharacter(sandCtx, baileyObj);

  // Draw romantic action visual indicators (hugging/kissing heart overlays)
  if (state.activeAction === "kiss") {
    // Show overlapping big pink kissing heart
    const midX = (baileyObj.x + skrappiObj.x) / 2 + 35;
    const midY = (baileyObj.y + skrappiObj.y) / 2 + 20;
    drawHeartVector(sandCtx, midX - 25, midY - 25, 50, '#ff3377');
  }

  // Render floating emoji bursts
  heartsBursts.forEach(hb => {
    sandCtx.save();
    sandCtx.globalAlpha = hb.opacity;
    sandCtx.fillStyle = hb.color;
    sandCtx.font = `${hb.size}px Outfit`;
    sandCtx.fillText(hb.emoji, hb.x, hb.y);
    sandCtx.restore();
  });
}

// Custom cartoon character vector graphics renderer on Canvas
function drawCartoonCharacter(c, obj) {
  c.save();
  c.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);

  // Handle character flipping side to side
  if (obj.isLeft) {
    c.scale(-1, 1);
  }

  // Character Color Schemes
  const isBailey = (obj.sprite === "bailey");
  const hairColor = isBailey ? '#ffd700' : '#e0e0e0';
  const shirtColor = isBailey ? '#8e2de2' : '#ff8da1';
  const skinColor = isBailey ? '#ffdbac' : '#fff0f5';

  // Draw Body (Sweater)
  c.fillStyle = shirtColor;
  c.beginPath();
  c.roundRect(-30, 20, 60, 40, [15, 15, 0, 0]);
  c.fill();
  c.strokeStyle = '#220b38';
  c.lineWidth = 2.5;
  c.stroke();

  // Draw Neck
  c.fillStyle = skinColor;
  c.fillRect(-8, 5, 16, 18);

  // Draw Head
  c.beginPath();
  c.arc(0, -15, 26, 0, Math.PI * 2);
  c.fill();
  c.stroke();

  // Draw hair highlights
  c.fillStyle = hairColor;
  c.beginPath();
  c.arc(0, -25, 28, Math.PI, 0); // Upper cap
  c.fill();

  if (isBailey) {
    // Golden side bangs
    c.beginPath();
    c.arc(-18, -12, 10, 0, Math.PI * 2);
    c.arc(18, -12, 10, 0, Math.PI * 2);
    c.fill();
  } else {
    // Silver messy locks
    c.beginPath();
    c.arc(-16, -10, 9, 0, Math.PI * 2);
    c.arc(16, -10, 9, 0, Math.PI * 2);
    c.fill();
  }

  // Draw Eyes (Warm Brown or Blue)
  c.fillStyle = isBailey ? '#5c4033' : '#4682b4';
  c.beginPath();
  if (obj.isBlushing) {
    // Joy happy curved lines
    c.arc(-10, -14, 5, 0, Math.PI, true);
    c.arc(10, -14, 5, 0, Math.PI, true);
    c.strokeStyle = c.fillStyle;
    c.lineWidth = 3;
    c.stroke();
  } else {
    c.arc(-10, -14, 4, 0, Math.PI * 2);
    c.arc(10, -14, 4, 0, Math.PI * 2);
    c.fill();
    // Shiny white sparkles
    c.fillStyle = '#fff';
    c.arc(-9, -15, 1.2, 0, Math.PI * 2);
    c.arc(11, -15, 1.2, 0, Math.PI * 2);
    c.fill();
  }

  // Draw Blush
  if (obj.isBlushing) {
    c.fillStyle = 'rgba(255, 51, 119, 0.6)';
    c.beginPath();
    c.ellipse(-16, -5, 7, 4, 0, 0, Math.PI * 2);
    c.ellipse(16, -5, 7, 4, 0, 0, Math.PI * 2);
    c.fill();
  }

  // Draw Shy/Happy Smile
  c.strokeStyle = '#901a1e';
  c.lineWidth = 2.5;
  c.beginPath();
  c.arc(0, -6, 5, 0, Math.PI);
  c.stroke();

  // Draw Glasses (Skrappi exclusive)
  if (!isBailey) {
    c.strokeStyle = '#c0c0c0';
    c.lineWidth = 2;
    c.beginPath();
    c.arc(-10, -13, 10, 0, Math.PI * 2);
    c.arc(10, -13, 10, 0, Math.PI * 2);
    c.stroke();
    // bridge
    c.beginPath();
    c.moveTo(-1, -13);
    c.lineTo(1, -13);
    c.stroke();
  }

  c.restore();
}

function drawHeartVector(c, x, y, size, color) {
  c.save();
  c.fillStyle = color;
  c.shadowBlur = 15;
  c.shadowColor = color;
  c.beginPath();
  const d = size;
  c.moveTo(x, y + d / 4);
  c.quadraticCurveTo(x, y, x + d / 2, y);
  c.quadraticCurveTo(x + d, y, x + d, y + d / 3);
  c.quadraticCurveTo(x + d, y + (d * 2) / 3, x + d / 2, y + d);
  c.quadraticCurveTo(x, y + (d * 2) / 3, x, y + d / 3);
  c.closePath();
  c.fill();
  c.restore();
}

// --- CONTROLLER ACTIONS DISPATCHERS ---
function checkProximity() {
  const dist = Math.hypot((baileyObj.x - skrappiObj.x), (baileyObj.y - skrappiObj.y));
  return dist < 120; // Must be close enough to touch
}

function triggerRomanticAction(actionType) {
  initAudio();
  const isClose = checkProximity();
  const speechBubble = document.getElementById('action-speech-bubble');

  if (!isClose && actionType !== "flirt") {
    // Show prompt telling them to walk closer
    speechBubble.textContent = "Walk closer to each other first! ❤️";
    speechBubble.classList.remove('hidden');
    state.actionTimer = 60;
    playChime(220);
    return;
  }

  // Trigger Action logic states
  state.activeAction = actionType;
  state.actionTimer = 90; // Active for 1.5 seconds
  baileyObj.isBlushing = true;
  skrappiObj.isBlushing = true;

  let scoreGain = 0;
  let bubbleText = "";

  if (actionType === "kiss") {
    bubbleText = "💋 Mwah! Bailey & Skrappi share a deep, passionate kiss!";
    scoreGain = 12;
    playChime(587); // High harmonic chime
    playHeartbeatSound();
    spawnHeartBurst("❤️");
    unlockCGScene("starlit_kiss");
  } else if (actionType === "hug") {
    bubbleText = "🤗 Bailey wraps his arms tightly around Skrappi's waist!";
    scoreGain = 10;
    playChime(523);
    spawnHeartBurst("💖");
    unlockCGScene("cafe_hug");
  } else if (actionType === "cheeks") {
    bubbleText = "😊 Bailey gently caresses Skrappi's warm blushing cheek.";
    scoreGain = 8;
    playChime(392);
    spawnHeartBurst("✨");
  } else if (actionType === "tickle") {
    bubbleText = "✨ Haha! Bailey tickles Skrappi's waist, making him giggle!";
    scoreGain = 8;
    playChime(659);
    spawnHeartBurst("⭐");
  } else if (actionType === "flirt") {
    bubbleText = "💬 Bailey winks and whispers a sweet flirt to Skrappi.";
    scoreGain = 6;
    playChime(349);
    spawnHeartBurst("💫");
  } else if (actionType === "snuggle") {
    bubbleText = "🛏️ They snuggle together closely, sharing sweet caresses.";
    scoreGain = 15;
    playChime(698);
    playHeartbeatSound();
    spawnHeartBurst("💖");
    unlockCGScene("cozy_bed");
  }

  // Update meters
  state.loveScore = Math.min(100, state.loveScore + scoreGain);
  updateLoveMeter();

  // Show text bubble HUD
  speechBubble.textContent = bubbleText;
  speechBubble.classList.remove('hidden');
}

function spawnHeartBurst(emoji) {
  const spawnX = (baileyObj.x + skrappiObj.x) / 2 + 35;
  const spawnY = (baileyObj.y + skrappiObj.y) / 2;
  
  for (let i = 0; i < 8; i++) {
    heartsBursts.push({
      x: spawnX,
      y: spawnY,
      speedX: (Math.random() - 0.5) * 6,
      speedY: -(Math.random() * 4 + 2),
      opacity: 1.0,
      size: Math.random() * 12 + 18,
      emoji: emoji,
      color: `hsla(${Math.random() * 360}, 100%, 70%, 1)`
    });
  }
}

function unlockCGScene(cgId) {
  if (!state.unlockedScenes.includes(cgId)) {
    state.unlockedScenes.push(cgId);
    localStorage.setItem('unlockedCGs', JSON.stringify(state.unlockedScenes));
  }
}

function updateLoveMeter() {
  const loveBarFill = document.getElementById('love-bar-fill');
  const lovePercent = document.getElementById('love-percent');
  if (loveBarFill && lovePercent) {
    loveBarFill.style.width = `${state.loveScore}%`;
    lovePercent.textContent = `${state.loveScore}%`;
  }
}

// --- DOM ELEMENTS ROUTING ---
const startScreen = document.getElementById('start-screen');
const storyScreen = document.getElementById('story-screen');
const endingScreen = document.getElementById('ending-screen');
const galleryScreen = document.getElementById('gallery-screen');

const startBtn = document.getElementById('start-game-btn');
const galleryBtn = document.getElementById('open-gallery-btn');
const closeGalleryBtn = document.getElementById('close-gallery-btn');
const soundBtn = document.getElementById('sound-toggle');
const endPlaygroundBtn = document.getElementById('end-playground-btn');

function showScreen(screen) {
  [startScreen, storyScreen, endingScreen, galleryScreen].forEach(s => {
    s.classList.remove('active');
  });
  screen.classList.add('active');
}

// --- GENERAL INTERACTS ---
startBtn.addEventListener('click', () => {
  initAudio();
  state.loveScore = 30;
  updateLoveMeter();
  showScreen(storyScreen);
  initSandbox();
});

galleryBtn.addEventListener('click', () => {
  renderGallery();
  showScreen(galleryScreen);
});

closeGalleryBtn.addEventListener('click', () => {
  showScreen(startScreen);
});

endPlaygroundBtn.addEventListener('click', () => {
  launchEnding();
});

document.getElementById('restart-game-btn').addEventListener('click', () => {
  state.loveScore = 30;
  updateLoveMeter();
  showScreen(storyScreen);
});

document.getElementById('ending-gallery-btn').addEventListener('click', () => {
  renderGallery();
  showScreen(galleryScreen);
});

// DPAD CLICK ACTIONS (Bailey Movements)
document.getElementById('dpad-up').addEventListener('mousedown', () => baileyObj.y -= 15);
document.getElementById('dpad-down').addEventListener('mousedown', () => baileyObj.y += 15);
document.getElementById('dpad-left').addEventListener('mousedown', () => { baileyObj.x -= 15; baileyObj.isLeft = true; });
document.getElementById('dpad-right').addEventListener('mousedown', () => { baileyObj.x += 15; baileyObj.isLeft = false; });

// DPAD MOBILE TOUCH SUPPORT
document.getElementById('dpad-up').addEventListener('touchstart', (e) => { e.preventDefault(); baileyObj.y -= 15; });
document.getElementById('dpad-down').addEventListener('touchstart', (e) => { e.preventDefault(); baileyObj.y += 15; });
document.getElementById('dpad-left').addEventListener('touchstart', (e) => { e.preventDefault(); baileyObj.x -= 15; baileyObj.isLeft = true; });
document.getElementById('dpad-right').addEventListener('touchstart', (e) => { e.preventDefault(); baileyObj.x += 15; baileyObj.isLeft = false; });

// ACTIONS HUD TRIGGERS
document.getElementById('action-kiss-btn').addEventListener('click', () => triggerRomanticAction("kiss"));
document.getElementById('action-hug-btn').addEventListener('click', () => triggerRomanticAction("hug"));
document.getElementById('action-cheeks-btn').addEventListener('click', () => triggerRomanticAction("cheeks"));
document.getElementById('action-tickle-btn').addEventListener('click', () => triggerRomanticAction("tickle"));
document.getElementById('action-flirt-btn').addEventListener('click', () => triggerRomanticAction("flirt"));
document.getElementById('action-snuggle-btn').addEventListener('click', () => triggerRomanticAction("snuggle"));

// --- LAUNCH ENDING SUMMARY ---
function launchEnding() {
  showScreen(endingScreen);
  document.getElementById('final-love-score').textContent = `Final Love Match: ${state.loveScore}%`;
  const title = document.getElementById('ending-title-text');
  const desc = document.getElementById('ending-description-text');
  
  if (state.loveScore >= 90) {
    title.textContent = "Bound Forever";
    desc.textContent = "Bailey and Skrappi share a night of absolute romantic passion and intimacy, bound together by a beautiful, unbreakable love connection.";
  } else if (state.loveScore >= 60) {
    title.textContent = "Warm Affection";
    desc.textContent = "They spend the night cuddling close by the crackling hearth, sharing sweet touches and promises for their bright future.";
  } else {
    title.textContent = "Tender Companionship";
    desc.textContent = "Though taking things gentle, Bailey and Skrappi share a cozy hug and look forward to building their connection day by day.";
  }
}

// --- GALLERY RENDERER ---
function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  grid.innerHTML = '';
  const cgs = [
    { id: 'cafe_hug', title: 'Lavender Cafe Embrace' },
    { id: 'starlit_kiss', title: 'Starlit Promenade Kiss' },
    { id: 'cozy_bed', title: 'Breathless Cabin Intimacy' }
  ];
  
  cgs.forEach(cg => {
    const card = document.createElement('div');
    const isUnlocked = state.unlockedScenes.includes(cg.id);
    card.className = `gallery-card ${isUnlocked ? '' : 'locked'}`;
    
    let thumb = isUnlocked ? CG_SCENES[cg.id] : `<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#1a1226"/></svg>`;
    
    card.innerHTML = `
      <div class="gallery-thumb-container">${thumb}</div>
      <div class="gallery-card-label">${cg.title}</div>
    `;
    if (isUnlocked) {
      card.addEventListener('click', () => openLightbox(cg.id, cg.title));
    }
    grid.appendChild(card);
  });
}

function openLightbox(id, title) {
  const modal = document.createElement('div');
  modal.className = 'lightbox-modal';
  modal.innerHTML = `
    <button class="lightbox-close">Close</button>
    <div class="lightbox-content">${CG_SCENES[id]}</div>
    <div class="lightbox-title">${title}</div>
  `;
  modal.querySelector('.lightbox-close').addEventListener('click', () => modal.remove());
  document.body.appendChild(modal);
}

// --- SOUND TOGGLE ---
soundBtn.addEventListener('click', () => {
  initAudio();
  state.isMusicPlaying = !state.isMusicPlaying;
  const iconPath = document.getElementById('sound-icon-path');
  if (state.isMusicPlaying) {
    soundBtn.style.color = '#fff';
    soundBtn.style.background = 'var(--color-primary)';
    iconPath.setAttribute('d', 'M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM12 4L9.91 6.09 12 8.18V4zm-8 8H6l5 5v-3.18l-5-5H4v8zM19 12c0 3.58-2.5 6.58-6 7.42v2.06c4.62-.9 8-4.94 8-9.48s-3.38-8.58-8-9.48v2.06c3.5.84 6 3.84 6 7.42z');
    if (audioCtx.state === 'suspended') audioCtx.resume();
  } else {
    soundBtn.style.color = 'var(--color-primary)';
    soundBtn.style.background = 'var(--glass-bg)';
    iconPath.setAttribute('d', 'M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM4.27 3L3 4.27 7.73 9H4v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4zM19 12c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.57 14.92 21 13.51 21 12c0-4.54-3.38-8.58-8-9.48v2.06c3.5.84 6 3.84 6 7.42z');
  }
});

// Load previously unlocked scenes
try {
  const loaded = localStorage.getItem('unlockedCGs');
  if (loaded) state.unlockedScenes = JSON.parse(loaded);
} catch (e) {
  console.warn("Could not read localstorage gallery saves", e);
}
