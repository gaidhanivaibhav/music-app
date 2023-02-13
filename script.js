console.log(" Welcome to MUSIC")

// Initializing the variables
let songIndex=0;
let audioElement=new Audio('./songs/5.mp3');
let masterplay = document.getElementById('masterplay');
let myProgressBar=document.getElementById('myProgressBar');
let gif =document.getElementById('gif');
let masterSongName=document.getElementById(' masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let  songs = [
    {songName: "Let ME live in You ", filepath:"songs/1.mp3",coverpath:"cover/1.jpg.jpg"},
    {songName: "REFLECTIONS(ORIGINAL TRAP MIX)", filepath:"songs/2.mp3",coverpath:"cover/2.jpg.jpg"},
    {songName: "Town", filepath:"songs/3.mp3",coverpath:"cover/3.jpg.jpg"},
    {songName: "Chilled Acoustic Indie Folk ", filepath:"songs/4.mp3",coverpath:"cover/4.jpg.jpg"},
    {songName: "Forest Story - acoustic ambient", filepath:"songs/5.mp3",coverpath:"cover/5.jpg.jpg"},

]


songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverpath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

// Handle Play/pause click;
masterplay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity=1;

    }
    else {
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play')
        gif.style.opacity=0
    }
})


// Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    //console.log("time update");

    // update seek bar

    progress= parseInt((audioElement.currentTime/audioElement.duration)*100);
    //console.log(progress);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime= (myProgressBar.value * audioElement.duration)/100;
})


const makeAllPlays =()=>{
   Array.from(document.getElementsByClassName('songItemplay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');

    })
}


Array.from(document.getElementsByClassName('songItemplay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        console.log(e.target);
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause')
        audioElement.src=`songs/${songIndex+1}.mp3`;
        // masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');

    })
})


document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=4){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    // masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    // masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})