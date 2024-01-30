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
let currentSong = musicArray[currentSongIndex]

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
  currentSongIndex = index;
  const currentSong = musicArray[index];
   renderAudioPlayer(currentSong);
}


function renderAudioPlayer(currentSong) {
    // If any player added remove it and the eventlisteners
     if (audioPlayer.hasChildNodes()) {
       audioPlayer.removeChild(audioPlayer.firstChild);
     }

  audioPlayer.innerHTML = `
        <div class='player-img-div'>
        <img class='player-img' src=${currentSong.picture}>
        </div>

        <div>
        <span>${currentSong.artist}</span>
        <span>${currentSong.song}</span>
        <audio id="audio">
          <source src=${currentSong.play} type="audio/mp3">
          Din webbläsare stödjer inte ljudet.
        </audio>
        </div>

        <div class='button-container'>
        <button class='button' id='prevbtn'><span class="material-symbols-outlined">arrow_back_ios</span></button>
        <button class='button' id='playbtn'><span class="material-symbols-outlined">play_arrow</span></button>
        <button class='button' id='nextbtn'><span class="material-symbols-outlined">arrow_forward_ios</span></button>
         </div>
         
        <button class='button' id='shufflebtn'><span class="material-symbols-outlined">shuffle</span></button>
        <button class='button' id='loopbtn'><span class="material-symbols-outlined">repeat</span></button>
       
        <div id="volume-container">

        <label for="volume-slider">Volym:</label>
        <input type="range" id="volume-slider" min="0" max="1" step="0.1" value="1">
        </div>

        <div id="progress-container">
          <input type="range" id="progress-bar" value="0">
        </div>
      `;
    

  const playButton = document.getElementById("playbtn");
  const nextButton = document.getElementById("nextbtn");
  const prevButton = document.getElementById("prevbtn");
  const shuffleButton = document.getElementById("shufflebtn");
  const audio = document.getElementById("audio");
  const progressBar = document.getElementById("progress-bar");
  const volumeSlider = document.getElementById("volume-slider");
  

  volumeSlider.addEventListener("input", () => {
    const volumeValue = parseFloat(volumeSlider.value);
    audio.volume = volumeValue;
  });

  playButton.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playButton.textContent = "Pause";
    } else {
      audio.pause();
      playButton.textContent = "Play";
    }
  });

  nextButton.addEventListener("click", () => {
     currentSongIndex = (currentSongIndex + 1) % musicArray.length;
     const nextSong = musicArray[currentSongIndex];
     renderAudioPlayer(nextSong);
  })

  prevButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + musicArray.length) % musicArray.length;
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

  audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
  });

  progressBar.addEventListener("input", () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
  });

  audio.addEventListener("ended", () => {
    currentSongIndex = (currentSongIndex + 1) % musicArray.length;
    // if currentSongIndex = 0 && loop
    const nextSong = musicArray[currentSongIndex];
    renderAudioPlayer(nextSong);
  });

}
 // By clicking on a song that is being played, that song should be paused and the UI should reflect that.
 // fix loop button

renderPlaylist();
