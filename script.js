const PIXEL_RGBA = 4;
const colorHistory = document.getElementById("color-history");
let dropZone = document.getElementById("drop-zone");
let selectFileEl = document.getElementById("file-upload");
let canvasArea = document.getElementById("canvas-area");
let themeExtraction = document.querySelector('.theme-extraction');

const APP = {
  canvas: null,
  ctx: null,
  data: [],
  img: null,

  init(imageUrl) {
    APP.canvas = document.getElementById("canvas");
    APP.ctx = APP.canvas.getContext("2d");
    const CANVAS_WIDTH = canvasArea.offsetWidth;
    const CANVAS_HEIGHT = canvasArea.offsetHeight;

    APP.canvas.width = CANVAS_WIDTH;
    APP.canvas.height = CANVAS_HEIGHT;

    APP.img = document.createElement("img");
    APP.img.src = imageUrl;

    APP.img.onload = (ev) => {
      APP.ctx.drawImage(APP.img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      let imgDataObj = APP.ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      APP.data = imgDataObj.data;
      APP.canvas.addEventListener("mousemove", APP.getPixel);
      APP.canvas.addEventListener("click", APP.addColorToHistory);
    };
  },

  getPixel(ev) {
    let cols = APP.canvas.width;
    let { offsetX, offsetY } = ev;
    let c = APP.getPixelColor(cols, offsetY, offsetX);
    let clr = `rgb(${c.red}, ${c.green}, ${c.blue})`;
    document.getElementById("current-pixel").style.backgroundColor = clr;
    APP.pixel = clr;
  },

  getPixelColor(cols, x, y) {
    let pixel = cols * x + y;
    let arrayPos = pixel * PIXEL_RGBA;
    return {
      red: APP.data[arrayPos],
      green: APP.data[arrayPos + 1],
      blue: APP.data[arrayPos + 2],
      alpha: APP.data[arrayPos + 3],
    };
  },

  addColorToHistory() {
    let pixelTemplate = `<span class="box" onclick="copyColorCode(event)" style="background : ${APP.pixel}"></span>`;
    colorHistory.insertAdjacentHTML("afterbegin", pixelTemplate)
  }

};

function selectFile(e){
  e.stopPropagation();
  e.preventDefault();
  let file = e.target.files[0];
  dropZone.style.display = "none";
  let url = URL.createObjectURL(file);
  activateCanvasArea();
  APP.init(url);
}

function activateCanvasArea(){
  themeExtraction.classList.add('active');
}

window.addEventListener("DOMContentLoaded", (event) => {  
  dropZone.addEventListener("dragover", activateDropZone);
  dropZone.addEventListener("dragleave", inActivateDropZone);
  dropZone.addEventListener("drop", handleFileUpload);

  selectFileEl.addEventListener("change", selectFile);
});

function activateDropZone(e) {
  e.preventDefault();
  this.classList.add("active");
}

function inActivateDropZone(e) {
  e.preventDefault();
  this.classList.remove("active");
}

function handleFileUpload(e) {
  e.preventDefault();
  dropZone.classList.remove("active");
  let file = e.dataTransfer.files[0];
  dropZone.style.display = "none";
  let imageUrl = URL.createObjectURL(file);
  activateCanvasArea();
  APP.init(imageUrl);
}


function copyColorCode(e){
  navigator.clipboard.writeText(e.target.style.backgroundColor);
}