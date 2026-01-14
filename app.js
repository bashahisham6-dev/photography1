const app = document.getElementById('app');

const playlist = [
    { title: "Hip Shop", src: "music/Hip Shop.mp3" },
    { title: "After Hours", src: "music/After Hours.mp3" },
    { title: "Closing Time", src: "music/Closing Time.mp3" },
    { title: "Take Care", src: "music/Take Care.mp3" }
];
let currentSongIndex = 0;
const audio = new Audio(playlist[currentSongIndex].src);
audio.loop = true;

const lb = document.createElement('div');
lb.id = 'lightbox';
lb.innerHTML = '<img src="" id="lb-img">';
document.body.appendChild(lb);
const lbImg = document.getElementById('lb-img');

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
            <p>Welcome to my photography portfolio! It was built in HTML, Javascript and CSS by me! Use the arrow keys on your keyboard to scroll around. Click the image you want to view in fullscreen, and click your mouse anywhere thats not on the image to stop viewing.</p>
            
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
    p1: `<div class="embed-container"><iframe src="https://docs.google.com/presentation/d/1RmTM2ENW69BJVClTs9nfXgqPF-HGVP1QNny_K08Zd2M/embed?start=true&loop=false&delayms=3000" frameborder="0" width="100%" height="100%" allowfullscreen></iframe></div>`,
    p2: `<div class="embed-container"><iframe src="https://docs.google.com/presentation/d/1vWq9nL59OlkmV5P9IU8l4qfFaSRzVidDIj9KgspEXrI/embed?start=true&loop=false&delayms=3000" frameborder="0" width="100%" height="100%" allowfullscreen></iframe></div>`
};

function changeSong(dir) {
    currentSongIndex = (currentSongIndex + dir + playlist.length) % playlist.length;
    const wasPlaying = !audio.paused;
    audio.src = playlist[currentSongIndex].src;
    document.getElementById('song-title').innerText = playlist[currentSongIndex].title;
    if (wasPlaying) audio.play();
    updatePlayBtn();
}

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

    slider.addEventListener('input', (e) => {
        audio.volume = e.target.value;
        audio.muted = false;
        muteBtn.innerText = "Mute";
    });

    playBtn.addEventListener('click', () => {
        if (audio.paused) audio.play();
        else audio.pause();
        updatePlayBtn();
    });

    muteBtn.addEventListener('click', () => {
        audio.muted = !audio.muted;
        muteBtn.innerText = audio.muted ? "Unmute" : "Mute";
    });

    document.addEventListener('click', () => {
        if(audio.paused && audio.currentTime === 0) {
            audio.play().then(updatePlayBtn);
        }
    }, { once: true });
}

let posX = 0; 
let posY = 0;
const moveSpeed = 15;
const keysPressed = {};

window.addEventListener('keydown', (e) => { keysPressed[e.key] = true; });
window.addEventListener('keyup', (e) => { keysPressed[e.key] = false; });

function updatePosition() {
    if (lb.style.display === 'flex') {
        requestAnimationFrame(updatePosition);
        return;
    }
    const totalH = app.scrollHeight;
    const totalW = app.scrollWidth;
    const winH = window.innerHeight;
    const winW = window.innerWidth;
    const minX = -(totalW - winW);
    const minY = -(totalH - winH);

    if (keysPressed['ArrowRight']) posX -= moveSpeed;
    if (keysPressed['ArrowLeft'])  posX += moveSpeed;
    if (keysPressed['ArrowDown'])  posY -= moveSpeed;
    if (keysPressed['ArrowUp'])    posY += moveSpeed;

    if (posX > 0) posX = 0;
    if (posX < minX) posX = minX;
    if (posY > 0) posY = 0;
    if (posY < minY) posY = minY;

    app.style.transform = `translate(${posX}px, ${posY}px)`;
    requestAnimationFrame(updatePosition);
}
requestAnimationFrame(updatePosition);

function generateGallery(id) {
    const p = projectData[id];
    if (!p) return routes.home;
    const gridClass = p.count <= 2 ? 'grid static-grid' : 'grid';
    let html = `<div class="${gridClass}">`;
    for (let i = 1; i <= p.count; i++) {
        const folder = encodeURIComponent(p.name);
        html += `<img src="${folder}/${i}.jpg" onerror="this.onerror=function(){this.src='${folder}/${i}.png'};this.src='${folder}/${i}.jpg'">`;
    }
    return html + '</div>';
}

function navigate() {
    const link = window.location.hash.replace('#', '') || 'home';
    app.innerHTML = (routes[link]) ? routes[link] : generateGallery(link);
    if (link === 'home') initMusicUI();
    posX = 0; 
    posY = 0;
    app.style.transform = `translate(0px, 0px)`;
}

app.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG' && !e.target.closest('#lightbox')) {
        lbImg.src = e.target.src;
        lb.style.display = 'flex';
    }
});

lb.addEventListener('click', () => lb.style.display = 'none');
window.addEventListener('hashchange', navigate);
window.addEventListener('load', navigate);
document.querySelectorAll('nav a').forEach(a => a.href = `#${a.getAttribute('data-link')}`);