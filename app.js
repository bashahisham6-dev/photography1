const app = document.getElementById('app');

// --- MUSIC DATA & STATE ---
const playlist = [
    { title: "Hip Shop", src: "music/Hip Shop.mp3" },
    { title: "After Hours", src: "music/After Hours.mp3" },
    { title: "Closing Time", src: "music/Closing Time.mp3" },
    { title: "Take Care", src: "music/Take Care.mp3" }
];
let currentSongIndex = 0;
const audio = new Audio(playlist[currentSongIndex].src);
audio.loop = true;

// --- DOM ELEMENTS FOR LIGHTBOX & EXIF ---
const lb = document.createElement('div');
lb.id = 'lightbox';
lb.innerHTML = '<div id="exif-data"></div><img src="" id="lb-img">';
document.body.appendChild(lb);
const lbImg = document.getElementById('lb-img');
const exifBox = document.getElementById('exif-data');

const projectData = {
    p3:  { name: "Things Organized Neatly", count: 3 },
    p4:  { name: "Light Painting", count: 3 },
    p5:  { name: "Mixed Fruit", count: 3 },
    p6:  { name: "Cloning", count: 3 },
    p7:  { name: "Face Slide Effect", count: 8 },
    p8:  { name: "Selective Color", count: 8 },
    p9:  { name: "Double Exposure", count: 3 },
    p10: { name: "Mandalas", count: 4 },
    p11: { name: "Double Color Exposure", count: 2 },
    p12: { name: "All About Me Collage", count: 1 },
    p13: { name: "Animated GIF", count: 1 }
};

const routes = {
    home: `<div class="home-content">
            <h1>PHOTOGRAPHY PORTFOLIO</h1>
            <h2>By Hisham Basha</h2>
            <p>Welcome to my photography portfolio! Use arrow keys or swipe to explore. Click an image for fullscreen.</p>
            <div id="music-player">
                <div class="track-info">
                    <span class="arrow" onclick="changeSong(-1)">&#9664;</span>
                    <span id="song-title">${playlist[currentSongIndex].title}</span>
                    <span class="arrow" onclick="changeSong(1)">&#9654;</span>
                </div>
                <div class="controls">
                    <input type="range" id="volume-slider" min="0" max="1" step="0.01" value="${audio.volume}">
                    <div class="btn-group">
                        <button id="play-pause-btn" class="player-btn">Play</button>
                        <button id="mute-btn" class="player-btn">Mute</button>
                    </div>
                </div>
            </div>
        </div>`,
    about: `<div class="home-content">
            <h2>ABOUT ME</h2>
            <p>I am a photographer who occasionally writes questionable JavaScript. This portfolio represents my work and my struggle with basic logic.</p>
        </div>`
};

// --- MUSIC LOGIC ---
window.changeSong = function(dir) {
    currentSongIndex = (currentSongIndex + dir + playlist.length) % playlist.length;
    const wasPlaying = !audio.paused;
    audio.src = playlist[currentSongIndex].src;
    const titleEl = document.getElementById('song-title');
    if (titleEl) titleEl.innerText = playlist[currentSongIndex].title;
    if (wasPlaying) audio.play();
    updatePlayBtn();
};

function updatePlayBtn() {
    const btn = document.getElementById('play-pause-btn');
    if (btn) btn.innerText = audio.paused ? "Play" : "Pause";
}

function initMusicUI() {
    const slider = document.getElementById('volume-slider');
    const muteBtn = document.getElementById('mute-btn');
    const playBtn = document.getElementById('play-pause-btn');
    if (!slider) return;
    updatePlayBtn();
    slider.oninput = (e) => { audio.volume = e.target.value; audio.muted = false; if(muteBtn) muteBtn.innerText = "Mute"; };
    playBtn.onclick = () => { audio.paused ? audio.play() : audio.pause(); updatePlayBtn(); };
    muteBtn.onclick = () => { audio.muted = !audio.muted; muteBtn.innerText = audio.muted ? "Unmute" : "Mute"; };
}

// --- MOVEMENT LOGIC ---
let posX = 0, posY = 0;
const moveSpeed = 15;
const keysPressed = {};
let touchStartX = 0, touchStartY = 0;

window.addEventListener('keydown', (e) => { keysPressed[e.key] = true; });
window.addEventListener('keyup', (e) => { keysPressed[e.key] = false; });

window.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}, { passive: false });

window.addEventListener('touchmove', (e) => {
    const link = window.location.hash.replace('#', '') || 'home';
    if (lb.style.display === 'flex' || routes[link]) return;
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    posX += (touchX - touchStartX);
    posY += (touchY - touchStartY);
    touchStartX = touchX; touchStartY = touchY;
    e.preventDefault();
}, { passive: false });

function updatePosition() {
    const link = window.location.hash.replace('#', '') || 'home';
    if (lb.style.display === 'flex' || routes[link]) {
        app.style.transform = `translate(0px, 0px)`;
        requestAnimationFrame(updatePosition);
        return;
    }
    const minX = -(app.scrollWidth - window.innerWidth);
    const minY = -(app.scrollHeight - window.innerHeight);
    if (keysPressed['ArrowRight']) posX -= moveSpeed;
    if (keysPressed['ArrowLeft'])  posX += moveSpeed;
    if (keysPressed['ArrowDown'])  posY -= moveSpeed;
    if (keysPressed['ArrowUp'])    posY += moveSpeed;
    posX = Math.min(0, Math.max(minX, posX));
    posY = Math.min(0, Math.max(minY, posY));
    app.style.transform = `translate(${posX}px, ${posY}px)`;
    requestAnimationFrame(updatePosition);
}
requestAnimationFrame(updatePosition);

// --- EXIF LOGIC ---
function updateExif(imgElement) {
    exifBox.style.display = 'block';
    exifBox.innerHTML = 'Reading EXIF...';
    EXIF.getData(imgElement, function() {
        const make = EXIF.getTag(this, "Make") || "Unknown";
        const model = EXIF.getTag(this, "Model") || "Camera";
        const fStop = EXIF.getTag(this, "FNumber") ? `f/${EXIF.getTag(this, "FNumber")}` : "N/A";
        const exposure = EXIF.getTag(this, "ExposureTime") ? `1/${Math.round(1/EXIF.getTag(this, "ExposureTime"))}s` : "N/A";
        const iso = EXIF.getTag(this, "ISOSpeedRatings") || "N/A";
        exifBox.innerHTML = `<strong>${make} ${model}</strong><span>Aperture: ${fStop}</span><span>Shutter: ${exposure}</span><span>ISO: ${iso}</span>`;
    });
}

// --- NAVIGATION & GALLERY ---
function generateGallery(id) {
    const p = projectData[id];
    if (!p) return routes.home;
    let html = `<div class="grid">`;
    for (let i = 1; i <= p.count; i++) {
        const folder = encodeURIComponent(p.name);
        html += `<img src="${folder}/${i}.jpg" loading="lazy" onerror="this.src='placeholder.jpg'">`;
    }
    return html + '</div>';
}

function navigate() {
    const link = window.location.hash.replace('#', '') || 'home';
    app.innerHTML = (routes[link]) ? routes[link] : generateGallery(link);
    if (link === 'home') initMusicUI();
    posX = 0; posY = 0;
    app.style.transform = `translate(0px, 0px)`;
}

app.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG' && !e.target.closest('#lightbox')) {
        lbImg.src = e.target.src;
        lb.style.display = 'flex';
        updateExif(e.target);
    }
});

lb.onclick = () => { lb.style.display = 'none'; exifBox.style.display = 'none'; };
window.onhashchange = navigate;
window.onload = navigate;