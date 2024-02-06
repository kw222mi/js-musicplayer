const musicArray = [
  {
    artist: "Boys, Girls, Toys & Words",
    song: "Modern Pitch",
    album: "Eye Of The Storm",
    picture: "assets/Boys,_Girls,_Toys_&_Words_-_Modern_Pitch.jpg ",
    play: "assets/Boys,_Girls,_Toys_&_Words_-_Modern_Pitch.mp3",
  },

  {
    artist: "Higher and Higher",
    song: "Scream Inc.",
    album: "Inception",
    picture: "assets/Higher_And_Higher_-_Scream_Inc._(3).jpg",
    play: "assets/Higher_And_Higher_-_Scream_Inc._(3).mp3",
  },

  {
    artist: "Not My Problem",
    song: "All My Friends Hate Me",
    album: "",
    picture: "assets/Not_My_Problem_-_All_My_Friends_Hate_Me.jpg",
    play: "assets/Not_My_Problem_-_All_My_Friends_Hate_Me.mp3",
  },

  {
    artist: "Old News",
    song: "Hot Fiction",
    album: "",
    picture: "assets/Old_News_-_Hot_Fiction.jpg",
    play: "assets/Old_News_-_Hot_Fiction.mp3",
  },

  {
    artist: "Peyote",
    song: "Kinematic",
    album: "Kites",
    picture: "assets/Peyote_-_Kinematic.jpg",
    play: "assets/Peyote_-_Kinematic.mp3",
  },

  {
    artist: "Say Goodbye",
    song: "VITNE",
    album: "Jupiter",
    picture: "assets/Say_Goodbye_-_VITNE.jpg",
    play: "assets/Say_Goodbye_-_VITNE.mp3",
  },
];

const audioPlayer = document.getElementById("music-player");
const playlist = document.getElementById("playlistholder");
let currentSongIndex = 0;
let isShuffleMode = false;
let currentSong = musicArray[currentSongIndex];
let isLoopMode = false;
let playlistRestarted = false;

const playButton = document.getElementById("playbtn");
const nextButton = document.getElementById("nextbtn");
const prevButton = document.getElementById("prevbtn");
const shuffleButton = document.getElementById("shufflebtn");

const progressBar = document.getElementById("progress-bar");
const volumeSlider = document.getElementById("volume-slider");
const loopButton = document.getElementById("loopbtn");

let currentPlaybackPosition = 0;

/*------- Event listeners ---------*/
loopButton.addEventListener("click", () => {
  isLoopMode = !isLoopMode;
  loopButton.classList.toggle("active", isLoopMode);
});

volumeSlider.addEventListener("input", () => {
  const volumeValue = parseFloat(volumeSlider.value);
  audio.volume = volumeValue;
});

playButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playButton.innerHTML = `<span class="material-symbols-outlined">pause</span>`;
  } else {
    audio.pause();
    playButton.innerHTML = `<span class="material-symbols-outlined">play_arrow</span>`;
  }
});

nextButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % musicArray.length;
  const nextSong = musicArray[currentSongIndex];
  renderAudioPlayer(nextSong);
});

prevButton.addEventListener("click", () => {
  currentSongIndex =
    (currentSongIndex - 1 + musicArray.length) % musicArray.length;
  const prevSong = musicArray[currentSongIndex];
  renderAudioPlayer(prevSong);
});

shuffleButton.addEventListener("click", () => {
  isShuffleMode = !isShuffleMode;
  if (isShuffleMode) {
    // If shuffle, randomise the playlist and update UI
    shufflePlaylist();
    renderPlaylist();
  }
});

function shufflePlaylist() {
  for (let i = musicArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [musicArray[i], musicArray[j]] = [musicArray[j], musicArray[i]];
  }
}

progressBar.addEventListener("input", () => {
  const seekTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

/*---------- Functions ----------*/
function renderPlaylist() {
  playlist.innerHTML = "";
  musicArray.forEach((music, index) => {
    let newListItem = createPlaylistItem(music, index);
    playlist.appendChild(newListItem);

    // Update UI to mark shuffle
    if (isShuffleMode) {
      newListItem.classList.add("shuffle-mode");
    } else {
      newListItem.classList.remove("shuffle-mode");
    }
  });
}

function createPlaylistItem(music, index) {
  let listItem = document.createElement("li");
  listItem.classList.add("playlist-item");
  listItem.setAttribute("data-index", index);

  listItem.innerHTML = `
        <div class='listitem'>
        <img src=${music.picture} class='album-icon'>
        <div class='music-info-div'>
        <span class='artist-text'>${music.artist}</span>
        <span class='song-text'>${music.song}</span>
        </div>
        </div>
      `;

  listItem.addEventListener("click", () => {
    handleSongClick(index);
  });

  return listItem;
}

function handleSongClick(index) {
  const audio = document.getElementById("audio");
  console.log(audio);

  if (!audio) {
    // if there is no song, load and play the song
    currentSongIndex = index;
    const currentSong = musicArray[index];
    renderAudioPlayer(currentSong);
    audio.play();
  } else if (currentSongIndex === index) {
    console.log(audio.currentTime);

    if (audio.currentTime === 0) {
      // If the song is at 0 start the song
      audio.play();
      playButton.innerHTML = `<span class="material-symbols-outlined">pause</span>`;
    } else if (audio.paused) {
      // If the song is paused -> play
      audio.play();
      playButton.innerHTML = `<span class="material-symbols-outlined">pause</span>`;
    } else {
      // If the song is playing -> pause
      audio.pause();
      playButton.innerHTML = `<span class="material-symbols-outlined">play_arrow</span>`;
    }
  } else {
    // If another song is clicked, change song
    audio.pause();
    const pbtn = document.getElementById("playbtn");
    pbtn.innerHTML = `<span class="material-symbols-outlined">play_arrow</span>`;
    currentSongIndex = index;
    const newSong = musicArray[currentSongIndex];
    renderAudioPlayer(newSong);
  }
}

function renderAudioPlayer(currentSong) {
  let musicInfo = document.getElementById("music-playing-div");
  musicInfo.innerHTML = "";

  // Clear the eventlisteners

  musicInfo.innerHTML = `
        <div class='player-img-div'>
      <img class='player-img' src=${currentSong.picture}>
    </div>
    
    <div class='music-info-div'>
      <span class='artist-text'>${currentSong.artist}</span>
      <span class='song-text'>${currentSong.song}</span>
      <audio id="audio" autoplay>
        <source src=${currentSong.play} type="audio/mp3">
        Din webbläsare stödjer inte ljudet.
      </audio>
    </div>
      `;

  playButton.innerHTML = `<span class="material-symbols-outlined">pause</span>`; // Uppdatera playButton korrekt

  const audio = document.getElementById("audio");

  // Put the volume down
  audio.volume = 0.1;
  volumeSlider.value = audio.volume;

  audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
  });

  audio.addEventListener("ended", () => {
    currentSongIndex = (currentSongIndex + 1) % musicArray.length;

    if (currentSongIndex === 0 && isLoopMode) {
      // Restart the playlist
      if (!playlistRestarted) {
        playlistRestarted = true;
        renderPlaylist();
      }
    } else {
      playlistRestarted = false;
    }
    const nextSong = musicArray[currentSongIndex];
    renderAudioPlayer(nextSong);
  });
}

renderPlaylist();
