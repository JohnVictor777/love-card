//Variables
let mobile_media_query = window.matchMedia("(max-width: 400px)");
let tablet_media_query = window.matchMedia(
  "(min-width: 400px) and (max-width: 600px)"
);
const notes = document.querySelectorAll(".js-note");

//-> Function that resets the size of the notes.
function recize_notes() {
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].classList.contains("active")) {
      notes[i].classList.remove("active");
      gsap.set(notes[i], {
        height: "30%",
        clearProps: "all",
      });
    }
  }
}
// Fução que toca a música em loop
const musicTracks = [
  "assets/musica/Fly Me To The Moon - Lofi.mp3",
  "assets/musica/Lo-fi Type Beat - Lonely Nights.mp3",
];

const audio = document.getElementById("background-music");
const musicButton = document.getElementById("music-button");

// Escolhe uma música aleatória ao carregar
const randomTrack = musicTracks[Math.floor(Math.random() * musicTracks.length)];
audio.querySelector("source").src = randomTrack;
audio.load();

let isPlaying = false;

musicButton.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    musicButton.textContent = "🎵 Play Música";
  } else {
    audio.play();
    musicButton.textContent = "⏸️ Pause Música";
  }
  isPlaying = !isPlaying;
});

// Fução que muda imagem no background
const backgrounds = [
  "assets/images/imagem-1-o-dia-que-eu-passei.png",
  "assets/images/imagem-2.jpg",
  "assets/images/imagem-3.jpg",
  "assets/images/imagem-4.jpg",
  "assets/images/imagem-5.jpg",
];

const randomBackground =
  backgrounds[Math.floor(Math.random() * backgrounds.length)];
document.body.style.backgroundImage = `url('${randomBackground}')`;

//-> Main function that enables all the notes.
function notes_ready() {
  gsap.to(".js-envelop-content", {
    height: "110%",
    duration: 0.5,
  });

  for (let i = 0; i < notes.length; i++) {
    notes[i].addEventListener("click", function () {
      if (mobile_media_query.matches) {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, {
            height: "30%",
            clearProps: "all",
          });
        } else {
          for (let i = 0; i < notes.length; i++) {
            if (notes[i].classList.contains("active")) {
              notes[i].classList.remove("active");
              gsap.set(notes[i], {
                height: "30%",
                clearProps: "all",
              });
            }
          }
          this.classList.add("active");
          gsap.set(this, {
            height: 125 + 40 * i + "%",
          });
        }
      } else if (tablet_media_query.matches) {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, {
            height: "30%",
            clearProps: "all",
          });
        } else {
          for (let i = 0; i < notes.length; i++) {
            if (notes[i].classList.contains("active")) {
              notes[i].classList.remove("active");
              gsap.set(notes[i], {
                height: "30%",
                clearProps: "all",
              });
            }
          }
          this.classList.add("active");
          gsap.set(this, {
            height: 80 + 21 * i + "%",
          });
        }
      } else {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, {
            height: "30%",
            clearProps: "all",
          });
        } else {
          for (let i = 0; i < notes.length; i++) {
            if (notes[i].classList.contains("active")) {
              notes[i].classList.remove("active");
              gsap.set(notes[i], {
                height: "30%",
                clearProps: "all",
              });
            }
          }
          this.classList.add("active");
          gsap.set(this, {
            height: 70 + 20 * i + "%",
          });
        }
      }
    });
  }
}

//-> Function that set up the up paper of the envelope.
function set_up_paper() {
  var arr = [0, 0, 100, 0, 50, 61];
  gsap.set(".js-up-paper", {
    bottom: "97%",
    rotation: 180,
    zIndex: 200,
    clipPath:
      "polygon(" +
      arr[0] +
      "%" +
      arr[1] +
      "%," +
      arr[2] +
      "%" +
      arr[3] +
      "%," +
      arr[4] +
      "%" +
      arr[5] +
      "%)",
    onComplete: notes_ready,
  });
}

//-> Function that starts the up paper transition.
function envelop_transition() {
  gsap.to(".js-up-paper", {
    bottom: "1%",
    duration: 0.25,
    onComplete: set_up_paper,
  });
  document
    .querySelector(".js-up-paper")
    .removeEventListener("click", envelop_transition);
  document.querySelector(".js-up-paper").classList.remove("cursor");
}

//-> Function that allows cut the sticker.
function sticker() {
  gsap.set(".js-sticker", { width: "20%", left: "-80%" });
  document.body.classList.remove("scissors");
  document.querySelector(".js-sticker").removeEventListener("click", sticker);
  document
    .querySelector(".js-up-paper")
    .addEventListener("click", envelop_transition);
  document.querySelector(".js-up-paper").classList.add("cursor");
}

document.querySelector(".js-sticker").addEventListener("click", sticker);

window.onresize = function (event) {
  recize_notes();
};
