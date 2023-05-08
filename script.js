var dragEvent = document.getElementById('demo');
var output = document.getElementsByTagName("output");
    
  function displayImage(selectedFile) {
    let image = `<div class="image">
                  <img src="${URL.createObjectURL(selectedFile)}" alt="image">
                </div>`;
    output[0].innerHTML = image;
  }
function handleFile(e){
     e.preventDefault();
var fileInput = document.getElementsByName('myfile');
     var selectedFile = fileInput[0].files[0];
     displayImage(selectedFile);
}