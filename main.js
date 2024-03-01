const progress = document.getElementById('progress');
const song = document.getElementById('song');
const controlIcon = document.getElementById('controlIcon');
const playPauseButton = document.querySelector('.play-pause-btn');
const forwardButton = document.querySelector('.controls button.forward');
const backwardButton = document.querySelector('.controls button.backward');
const songName = document.querySelector('.music-player h1');
const artistName = document.querySelector('.music-player p');
const randomButton = document.querySelector('.random-track');
const volumeSlider = document.querySelector('.volume-slider');
const seekSlider = document.querySelector('.seek-slider');
const repeatButton = document.querySelector('.repeat-track');

const songs = [
  {
    title: 'JUJALARIM FUNK',
    name: 'Eternxlkz',
    source: 'sound/Eternxlkz - JUJALARIM FUNK (Official Audio).mp3',
    duration: 208, // Şarkının süresi (saniye cinsinden)
  },
  {
    title: 'Heavy Duty',
    name: 'Judas Priest',
    source: 'sound/Judas Priest - Heavy Duty (Official Audio).mp3',
    duration: 208, // Şarkının süresi (saniye cinsinden)
  },
  {
    title: 'Sonne X slowed',
    name: 'Rammstein',
    source: 'sound/Rammstein -Sonne X slowed.mp3',
    duration: 208, // Şarkının süresi (saniye cinsinden)
  },
  {
    title: 'Sleepwalker X Slowed',
    name: 'Akiaura',
    source: 'sound/Akiaura - Sleepwalker X Slowed.mp3',
    duration: 208, // Şarkının süresi (saniye cinsinden)
  },
  {
    title: 'End Of Line',
    name: 'Daft Punk',
    source: 'sound/Daft Punk - End Of Line (TikTok Slowed Version).mp3',
    duration: 208, // Şarkının süresi (saniye cinsinden)
  },
  {
    title: 'Feeding Frenzy',
    name: 'Jackal',
    source: 'sound/Jackal - Feeding Frenzy.mp3',
    duration: 208, // Şarkının süresi (saniye cinsinden)
  },
  {
    title: 'My Own Summer',
    name: 'Deftones',
    source: 'sound/My Own Summer.mp3',
    duration: 208, // Şarkının süresi (saniye cinsinden)
  },
  {
    title: 'Painkiller',
    name: 'Judas Priest',
    source: 'sound/Judas Priest - Painkiller (Official Lyric Video).mp3',
    duration: 208, // Şarkının süresi (saniye cinsinden)
  },
];

//! Updating song info
let isRepeat = false;
let currentSongIndex = 3;

function updateSongInfo() {
  songName.textContent = songs[currentSongIndex].title;
  artistName.textContent = songs[currentSongIndex].name;
  song.src = songs[currentSongIndex].source;

  song.addEventListener('loadeddata', function () {
    //! Don't need to do anything here, the purpose is to ensure the event listener is added once
  });
}

// Şarkının dakikasını göstermek için
song.addEventListener('timeupdate', function () {
  const currentTime = song.currentTime; // Şarkının geçerli süresini al
  const minutes = Math.floor(currentTime / 60); // Şarkının dakikasını hesapla
  const seconds = Math.floor(currentTime % 60); // Şarkının kalan saniyelerini hesapla
  const formattedTime = minutes + ':' + (seconds < 10 ? '0' : '') + seconds; // Biçimlendirilmiş süre oluştur
  // Biçimlendirilmiş süreyi uygun bir elemente ekle
  document.querySelector('.current-time').textContent = formattedTime;
});

//! Duration and current time of the song for the progress bar

song.addEventListener('loadedmetadata', function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
});

//! Function to pause the music and updating icons

function pauseSong() {
  song.pause();
  controlIcon.classList.remove('fa-pause');
  controlIcon.classList.add('fa-play');
}

//! Function to play the music and updating icons

function playSong() {
  song.play();
  controlIcon.classList.add('fa-pause');
  controlIcon.classList.remove('fa-play');
}

//! Function to play or pause the music

function playPause() {
  if (song.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

playPauseButton.addEventListener('click', playPause);

//! Jumping to the desired time of the song by clicking the progress bar

// Volume slider ile şarkının sesini ayarlama
volumeSlider.addEventListener('input', function () {
  song.volume = volumeSlider.value / 100;
});

// Seek slider ile şarkının ilerlemesini ayarlama
seekSlider.addEventListener('input', function () {
  song.currentTime = seekSlider.value;
});

progress.addEventListener('input', function () {
  song.currentTime = progress.value;
});

//! When the song is still paused, if you click the progress bar, the song keeps playing

progress.addEventListener('change', function () {
  playSong();
});

//! Next song

forwardButton.addEventListener('click', function () {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  playPause();
});

//! Previous song

backwardButton.addEventListener('click', function () {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateSongInfo();
  playPause();
});

randomButton.addEventListener('click', function () {
  // Şarkıları karışık bir şekilde çalmak için rastgele bir şarkı seçiyoruz
  const randomIndex = Math.floor(Math.random() * songs.length);
  currentSongIndex = randomIndex;
  updateSongInfo();
  playSong();
});

repeatButton.addEventListener('click', function () {
  isRepeat = !isRepeat; // Tekrar modunu tersine çeviriyoruz
  if (isRepeat) {
    song.currentTime = 0; // Şarkıyı başa sar
    seekSlider.value = 0; // Seek slider'ını sıfırla
  }
});

updateSongInfo();

var swiper = new Swiper('.swiper', {
  loop: true,
  effect: 'coverflow',
  centeredSlides: true,
  initialSlide: 3,
  slidesPerView: 'auto',
  allowTouchMove: false,
  spaceBetween: 40,
  coverflowEffect: {
    rotate: 25,
    stretch: 0,
    depth: 50,
    modifier: 1,
    slideShadows: false,
  },
  navigation: {
    nextEl: '.forward',
    prevEl: '.backward',
    randomEl: '.random-track',
  },
});
