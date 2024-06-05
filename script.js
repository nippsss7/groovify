
let currentSong;
let currentSongNumber = 0;
let firstAudio = new Audio();
let allSongs = [];

const run = async () => {
	// fetching song details ->
	const response = await fetch('./songs-detail.json');
			const result = await response.json();
			console.log(result);
			

			allSongs = result.songs
			currentSong = allSongs[currentSongNumber].song_link;
			firstAudio.src = currentSong;

			const thumbnail = document.getElementById("thumbnails");

			allSongs.forEach(element => {
				// thumbnail
				const div = document.createElement('div');
				div.setAttribute('class', 'boxes-5')

				const img = document.createElement('img');
				img.src = element.picture_url

				const title = document.createElement('h2');
				title.innerText = element.title;
				title.setAttribute('class', 'title');

				const description = document.createElement('p');
				description.setAttribute("class", "desc");
				description.innerHTML = element.singer;


				thumbnail.appendChild(div);
				div.appendChild(img);
				div.appendChild(title);
				div.appendChild(description);


				// side thumbnail
				const songsList = document.getElementById('songs-list')
				const sideDiv = document.createElement('li');

				const sideImage = document.createElement('img');
				sideImage.src = element.picture_url;

				const sideTitle = document.createElement('h2');
				sideTitle.innerText = element.title;

				const sideDesc = document.createElement('p')
				sideDesc.innerText = element.singer;

				const playBtn = document.createElement('img');
				playBtn.setAttribute('class', 'right')
				playBtn.src = "play.png";

				sideDiv.append(sideImage)
				sideDiv.append(sideTitle);
				sideDiv.append(playBtn)
				songsList.append(sideDiv);


			});


			// playing songs -> 

			// adding eventlistners -> 
			var allThumbnails = document.getElementsByClassName('boxes-5')
			var allSongList = document.querySelectorAll('#songs-list li')

			Array.from(allThumbnails).forEach((e, index) => {

				e.addEventListener('click', element => {
					console.log("clicked " + e.children[1].innerHTML);
					const clickedSong = e.children[1].innerHTML;
					playSong(index, allSongs);
					
				})

			})

			Array.from(allSongList).forEach((e, index) => {

				e.addEventListener('click', element => {
					console.log("clicked " + e.children[1].innerHTML);
					const clickedSong = e.children[1].innerHTML;
					playSong(index, allSongs);
					
				})

			})

			// song duration ->
			firstAudio.addEventListener("timeupdate", () => {
				// console.log(firstAudio.currentTime , firstAudio.duration)
				document.querySelector("#timeUpdate").innerHTML = formatTime(firstAudio.currentTime) + " / " + formatTime(firstAudio.duration);
				console.log(firstAudio.currentTime/firstAudio.duration)

				document.getElementById("circle").style.left = (firstAudio.currentTime/firstAudio.duration) * 100 + "%" ;
				document.getElementById("colorFill").style.width = (firstAudio.currentTime/firstAudio.duration) * 100 + "%";
			})

			document.getElementById("seek").addEventListener("click" , e => {
				console.log(e.offsetX, e.target.offsetWidth);

				let percent = ((e.offsetX-5)/e.target.offsetWidth) * 100;
				document.getElementById("circle").style.left = percent + "%";

				firstAudio.currentTime = (firstAudio.duration * percent)/100;
			})


}
run();

function playSong(song, allSongs){


	firstAudio.pause();
	
	currentSong = allSongs[song].song_link
	firstAudio.src = currentSong;
	firstAudio.play();

	currentSongNumber = song;
	
	document.getElementById('playerBtn').classList.remove('fa-play');
	document.getElementById('playerBtn').classList.add('fa-pause');

	updatePlayer(song, allSongs);
	
}


// pausing the song ->
function pauseSong(){

	if(firstAudio.paused){
		firstAudio.play();
		document.getElementById('playerBtn').classList.remove('fa-play');
		document.getElementById('playerBtn').classList.add('fa-pause');
	}
	else{
		firstAudio.pause();
		document.getElementById('playerBtn').classList.remove('fa-pause');
		document.getElementById('playerBtn').classList.add('fa-play');
	}

}



// next song ->
function nextSong(){
	currentSongNumber++ ;

	playSong(currentSongNumber, allSongs);
}



// previous song ->
function prevSong(){
	currentSongNumber-- ;
	
	playSong(currentSongNumber, allSongs);
}


// update player information ->
function updatePlayer(number, allsongs){

	// song name ->
	document.getElementById('song-name').innerHTML = allSongs[number].title + " - " + allsongs[number].singer;

	


}


function formatTime(totalSeconds) {
    // Round down total seconds to the nearest whole number
    const seconds = Math.floor(totalSeconds);
    
    // Calculate minutes and remaining seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Format minutes and seconds to ensure two digits
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    // Return formatted time
    return `${formattedMinutes}:${formattedSeconds}`;
}

 
  
