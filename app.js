const app = document.getElementById('app');

// --- MUSIC CONFIG ---
const playlist = [
    { title: "Hip Shop", src: "music/Hip Shop.mp3" },
    { title: "After Hours", src: "music/After Hours.mp3" },
    { title: "Closing Time", src: "music/Closing Time.mp3" },
    { title: "Take Care", src: "music/Take Care.mp3" }
];
let currentSongIndex = 0;
const audio = new Audio(playlist[currentSongIndex].src);
audio.loop = true;

// --- LIGHTBOX SETUP ---
const lb = document.createElement('div');
lb.id = 'lightbox';
lb.innerHTML = `
    <div class="lb-content">
        <img src="" id="lb-img">
        <div id="lb-caption"></div>
    </div>
`;
document.body.appendChild(lb);
const lbImg = document.getElementById('lb-img');
const lbCaption = document.getElementById('lb-caption');

const projectData = {
    p3: {
        name: "Things Organized Neatly",
        images: [
            { file: "1.webp", title: "Orange-ish" },
            { file: "2.webp", title: "Orange-est" },
            { file: "3.webp", title: "Orange-less" }
        ]
    },
    p4: {
        name: "Light Painting",
        images: [
            { file: "1.webp", title: "Hi!" },
            { file: "2.webp", title: "Hand" },
            { file: "3.webp", title: "Lightning Bolt" }
        ]
    },
    p5: {
        name: "Mixed Fruit",
        images: [
            { file: "1.webp", title: "Melonnut" },
            { file: "2.webp", title: "Kiwimato" },
            { file: "3.webp", title: "Applemelon" }
        ]
    },
    p6: {
        name: "Cloning",
        images: [
            { file: "1.webp", title: "Why is he hanging out of the sunroof?" },
            { file: "2.webp", title: "why he sleeping?" },
            { file: "3.webp", title: "Family Photo" }
        ]
    },
    p7: {
        name: "Face Slide Effect",
        images: [
            { file: "1.webp", title: "Kris" },
            { file: "2.webp", title: "V1" },
            { file: "3.webp", title: "The GOAT" },
        ]
    },
    p8: {
        name: "Selective Color",
        images: [
            { file: "1.webp", title: "Me In The Space Needle" },
            { file: "2.webp", title: "Gravity? Who needs it?!" },
            { file: "3.webp", title: "Me At Sunrise Point, Washington" },
            { file: "4.webp", title: "Also Me At Sunrise Point, Washington" },
            { file: "5.webp", title: "Des Moines Beach, Washington" },
            { file: "6.webp", title: "Sunrise Point Visitor Center, Washington" },
            { file: "7.webp", title: "Views From The Space Needle" },
        ]
    },
    p9: {
        name: "Double Exposure",
        images: [
            { file: "1.webp", title: "The Space Needle In Me" },
            { file: "2.webp", title: "Mount Rainier National Park In Me" },
            { file: "3.webp", title: "Sunrise Point, Washington At Me" }
        ]
    },
    p10: {
        name: "Mandalas",
        images: [
            { file: "1.webp", title: "Part 63117338709" },
            { file: "2.webp", title: "Sunset Mandala" },
            { file: "3.webp", title: "Sunset Mandala^2" },
            { file: "4.webp", title: "Sunset Mandala^4" }
        ]
    },
    p11: {
        name: "Double Color Exposure",
        images: [
            { file: "1.webp", title: "Sonic, Hedgehog." },
            { file: "2.webp", title: "the little rodent formally designated as 'my sister', apologies that you had to see this train wreck of a person" }
        ]
    },
    p12: {
        name: "All About Me Collage",
        images: [
            { file: "1.webp", title: "Awesome Collage!!" }
        ]
    },
    p13: {
        name: "Animated GIF",
        images: [
            { file: "1.gif", title: "me under the slightest bit of pressure:" }
        ]
    }
};

const routes = {
    home: `<div class="home-content">
            <h1>PHOTOGRAPHY PORTFOLIO</h1>
            <h2>By Hisham Basha</h2>
            <p>Welcome to my photography portfolio! It was built in HTML, Javascript and CSS by me!  Use arrow keys on your keyboard or swipe if you are on mobile to explore. Click or tap on an image for fullscreen. Before you begin looking around, please click or tap anywhere.</p>
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
    p2: `<div class="embed-container"><iframe src="https://docs.google.com/presentation/d/1vWq9nL59OlkmV5P9IU8l4qfFaSRzVidDIj9KgspEXrI/embed?start=true&loop=false&delayms=3000" frameborder="0" width="100%" height="100%" allowfullscreen></iframe></div>`,
about: `<div class="home-content">
    <h2>ABOUT ME</h2>
<p> Hello, and welcome to my photography portfolio! </p>
<p> Here is where all the photos I took in my freshman year photography class are stored. </p>
<p> I personally started my photography journey in the Emerald City of Seattle, where I took a whopping 160 photos in the span of 6 days. They were... not the best, I must say. </p>
<p> Before freshman year started, I was presented with a list of classes I could take.</p>
<p> I chose Photography 1 from that list, and I learned of so many photography techniques such as the Dutch Tilt, Framing and how to properly edit an image that actively improve my photo-taking in daily life.</p>
<p> Here's a photo of me! </p>
    
    <img 
        src="image_2026-01-21_194422322.heic" 
        alt="Photo of Hisham Basha"
        class="about-img"
        loading="lazy"
    >

</div>`};

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
    slider.oninput = (e) => { audio.volume = e.target.value; audio.muted = false; muteBtn.innerText = "Mute"; };
    playBtn.onclick = () => { audio.paused ? audio.play() : audio.pause(); updatePlayBtn(); };
    muteBtn.onclick = () => { audio.muted = !audio.muted; muteBtn.innerText = audio.muted ? "Unmute" : "Mute"; };
}

let posX = 0, posY = 0;
const moveSpeed = 15;
const keysPressed = {};

window.addEventListener('keydown', (e) => { keysPressed[e.key] = true; });
window.addEventListener('keyup', (e) => { keysPressed[e.key] = false; });

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

function generateGallery(id) {
    const p = projectData[id];
    if (!p) return routes.home;
    const gridClass = p.images.length <= 2 ? 'grid static-grid' : 'grid';
    let html = `<div class="${gridClass}">`;
    p.images.forEach(img => {
        const folder = encodeURIComponent(p.name);
        html += `<img src="${folder}/${img.file}" data-title="${img.title}" loading="lazy">`;
    });
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
        const title = e.target.getAttribute('data-title') || "Untitled";
        lbCaption.innerText = `"${title}"`; 
        lb.style.display = 'flex';
    }
});

lb.onclick = () => lb.style.display = 'none';
window.onhashchange = navigate;
window.onload = navigate;
document.querySelectorAll('nav a').forEach(a => a.href = `#${a.getAttribute('data-link')}`);
