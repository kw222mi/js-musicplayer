const musicArray = [
    {
        artist: 'Boys, Girls, Toys & Words',
        song:'Modern Pitch',
        album: 'Eye Of The Storm',
        picture:'assets/Boys,_Girls,_Toys_&_Words_-_Modern_Pitch.jpg ',
        play:'assets/Boys,_Girls,_Toys_&_Words_-_Modern_Pitch.mp3'
    },

    {
        artist: 'Higher and Higher',
        song: 'Scream Inc.',
        album: 'Inception',
        picture: 'assets/Higher_And_Higher_-_Scream_Inc._(3).jpg'
    },

    {
        artist: 'Not My Problem',
        song: 'All My Friends Hate Me',
        album:'',
        picture: 'assets/Not_My_Problem_-_All_My_Friends_Hate_Me.jpg'
    },

    {
        artist: 'Old News',
        song: 'Hot Fiction',
        album: '',
        picture: 'assets/Old_News_-_Hot_Fiction.jpg'
    },

    {
        artist: 'Peyote',
        song: 'Kinematic',
        album: 'Kites',
        picture:'assets/Peyote_-_Kinematic.jpg'
    },

    {
        artist: 'Say Goodbye',
        song: 'VITNE',
        album: 'Jupiter',
        picture: 'assets/Say_Goodbye_-_VITNE.jpg'
    }
]


function renderPlaylist() {
  const playlist = document.getElementById("playlistholder");
  playlist.innerHTML = "";

  musicArray.forEach((music, index) => {
    let newListItem = createPlaylistItem(music, index);
    newListItem.addEventListener('click', handleClick)
    
    playlist.appendChild(newListItem);

  });
}

function createPlaylistItem(music, index) {
  let listItem = document.createElement("li");
  listItem.classList.add("playlist-item");

  listItem.innerHTML = `
  <img src=${music.picture} class='album-icon'>
    <span class='artist-text'>${music.artist}</span>
    <span class='song-text'>${music.song}</span>
  `;

  return listItem;
}


function handleClick (event) {
    console.log(event.target)
    const playlist2 = document.getElementById("playlistholder");
    let playsong = document.createElement('div')


    playsong.innerHTML = `
      <img src = ${musicArray[0].picture}>
    <audio controls>
      <source src=${musicArray[0].play}/>
    </audio>
    `;

    playlist2.appendChild(playsong)
}

renderPlaylist();







