const video = document.querySelector('.player__video');
console.log(video);

const toggle = document.querySelector('.toggle');

// function togglePlay() {
//   if (video.paused) {
//     video.play()
//     const icon = '❚ ❚';
//     toggle.textContent = icon;
//   } else {
//     video.pause()
//     const icon = '►';
//     toggle.textContent = icon;
//   }
// }
// toggle.addEventListener('click', togglePlay);
function togglePlay() {
  if (video.paused) {
    video.play()
  } else {
    video.pause()
  }
}
toggle.addEventListener('click', togglePlay);
function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚'
  toggle.textContent = icon;
}
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

const skipButtons = document.querySelectorAll("[data-skip]")
console.log(skipButtons);
function skip() {
  console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

skipButtons.forEach(button => button.addEventListener('click', skip));

const sliders = document.querySelectorAll('.player__slider');

function handleRangeUpdate() {
  video[this.name] = this.value;
}

sliders.forEach(slider => slider.addEventListener('change', handleRangeUpdate));
sliders.forEach(slider => slider.addEventListener('mousemove', handleRangeUpdate));


const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');


function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

video.addEventListener('timeupdate', handleProgress);

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);