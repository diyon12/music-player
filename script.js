let audio = new Audio('test1.mp3');
let isPlaying = false;

audio.addEventListener('timeupdate', updateProgressBar);
audio.addEventListener('durationchange', updateDuration);
audio.addEventListener('ended', resetProgressBar);

// Set an interval to regularly update the progress bar
setInterval(updateProgressBar, 1000); // Update every second (adjust as needed)

function togglePlayPause() {
    if (isPlaying) {
        pause();
    } else {
        play();
    }
    updatePlayButtonIcon();
}

function play() {
    audio.play();
    isPlaying = true;
}

function pause() {
    audio.pause();
    isPlaying = false;
}

function updatePlayButtonIcon() {
    var playBtn = document.getElementById('playPauseBtn');
    playBtn.innerHTML = isPlaying
        ? '<svg width="30" height="32" fill="currentColor"><rect x="6" y="4" width="4" height="24" rx="2" /><rect x="20" y="4" width="4" height="24" rx="2" /></svg>'
        : '<svg width="24" height="24" fill="currentColor"><path d="M6 4l14 8-14 8V4Z" /></svg>';
}

function updateProgressBar() {
    var progress = (audio.currentTime / audio.duration) * 100;
    document.getElementById('progress').style.width = progress + '%';
    document.querySelector('.current-time').textContent = formatTime(audio.currentTime);
}

function resetProgressBar() {
    document.getElementById('progress').style.width = '0%';
    document.querySelector('.current-time').textContent = '0:00';
}

function updateDuration() {
    var durationElement = document.getElementById('duration');
    durationElement.textContent = formatTime(audio.duration);
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

function rewind() {
    audio.currentTime -= 10;
}

const skipForward = () => {
    audio.currentTime += 10;
};