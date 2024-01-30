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

function renderPlaylist() {
  playlist.innerHTML = "";
  musicArray.forEach((music, index) => {
    let newListItem = createPlaylistItem(music, index);
    playlist.appendChild(newListItem);
  });
}

function createPlaylistItem(music, index) {
  let listItem = document.createElement("li");
  listItem.classList.add("playlist-item");
  listItem.setAttribute("data-index", index);

  listItem.innerHTML = `
        <img src=${music.picture} class='album-icon'>
        <span class='artist-text'>${music.artist}</span>
        <span class='song-text'>${music.song}</span>
      `;

  listItem.addEventListener("click", () => {
    handleSongClick(index);
  });

  return listItem;
}

function handleSongClick(index) {
  const currentSong = musicArray[index];
  renderAudioPlayer(currentSong);
}



function renderAudioPlayer(currentSong) {
  audioPlayer.innerHTML = `
        <img src=${currentSong.picture}>
        <audio id="audio" controls>
          <source src=${currentSong.play} type="audio/mp3">
          Din webbläsare stödjer inte ljudet.
        </audio>
        <button id='playbtn'>Play</button>
        <div id="progress-container">
          <input type="range" id="progress-bar" value="0">
        </div>
      `;

  const playButton = document.getElementById("playbtn");
  const audio = document.getElementById("audio");
  const progressBar = document.getElementById("progress-bar");

  playButton.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playButton.textContent = "Pause";
    } else {
      audio.pause();
      playButton.textContent = "Play";
    }
  });

  audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
  });

  progressBar.addEventListener("input", () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
  });

  audio.addEventListener("ended", () => {
    // Handle song ending here
    // You can implement logic for automatically playing the next song
    // based on your requirements.
  });
}


renderPlaylist();
