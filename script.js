const music = document.querySelector('audio');
const image = document.querySelector('img');
const playButton = document.getElementById('play');

const title = document.getElementById('title');
const artist_name = document.getElementById('artist-name');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let progress = document.getElementById('progress');
let total_duration = document.getElementById('duration');
let current_time = document.getElementById('current-time');

const progress_div = document.getElementById('progress-div');
let isPlaying = false;
const songs = [
    {
        name: 'Adheeraa',
        title: 'adheeraa',
        artist_name: 'Vagu mazan'
    },
    {
        name: 'Harleys In Hawaii',
        title: 'Harleys In Hawaii',
        artist_name: 'Katy perry'
    },
    {
        name: 'Lokiverse',
        title: 'Lokiverse',
        artist_name: 'Anirudh ravichander'
    },
    {
        name: 'Veera Soora',
        title: 'Veera Soora',
        artist_name: 'yuvan shankar raja'
    },
    {
        name: 'Let Me Down',
        title: 'Let Me Down',
        artist_name: 'Alec benjamin'
    }
];

const playMusic = () => {
    isPlaying = true;
    music.play();
    playButton.classList.replace('fa-play', 'fa-pause');
    image.classList.add('rotate');
}
const pauseMusic = () => {
    isPlaying = false;
    music.pause();
    playButton.classList.replace('fa-pause', 'fa-play');
    image.classList.remove('rotate');
}

playButton.addEventListener('click', () => {
    if (isPlaying) {
        pauseMusic();
    }
    else {
        playMusic();
    }
    // Ternary operator
    // isPlaying ? pauseMusic() : playMusic();
})

const loadSong = (songs) => {
    title.textContent = songs.title;
    artist_name.textContent = songs.artist_name;
    music.src = "music/" + songs.name + ".mp3";
    image.src = "images/" + songs.name + ".jpg";
}
songIndex = 0;
// loadSong(songs[4]);
const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
}
const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
}

next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);

music.addEventListener("timeupdate", (event) => {
    // console.log(event);
    // console.log(currentTime);
    // console.log(duration);
    const { currentTime, duration } = event.srcElement;
    let progress_time = (currentTime / duration) * 100;
    progress.style.width = `${progress_time}%`;

    // duration time
    let minute_dur = Math.floor(duration / 60);
    let seconds_dur = Math.floor(duration % 60);
    if (minute_dur < 10) {
        minute_dur = `0${minute_dur}`
    }
    let total_dur = `${minute_dur}:${seconds_dur}`;
    if (duration) {
        total_duration.textContent = `${total_dur}`;
        // total_duration.textContent = total_dur;
    }

    // current duration time
    let minute_curr = Math.floor(currentTime / 60);
    let seconds_curr = Math.floor(currentTime % 60);
    if (minute_curr < 10) {
        minute_curr = `0${minute_curr}`;
    }
    if (seconds_curr < 10) {
        seconds_curr = `0${seconds_curr}`;
    }
    let total_curr = `${minute_curr}:${seconds_curr}`;
    current_time.textContent = `${total_curr}`;

    if (total_curr == total_dur) {
        nextSong();
    }
    // music.addEventListener('ended',nextSong);
});

// progress onclick 
progress_div.addEventListener('click', (event) => {
    const { duration } = music;
    let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;

    music.currentTime = move_progress;
});
