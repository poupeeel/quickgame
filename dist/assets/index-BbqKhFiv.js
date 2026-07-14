(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))a(l);new MutationObserver(l=>{for(const r of l)if(r.type==="childList")for(const M of r.addedNodes)M.tagName==="LINK"&&M.rel==="modulepreload"&&a(M)}).observe(document,{childList:!0,subtree:!0});function i(l){const r={};return l.integrity&&(r.integrity=l.integrity),l.referrerPolicy&&(r.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?r.credentials="include":l.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(l){if(l.ep)return;l.ep=!0;const r=i(l);fetch(l.href,r)}})();let o={loveScore:30,unlockedScenes:[],isMusicPlaying:!1,activeAction:null,actionTimer:0},s=null,g=null,w=null;function B(){s||(s=new(window.AudioContext||window.webkitAudioContext),Q())}function Q(){if(!s)return;g=s.createOscillator(),w=s.createGain(),g.type="triangle",g.frequency.setValueAtTime(130.81,s.currentTime),w.gain.setValueAtTime(.08,s.currentTime),g.connect(w),w.connect(s.destination),g.start();let e=[130.81,146.83,164.81,196],t=0;setInterval(()=>{o.isMusicPlaying&&g&&(t=(t+1)%e.length,g.frequency.setValueAtTime(e[t],s.currentTime))},4e3)}function y(e=440){if(!s||!o.isMusicPlaying)return;const t=s.createOscillator(),i=s.createGain();t.type="sine",t.frequency.setValueAtTime(e,s.currentTime),i.gain.setValueAtTime(.12,s.currentTime),i.gain.exponentialRampToValueAtTime(.001,s.currentTime+.8),t.connect(i),i.connect(s.destination),t.start(),t.stop(s.currentTime+.8)}function P(){if(!s||!o.isMusicPlaying)return;const e=s.createOscillator(),t=s.createGain();e.type="sine",e.frequency.setValueAtTime(85,s.currentTime),t.gain.setValueAtTime(.3,s.currentTime),t.gain.exponentialRampToValueAtTime(.001,s.currentTime+.3),e.connect(t),t.connect(s.destination),e.start(),e.stop(s.currentTime+.3)}const G={cafe_hug:`
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
  `,starlit_kiss:`
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
  `,cozy_bed:`
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
  `},p=document.getElementById("particle-canvas"),f=p.getContext("2d");let C=[];function A(){p.width=p.parentElement.clientWidth,p.height=p.parentElement.clientHeight}window.addEventListener("resize",A);A();class V{constructor(){this.reset(),this.y=Math.random()*p.height}reset(){this.x=Math.random()*p.width,this.y=p.height+20,this.size=Math.random()*12+6,this.speedY=-(Math.random()*1.2+.4),this.speedX=Math.sin(Math.random()*Math.PI)*.4,this.opacity=Math.random()*.5+.3,this.hue=Math.random()>.5?340:25}update(){this.y+=this.speedY,this.x+=this.speedX,this.opacity-=.001,(this.y<-20||this.opacity<=0)&&this.reset()}draw(){f.save(),f.globalAlpha=this.opacity,f.fillStyle=`hsla(${this.hue}, 100%, 65%, 1)`,f.shadowBlur=8,f.shadowColor=`hsla(${this.hue}, 100%, 65%, 0.8)`,f.beginPath();const t=this.size;f.moveTo(this.x,this.y+t/4),f.quadraticCurveTo(this.x,this.y,this.x+t/2,this.y),f.quadraticCurveTo(this.x+t,this.y,this.x+t,this.y+t/3),f.quadraticCurveTo(this.x+t,this.y+t*2/3,this.x+t/2,this.y+t),f.quadraticCurveTo(this.x,this.y+t*2/3,this.x,this.y+t/3),f.closePath(),f.fill(),f.restore()}}function $(){C=[];for(let e=0;e<30;e++)C.push(new V)}function z(){f.clearRect(0,0,p.width,p.height),C.forEach(e=>{e.update(),e.draw()}),requestAnimationFrame(z)}$();z();const c=document.getElementById("game-sandbox-canvas"),d=c.getContext("2d");let u={},b=[],n={x:150,y:180,width:75,height:110,speed:4,sprite:"bailey",isBlushing:!1,isLeft:!1},h={x:400,y:180,width:75,height:110,sprite:"skrappi",isBlushing:!1,isLeft:!0};function N(){c.width=c.parentElement.clientWidth,c.height=c.parentElement.clientHeight-155,n.x=c.width*.25,n.y=c.height*.45,h.x=c.width*.65,h.y=c.height*.45,window.addEventListener("keydown",e=>u[e.code]=!0),window.addEventListener("keyup",e=>u[e.code]=!1),requestAnimationFrame(q)}function q(){(u.ArrowLeft||u.KeyA)&&(n.x-=n.speed,n.isLeft=!0),(u.ArrowRight||u.KeyD)&&(n.x+=n.speed,n.isLeft=!1),(u.ArrowUp||u.KeyW)&&(n.y-=n.speed),(u.ArrowDown||u.KeyS)&&(n.y+=n.speed),n.x=Math.max(10,Math.min(c.width-n.width-10,n.x)),n.y=Math.max(50,Math.min(c.height-n.height-10,n.y)),n.isLeft=n.x>h.x,h.isLeft=h.x>n.x,o.actionTimer>0&&(o.actionTimer--,o.actionTimer===0&&(o.activeAction=null,n.isBlushing=!1,h.isBlushing=!1,document.getElementById("action-speech-bubble").classList.add("hidden"))),b.forEach((e,t)=>{e.y+=e.speedY,e.x+=e.speedX,e.opacity-=.02,e.opacity<=0&&b.splice(t,1)}),_(),requestAnimationFrame(q)}function _(){if(d.clearRect(0,0,c.width,c.height),d.fillStyle="rgba(40, 20, 60, 0.4)",d.beginPath(),d.ellipse(c.width/2,c.height*.7,c.width*.45,60,0,0,Math.PI*2),d.fill(),o.activeAction==="snuggle"&&(d.fillStyle="rgba(227, 59, 92, 0.15)",d.fillRect(0,0,c.width,c.height)),T(d,h),T(d,n),o.activeAction==="kiss"){const e=(n.x+h.x)/2+35,t=(n.y+h.y)/2+20;R(d,e-25,t-25,50,"#ff3377")}b.forEach(e=>{d.save(),d.globalAlpha=e.opacity,d.fillStyle=e.color,d.font=`${e.size}px Outfit`,d.fillText(e.emoji,e.x,e.y),d.restore()})}function T(e,t){e.save(),e.translate(t.x+t.width/2,t.y+t.height/2),t.isLeft&&e.scale(-1,1);const i=t.sprite==="bailey",a=i?"#ffd700":"#e0e0e0",l=i?"#8e2de2":"#ff8da1",r=i?"#ffdbac":"#fff0f5";e.fillStyle=l,e.beginPath(),e.roundRect(-30,20,60,40,[15,15,0,0]),e.fill(),e.strokeStyle="#220b38",e.lineWidth=2.5,e.stroke(),e.fillStyle=r,e.fillRect(-8,5,16,18),e.beginPath(),e.arc(0,-15,26,0,Math.PI*2),e.fill(),e.stroke(),e.fillStyle=a,e.beginPath(),e.arc(0,-25,28,Math.PI,0),e.fill(),i?(e.beginPath(),e.arc(-18,-12,10,0,Math.PI*2),e.arc(18,-12,10,0,Math.PI*2),e.fill()):(e.beginPath(),e.arc(-16,-10,9,0,Math.PI*2),e.arc(16,-10,9,0,Math.PI*2),e.fill()),e.fillStyle=i?"#5c4033":"#4682b4",e.beginPath(),t.isBlushing?(e.arc(-10,-14,5,0,Math.PI,!0),e.arc(10,-14,5,0,Math.PI,!0),e.strokeStyle=e.fillStyle,e.lineWidth=3,e.stroke()):(e.arc(-10,-14,4,0,Math.PI*2),e.arc(10,-14,4,0,Math.PI*2),e.fill(),e.fillStyle="#fff",e.arc(-9,-15,1.2,0,Math.PI*2),e.arc(11,-15,1.2,0,Math.PI*2),e.fill()),t.isBlushing&&(e.fillStyle="rgba(255, 51, 119, 0.6)",e.beginPath(),e.ellipse(-16,-5,7,4,0,0,Math.PI*2),e.ellipse(16,-5,7,4,0,0,Math.PI*2),e.fill()),e.strokeStyle="#901a1e",e.lineWidth=2.5,e.beginPath(),e.arc(0,-6,5,0,Math.PI),e.stroke(),i||(e.strokeStyle="#c0c0c0",e.lineWidth=2,e.beginPath(),e.arc(-10,-13,10,0,Math.PI*2),e.arc(10,-13,10,0,Math.PI*2),e.stroke(),e.beginPath(),e.moveTo(-1,-13),e.lineTo(1,-13),e.stroke()),e.restore()}function R(e,t,i,a,l){e.save(),e.fillStyle=l,e.shadowBlur=15,e.shadowColor=l,e.beginPath();const r=a;e.moveTo(t,i+r/4),e.quadraticCurveTo(t,i,t+r/2,i),e.quadraticCurveTo(t+r,i,t+r,i+r/3),e.quadraticCurveTo(t+r,i+r*2/3,t+r/2,i+r),e.quadraticCurveTo(t,i+r*2/3,t,i+r/3),e.closePath(),e.fill(),e.restore()}function W(){return Math.hypot(n.x-h.x,n.y-h.y)<120}function x(e){B();const t=W(),i=document.getElementById("action-speech-bubble");if(!t&&e!=="flirt"){i.textContent="Walk closer to each other first! ❤️",i.classList.remove("hidden"),o.actionTimer=60,y(220);return}o.activeAction=e,o.actionTimer=90,n.isBlushing=!0,h.isBlushing=!0;let a=0,l="";e==="kiss"?(l="💋 Mwah! Bailey & Skrappi share a deep, passionate kiss!",a=12,y(587),P(),m("❤️"),E("starlit_kiss")):e==="hug"?(l="🤗 Bailey wraps his arms tightly around Skrappi's waist!",a=10,y(523),m("💖"),E("cafe_hug")):e==="cheeks"?(l="😊 Bailey gently caresses Skrappi's warm blushing cheek.",a=8,y(392),m("✨")):e==="tickle"?(l="✨ Haha! Bailey tickles Skrappi's waist, making him giggle!",a=8,y(659),m("⭐")):e==="flirt"?(l="💬 Bailey winks and whispers a sweet flirt to Skrappi.",a=6,y(349),m("💫")):e==="snuggle"&&(l="🛏️ They snuggle together closely, sharing sweet caresses.",a=15,y(698),P(),m("💖"),E("cozy_bed")),o.loveScore=Math.min(100,o.loveScore+a),L(),i.textContent=l,i.classList.remove("hidden")}function m(e){const t=(n.x+h.x)/2+35,i=(n.y+h.y)/2;for(let a=0;a<8;a++)b.push({x:t,y:i,speedX:(Math.random()-.5)*6,speedY:-(Math.random()*4+2),opacity:1,size:Math.random()*12+18,emoji:e,color:`hsla(${Math.random()*360}, 100%, 70%, 1)`})}function E(e){o.unlockedScenes.includes(e)||(o.unlockedScenes.push(e),localStorage.setItem("unlockedCGs",JSON.stringify(o.unlockedScenes)))}function L(){const e=document.getElementById("love-bar-fill"),t=document.getElementById("love-percent");e&&t&&(e.style.width=`${o.loveScore}%`,t.textContent=`${o.loveScore}%`)}const Z=document.getElementById("start-screen"),I=document.getElementById("story-screen"),O=document.getElementById("ending-screen"),S=document.getElementById("gallery-screen"),F=document.getElementById("start-game-btn"),D=document.getElementById("open-gallery-btn"),K=document.getElementById("close-gallery-btn"),k=document.getElementById("sound-toggle"),X=document.getElementById("end-playground-btn");function v(e){[Z,I,O,S].forEach(t=>{t.classList.remove("active")}),e.classList.add("active")}F.addEventListener("click",()=>{B(),o.loveScore=30,L(),v(I),N()});D.addEventListener("click",()=>{H(),v(S)});K.addEventListener("click",()=>{v(Z)});X.addEventListener("click",()=>{Y()});document.getElementById("restart-game-btn").addEventListener("click",()=>{o.loveScore=30,L(),v(I)});document.getElementById("ending-gallery-btn").addEventListener("click",()=>{H(),v(S)});document.getElementById("dpad-up").addEventListener("mousedown",()=>n.y-=15);document.getElementById("dpad-down").addEventListener("mousedown",()=>n.y+=15);document.getElementById("dpad-left").addEventListener("mousedown",()=>{n.x-=15,n.isLeft=!0});document.getElementById("dpad-right").addEventListener("mousedown",()=>{n.x+=15,n.isLeft=!1});document.getElementById("dpad-up").addEventListener("touchstart",e=>{e.preventDefault(),n.y-=15});document.getElementById("dpad-down").addEventListener("touchstart",e=>{e.preventDefault(),n.y+=15});document.getElementById("dpad-left").addEventListener("touchstart",e=>{e.preventDefault(),n.x-=15,n.isLeft=!0});document.getElementById("dpad-right").addEventListener("touchstart",e=>{e.preventDefault(),n.x+=15,n.isLeft=!1});document.getElementById("action-kiss-btn").addEventListener("click",()=>x("kiss"));document.getElementById("action-hug-btn").addEventListener("click",()=>x("hug"));document.getElementById("action-cheeks-btn").addEventListener("click",()=>x("cheeks"));document.getElementById("action-tickle-btn").addEventListener("click",()=>x("tickle"));document.getElementById("action-flirt-btn").addEventListener("click",()=>x("flirt"));document.getElementById("action-snuggle-btn").addEventListener("click",()=>x("snuggle"));function Y(){v(O),document.getElementById("final-love-score").textContent=`Final Love Match: ${o.loveScore}%`;const e=document.getElementById("ending-title-text"),t=document.getElementById("ending-description-text");o.loveScore>=90?(e.textContent="Bound Forever",t.textContent="Bailey and Skrappi share a night of absolute romantic passion and intimacy, bound together by a beautiful, unbreakable love connection."):o.loveScore>=60?(e.textContent="Warm Affection",t.textContent="They spend the night cuddling close by the crackling hearth, sharing sweet touches and promises for their bright future."):(e.textContent="Tender Companionship",t.textContent="Though taking things gentle, Bailey and Skrappi share a cozy hug and look forward to building their connection day by day.")}function H(){const e=document.getElementById("gallery-grid");e.innerHTML="",[{id:"cafe_hug",title:"Lavender Cafe Embrace"},{id:"starlit_kiss",title:"Starlit Promenade Kiss"},{id:"cozy_bed",title:"Breathless Cabin Intimacy"}].forEach(i=>{const a=document.createElement("div"),l=o.unlockedScenes.includes(i.id);a.className=`gallery-card ${l?"":"locked"}`;let r=l?G[i.id]:'<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#1a1226"/></svg>';a.innerHTML=`
      <div class="gallery-thumb-container">${r}</div>
      <div class="gallery-card-label">${i.title}</div>
    `,l&&a.addEventListener("click",()=>U(i.id,i.title)),e.appendChild(a)})}function U(e,t){const i=document.createElement("div");i.className="lightbox-modal",i.innerHTML=`
    <button class="lightbox-close">Close</button>
    <div class="lightbox-content">${G[e]}</div>
    <div class="lightbox-title">${t}</div>
  `,i.querySelector(".lightbox-close").addEventListener("click",()=>i.remove()),document.body.appendChild(i)}k.addEventListener("click",()=>{B(),o.isMusicPlaying=!o.isMusicPlaying;const e=document.getElementById("sound-icon-path");o.isMusicPlaying?(k.style.color="#fff",k.style.background="var(--color-primary)",e.setAttribute("d","M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM12 4L9.91 6.09 12 8.18V4zm-8 8H6l5 5v-3.18l-5-5H4v8zM19 12c0 3.58-2.5 6.58-6 7.42v2.06c4.62-.9 8-4.94 8-9.48s-3.38-8.58-8-9.48v2.06c3.5.84 6 3.84 6 7.42z"),s.state==="suspended"&&s.resume()):(k.style.color="var(--color-primary)",k.style.background="var(--glass-bg)",e.setAttribute("d","M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM4.27 3L3 4.27 7.73 9H4v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4zM19 12c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.57 14.92 21 13.51 21 12c0-4.54-3.38-8.58-8-9.48v2.06c3.5.84 6 3.84 6 7.42z"))});try{const e=localStorage.getItem("unlockedCGs");e&&(o.unlockedScenes=JSON.parse(e))}catch(e){console.warn("Could not read localstorage gallery saves",e)}
