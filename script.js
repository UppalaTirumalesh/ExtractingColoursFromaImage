const APP = {
  canvas: null,
  ctx: null,
  data: [],
  img: null,
  init() {
    APP.canvas = document.querySelector('main canvas');
    APP.ctx = APP.canvas.getContext('2d');
    APP.canvas.width = 900;
    APP.canvas.style.width = 900;
    APP.canvas.height = 600;
    APP.canvas.style.height = 600;
    APP.img = document.createElement('img');
    APP.img.src = APP.canvas.getAttribute('data-src');
    APP.img.onload = (ev) => {
      APP.ctx.drawImage(APP.img, 0, 0);
      let imgDataObj = APP.ctx.getImageData(
        0,
        0,
        APP.canvas.width,
        APP.canvas.height
      );
      APP.data = imgDataObj.data;
      APP.canvas.addEventListener('mousemove', APP.getPixel);
      APP.canvas.addEventListener('click', APP.addBox);
    };
  },
  getPixel(ev) {
    let cols = APP.canvas.width;
    let { offsetX, offsetY } = ev;
    let c = APP.getPixelColor(cols, offsetY, offsetX);
    let clr = `rgb(${c.red}, ${c.green}, ${c.blue})`;
    document.getElementById('pixelColor').style.backgroundColor = clr;
    APP.pixel = clr;
  },

  getPixelColor(cols, x, y) {
    let pixel = cols * x + y;
    let arrayPos = pixel * 4;
    return {
      red: APP.data[arrayPos],
      green: APP.data[arrayPos + 1],
      blue: APP.data[arrayPos + 2],
    };
  },

  addBox(ev) {
    let colours = document.querySelector('.colours');
    let pixel = document.createElement('span');
    pixel.className = 'box';
    pixel.setAttribute('data-label', 'Exact pixel');
    pixel.setAttribute('data-color', APP.pixel);
    pixel.style.backgroundColor = APP.pixel;
    colours.append(pixel);
  },
};

var givenImage = document.getElementById("getImage");
var image ;

function displayImage() {
  image = `
            <form action="#" onSubmit='handleFile(event)' id="formtag">
              <label for="myfile">Select a file:</label>
              <input type="file" accept="image/png, image/jpg, image/gif" id="myfile" name="myfile" /><br /><br />
              <input type="submit"/>
            </form>
          `;
  givenImage.innerHTML = image;
}
function newDisplayImage(selectedFile) {
  image = `
            <div>
              <span class="box" id="pixelColor" data-label="Current_Pixel"></span>
              <canvas class="main_canvas" data-src="${URL.createObjectURL(selectedFile)}" id="canvas" width="500px"></canvas>
            </div>
            <section class="colours"></section>
          `;
  givenImage.innerHTML = image;
}
function handleFile(e) {
  e.preventDefault();
  var fileInput = document.getElementById("myfile");
  var selectedFile = fileInput.files[0];
  console.log("selectedFile",selectedFile);
  newDisplayImage(selectedFile);
  APP.init();
}

document.addEventListener('DOMContentLoaded', displayImage());