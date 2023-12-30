let audio = new Audio('test1.mp3');
let isPlaying = false;

audio.addEventListener('timeupdate', updateProgressBar);
audio.addEventListener('durationchange', updateDuration);
audio.addEventListener('ended', resetProgressBar);

function togglePlayPause() {
    if (isPlaying) {
    pause();
    } else {
    play();
    }
}

function play() {
    audio.play();
    isPlaying = true;
    updatePlayButtonIcon();
}

function pause() {
    audio.pause();
    isPlaying = false;
    updatePlayButtonIcon();
}

function updatePlayButtonIcon() {
    var playBtn = document.querySelector('.play-btn');
    playBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
}

function updateProgressBar() {
    var progress = (audio.currentTime / audio.duration) * 100;
    document.getElementById('progress').style.width = progress + '%';
    document.getElementById('currentTime').textContent = formatTime(audio.currentTime);
}

function updateDuration() {
    var durationElement = document.getElementById('duration');
    durationElement.textContent = formatTime(audio.duration);
}

function resetProgressBar() {
    document.getElementById('progress').style.width = '0%';
    document.getElementById('currentTime').textContent = '0:00';
}

function setVolume(volume) {
    audio.volume = volume / 100;
}

function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = Math.floor(seconds % 60);
    return (
    minutes.toString().padStart(2, '0') +
    ':' +
    remainingSeconds.toString().padStart(2, '0')
    );
}