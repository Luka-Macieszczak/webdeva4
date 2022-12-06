let playlist = []
let displayedSongs = []


const moveUp = (btnID) => {
  let btnNum = +btnID.slice(1, btnID.length)
  console.log(btnNum)
  for(let i=0;i<playlist.length;i++){
    if(i>0 && playlist[i].id == btnNum) {
      let tmp = playlist[i]
      let tmpID = playlist[i].id
      // Swap ids so they remain increasing
      playlist[i].id = playlist[i-1].id
      playlist[i-1].id = tmpID
      // Swap spots
      playlist[i] = playlist[i-1]
      playlist[i-1] = tmp
    }
  }

  let tmpList = []
  let playlistTable = document.getElementById('playlist-table')
  playlistTable.innerHTML = ``
  for(const song of playlist){
    console.log(song)
    playlistTable.innerHTML += `
    <tr id="playlistrow${song.id}">
      <td>
        <button id="u${song.id}" onClick="moveDown(this.id)">Down</button>
        <button id="d${song.id}" onClick="moveUp(this.id)">Up</button>
        <button id="p${song.id}" onClick="removeFromPlaylist(this.id)">-</button>
      </td>
      <td>${song.data.trackName}</td>
      <td>${song.data.artistName}</td>
      <td><img src="${song.data.artworkUrl30}"/></td>
    </tr>
    `
    tmpList.push({id: song.id, data: song.data})
    

  }
  playlist = tmpList
}

const moveDown = (btnID) => {
  let btnNum = +btnID.slice(1, btnID.length)
  console.log(btnNum)
  for(let i=0;i<playlist.length;i++){
    if(i<playlist.length-1 && playlist[i].id == btnNum) {
      let tmp = playlist[i]
      let tmpID = playlist[i].id
      // Swap ids so they remain increasing
      playlist[i].id = playlist[i+1].id
      playlist[i+1].id = tmpID
      // Swap spots
      playlist[i] = playlist[i+1]
      playlist[i+1] = tmp
    }
  }

  let tmpList = []
  let playlistTable = document.getElementById('playlist-table')
  playlistTable.innerHTML = ``
  for(const song of playlist){
    console.log(song)
    playlistTable.innerHTML += `
    <tr id="playlistrow${song.id}">
      <td>
        <button id="u${song.id}" onClick="moveDown(this.id)">Down</button>
        <button id="d${song.id}" onClick="moveUp(this.id)">Up</button>
        <button id="p${song.id}" onClick="removeFromPlaylist(this.id)">-</button>
      </td>
      <td>${song.data.trackName}</td>
      <td>${song.data.artistName}</td>
      <td><img src="${song.data.artworkUrl30}"/></td>
    </tr>
    `
    tmpList.push({id: song.id, data: song.data})
    

  }
  playlist = tmpList
}

const removeFromPlaylist = (btnID) => {
  btnID = btnID.slice(1, btnID.length)
  let btnNum = +btnID
  console.log(btnID)
  let tmp = []
  let playlistTable = document.getElementById('playlist-table')
  playlistTable.innerHTML = ``
  for(const song of playlist){
    console.log(song)
    if(song.id !== btnNum){
      playlistTable.innerHTML += `
      <tr id="playlistrow${song.id}">
        <td>
          <button id="u${song.id}" onClick="moveDown(this.id)">Down</button>
          <button id="d${song.id}" onClick="moveUp(this.id)">Up</button>
          <button id="p${song.id}" onClick="removeFromPlaylist(this.id)">-</button>
        </td>
        <td>${song.data.trackName}</td>
        <td>${song.data.artistName}</td>
        <td><img src="${song.data.artworkUrl30}"/></td>
      </tr>
      `
      tmp.push({id: song.id, data: song.data})
    }
    
  }

  playlist = tmp
  console.log(playlist)
}

const addToPlaylist = (btnID) => {
  const btnNum = +btnID;
  let playlistTable = document.getElementById('playlist-table')
  
  let id = playlist.length > 0 ? playlist[playlist.length-1].id + 1: 0;
  for(const song of displayedSongs) {
    if(song.id == btnNum){
      playlistTable.innerHTML += `
      <tr id="playlistrow${id}">
        <td>
          <button id="u${id}" onClick="moveDown(this.id)">Down</button>
          <button id="d${id}" onClick="moveUp(this.id)">Up</button>
          <button id="p${id}" onClick="removeFromPlaylist(this.id)">-</button>
        </td>
        <td>${song.data.trackName}</td>
        <td>${song.data.artistName}</td>
        <td><img src="${song.data.artworkUrl30}"/></td>
      </tr>
      `
      playlist.push({id: id, data: song.data})
    }
  }
  
}

const addToDisplay = (data) => {
  // Reset displayed songs
  displayedSongs = []

  // Reset table contents
  let songTable = document.getElementById('songinfo')
  songTable.innerHTML = ``
  let count = 0
  for(const val of data){
    songTable.innerHTML += `
      <tr id="row${count}">
        <td>
          <button id="${count}" onClick="addToPlaylist(this.id)">+</button>
        </td>
        <td>${val.trackName}</td>
        <td>${val.artistName}</td>
        <td><img src="${val.artworkUrl30}"/></td>
      </tr>
    `

    displayedSongs.push({data: val, id: count})
    count ++;
  }
  console.log(displayedSongs)
}

function getSongs() {

    let songName = document.getElementById('song').value
    if(songName === '') {
        return alert('Please enter a song')
    }

    let songDiv = document.getElementById('songname')
    songDiv.innerHTML = ''

    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      console.log(xhr.responseText)
        if (xhr.readyState == 4 && xhr.status == 200) {
            let response = JSON.parse(xhr.responseText)
      console.log(response)
          addToDisplay(response.results)
      
        }
        songDiv.innerHTML = `Songs matching: ${songName}`
    }
    xhr.open('GET', `/song?title=${songName}`, true)
    //xhr.open('GET', `/weather`, true)
    xhr.send()
}



const ENTER=13

function handleKeyUp(event) {
event.preventDefault()
   if (event.keyCode === ENTER) {
      document.getElementById("submit_button").click()
  }
}


document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('submit_button').addEventListener('click', getSongs)

  //add key handler for the document as a whole, not separate elements.
  document.addEventListener('keyup', handleKeyUp)

})
