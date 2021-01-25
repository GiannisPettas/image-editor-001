// Import stylesheets
import "./style.css";

// Write Javascript code!
const workspace = document.querySelector("div.main-app > div.workspace");
const mainCanvas = document.querySelector("div.workspace > canvas.main-canvas");
const mainCanvasCtx = mainCanvas.getContext("2d");
const loadingMessage = document.querySelector("div.workspace > div.loading");
const basicFiltersMenu = document.querySelector(
  "section.right-menu-bar > div.basic-filters.menu-bar"
);
const brightnessSlider = basicFiltersMenu.querySelector(
  'div.brightness > input[type="range"]'
);
const brightnessTextField = basicFiltersMenu.querySelector(
  'div.brightness > input[type="text"]'
);
const contrastSlider = basicFiltersMenu.querySelector(
  'div.contrast > input[type="range"]'
);
const contrastTextField = basicFiltersMenu.querySelector(
  'div.contrast > input[type="text"]'
);
const highlightsSlider = basicFiltersMenu.querySelector(
  'div.highlights > input[type="range"]'
);
const highlightsTextField = basicFiltersMenu.querySelector(
  'div.highlights > input[type="text"]'
);
const shadowsSlider = basicFiltersMenu.querySelector(
  'div.shadows > input[type="range"]'
);
const shadowsTextField = basicFiltersMenu.querySelector(
  'div.shadows > input[type="text"]'
);
const whitesSlider = basicFiltersMenu.querySelector(
  'div.whites > input[type="range"]'
);
const whitesTextField = basicFiltersMenu.querySelector(
  'div.whites > input[type="text"]'
);
const blacksSlider = basicFiltersMenu.querySelector(
  'div.blacks > input[type="range"]'
);
const blacksTextField = basicFiltersMenu.querySelector(
  'div.blacks > input[type="text"]'
);
const claritySlider = basicFiltersMenu.querySelector(
  'div.clarity > input[type="range"]'
);
const clarityTextField = basicFiltersMenu.querySelector(
  'div.clarity > input[type="text"]'
);
const vibranceSlider = basicFiltersMenu.querySelector(
  'div.vibrance > input[type="range"]'
);
const vibranceTextField = basicFiltersMenu.querySelector(
  'div.vibrance > input[type="text"]'
);
const saturationSlider = basicFiltersMenu.querySelector(
  'div.saturation > input[type="range"]'
);
const saturationTextField = basicFiltersMenu.querySelector(
  'div.saturation > input[type="text"]'
);

// generate images links in array
const imagesOrigLinkArray = [];
const imagesThumbLinkArray = [];
const imageIdsFromLoremPicsum = [
  1026,
  1027,
  1028,
  1031,
  104,
  1040,
  1050,
  1053,
  1054,
  1060,
  1063,
  1074,
  1080,
  112,
  110,
  113,
  116,
  133,
  142,
  146,
  152,
  163,
  164,
  178,
  180,
  183,
  189,
  190,
  192,
  196
];

for (let i = 0; i < imageIdsFromLoremPicsum.length; i++) {
  let imageRatio = Math.random() * 3 + 1; //Math.random() * (max - min) + min
  if (i % 2 === 0) {
    imagesOrigLinkArray.push(
      `https://picsum.photos/id/${imageIdsFromLoremPicsum[i]}/1200/${parseInt(
        1200 / imageRatio
      )}`
    );
    imagesThumbLinkArray.push(
      `https://picsum.photos/id/${imageIdsFromLoremPicsum[i]}/100/${parseInt(
        100 / imageRatio
      )}`
    );
  } else {
    imagesOrigLinkArray.push(
      `https://picsum.photos/id/${imageIdsFromLoremPicsum[i]}/${parseInt(
        665 / imageRatio
      )}/665`
    );
    imagesThumbLinkArray.push(
      `https://picsum.photos/id/${imageIdsFromLoremPicsum[i]}/${parseInt(
        100 / imageRatio
      )}/100`
    );
  }
}

var filterValue = 0;
var mainImage = new Image();
mainImage.imageData = {};
mainImage.sumOfChanges = {
  initial: 0,
  brightness: 0,
  contrast: 0,
  highlights: 0,
  shadows: 0,
  whites: 0,
  blacks: 0,
  clarity: 0,
  vibrance: 0,
  saturation: 0
};
for (let property in mainImage.sumOfChanges) {
  mainImage.sumOfChanges[property] = new Uint8ClampedArray(1200 * 1200 * 4);
  mainImage.sumOfChanges[property].fill(128);
}
mainImage.sumOfChanges.changed = new Uint32Array(1200 * 1200 * 4);
mainImage.sumOfChanges.after = new Uint32Array(1200 * 1200 * 4);



//^^^^^^^^^^^^^^^create right menu bar elements^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//_________________end of create right menu bar elements_____________________
//^^^^^^^^^^^^^^^^^create bottom slider elements^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// bottom slider element Wrapper
const footerImageSliderWrapper = document.querySelector(
  "section.footer-image-slider-wrapper"
);
//the main bottom slider. Positioned relative
//and right position controlled from js
const footerImageSlider = document.querySelector(
  "section.footer-image-slider-wrapper > div.footer-image-slider"
);
//scrolling html input on bottom
const footerSliderScroller = document.querySelector(
  '.footer-image-slider-wrapper>.slider-scroller>input[type="range"]'
);

//____________end of select bottom slider elements_____________________
//^^^^^^^^^^^initialize scroll of bottom slider^^^^^^^^^^^^^^^^^^^^^^^

//the width of the footer slides IN PERCENTAGE (eg: 10% means 10 slides will be visible in slider(100/10))
var footerSlidesWidth = 7;

//100 / footerSlidesWidth gives us the current items visible, so
//we remove them from the array of images to scroll.
// * footerSlidesWidth makes the scroll run smoother(move values)
// + footerSlidesWidth adds 2 more image space at the end, to make last image come more to the center.
footerSliderScroller.max =
  (imagesThumbLinkArray.length - 100 / footerSlidesWidth) * footerSlidesWidth +
  footerSlidesWidth * 2;

//^^^^^^^add listener for scrolling the images in bottom slider^^^^^^^^^^^^^
footerSliderScroller.addEventListener("input", () => {
  footerImageSlider.style.right = footerSliderScroller.value + "%";
});

//__________end of initialize scroll of bottom slider______________________
//^^^^^^^^^^^^^^^^^load bottom thumbnails and add eventlisteners^^^^^^^^^^

// create div -> image-holder inside footerImageSlider
// and put inside every div an image -> image.footer-image-slider.image
// with src from imagesThumbLinkArray.
for (var i = 0; i < imagesThumbLinkArray.length; i++) {
  let imageHolder = document.createElement("div");
  let imgThumb = document.createElement("img");
  imgThumb.src = imagesThumbLinkArray[i];
  imgThumb.positionInArray = i;
  imgThumb.className = "footer-image-slider image";
  imageHolder.className = "image-holder";
  imageHolder.style.minWidth = footerSlidesWidth + "%";
  imgThumb.onload = function() {
    imageHolder.appendChild(imgThumb);
    footerImageSlider.appendChild(imageHolder);
    imgThumb.addEventListener("click", function() {
      createImageOnCanvas(this.positionInArray);
    });
  };
}
//___________end  of load bottom thumbnails and add eventlisteners________

//when user clicks a thumbnail, this function runs and does a lot of stuff!
function createImageOnCanvas(positionInArray) {
  rightPanelSlidersResetValue();
  rightPanelSlidersStatus("disable");
  rightPanelSlidersListenersStatus("disable");
  console.time("image loading time");
  mainImage.src = imagesOrigLinkArray[positionInArray];
  mainImage.crossOrigin = "anonymous";
  loadingMessage.style.display = "block";
  mainImage.onload = function() {
    console.timeEnd("image loading time");
    loadingMessage.style.display = "none";
    mainCanvas.height = mainImage.height;
    mainCanvas.width = mainImage.width;
    mainCanvasCtx.drawImage(mainImage, 0, 0);
    mainImage.imageData = mainCanvasCtx.getImageData(
      0,
      0,
      mainCanvas.width,
      mainCanvas.height
    );
    console.time("initialize values");
    for (let i = 0; i < mainImage.imageData.data.length; i++) {
      mainImage.sumOfChanges.initial[i] = mainImage.imageData.data[i];
      mainImage.sumOfChanges.changed[i] = mainImage.imageData.data[i];
    }
    mainImage.sumOfChanges.brightness.fill(128);
    mainImage.sumOfChanges.contrast.fill(128);
    mainImage.sumOfChanges.highlights.fill(128);
    mainImage.sumOfChanges.shadows.fill(128);
    mainImage.sumOfChanges.whites.fill(128);
    mainImage.sumOfChanges.blacks.fill(128);
    mainImage.sumOfChanges.clarity.fill(128);
    mainImage.sumOfChanges.vibrance.fill(128);
    mainImage.sumOfChanges.saturation.fill(128);
    console.timeEnd("initialize values");
    rightPanelSlidersStatus("enable");
    rightPanelSlidersListenersStatus("enable"); //enable or disable listeners
  };
}

//enable or disable the sliders of right panel
function rightPanelSlidersStatus(status) {
  if (status === "enable") {
    status = false;
  } else if (status === "disable") {
    status = true;
  } else {
    return;
  }
  brightnessSlider.disabled = status;
  contrastSlider.disabled = status;
  // highlightsSlider.disabled = status;
  // shadowsSlider.disabled = status;
  // whitesSlider.disabled = status;
  // blacksSlider.disabled = status;
  // claritySlider.disabled = status;
  // vibranceSlider.disabled = status;
  // saturationSlider.disabled = status;
}
//enable or disable the slider listeners of right panel
function rightPanelSlidersListenersStatus(status) {
  if (status === "enable") {
    brightnessSlider.addEventListener("mousedown", mouseDownBrightness);
    brightnessSlider.addEventListener("input", mouseDragBrightness);
    // brightnessSlider.addEventListener("change", mouseUpBrightness);
    // brightnessTextField.addEventListener("change", changeTextFieldBrightness);
    contrastSlider.addEventListener("mousedown", mouseDownContrast);
    contrastSlider.addEventListener("input", mouseDragContrast);
    // contrastSlider.addEventListener("change", mouseUpContrast);
    // contrastTextField.addEventListener("change", changeTextFieldContrast);
  } else if (status === "disable") {
    brightnessSlider.removeEventListener("mousedown", mouseDownBrightness);
    brightnessSlider.removeEventListener("input", mouseDragBrightness);
    // brightnessSlider.removeEventListener("change", mouseUpBrightness);
    // brightnessTextField.removeEventListener(
    // "change",
    // changeTextFieldBrightness
    // );
    contrastSlider.removeEventListener("mousedown", mouseDownContrast);
    contrastSlider.removeEventListener("input", mouseDragContrast);
    // contrastSlider.removeEventListener("change", mouseUpContrast);
    // contrastTextField.removeEventListener("change", changeTextFieldContrast);
  }
}
// when we change image, we want to reset sliders and input text  to 0
function rightPanelSlidersResetValue() {
  brightnessSlider.value = 0;
  brightnessTextField.value = 0;
  contrastSlider.value = 0;
  contrastTextField.value = 0;
  // highlightsSlider.value = 0;
  // highlightsTextField.value = 0;
  // shadowsSlider.value = 0;
  // shadowsTextField.value = 0;
  // whitesSlider.value = 0;
  // whitesTextField.value = 0;
  // blacksSlider.value = 0;
  // blacksTextField.value = 0;
  // claritySlider.value = 0;
  // clarityTextField.value = 0;
  // vibranceSlider.value = 0;
  // vibranceTextField.value = 0;
  // saturationSlider.value = 0;
  // saturationTextField.value = 0;
}

// function mouseDownBrightness() {}
// function mouseUpBrightness() {
//   createSumOfFilters("brightness");
// }
// function mouseUpContrast() {
//   createSumOfFilters("contrast");
// }
// function mouseUpHighlights() {
//   createSumOfFilters("highlights");
// }
// function mouseUpShadows() {
//   createSumOfFilters("shadows");
// }
// function mouseUpWhites() {
//   createSumOfFilters("whites");
// }
// function mouseUpBlacks() {
//   createSumOfFilters("blacks");
// }
// function mouseUpClarity() {
//   createSumOfFilters("clarity");
// }
// function mouseUpVibrance() {
//   createSumOfFilters("vibrance");
// }
// function mouseUpSaturation() {
//   createSumOfFilters("saturation");
// }

function mouseDownBrightness() {
  console.log("pass");
  for (let i = 0; i < mainImage.imageData.data.length; i++) {
    mainImage.sumOfChanges.after[i] =
      mainImage.sumOfChanges.contrast[i] +
      mainImage.sumOfChanges.highlights[i] +
      mainImage.sumOfChanges.shadows[i] +
      mainImage.sumOfChanges.whites[i] +
      mainImage.sumOfChanges.blacks[i] +
      mainImage.sumOfChanges.clarity[i] +
      mainImage.sumOfChanges.vibrance[i] +
      mainImage.sumOfChanges.saturation[i];
  }
}
function mouseDragBrightness() {
  console.time("mouse drag brightness");
  filterValue = parseInt(brightnessSlider.value);
  brightnessTextField.value = brightnessSlider.value;
  for (let i = 0; i < mainImage.imageData.data.length; i++) {
    if (i % 4 == 3) {
    } else {
      mainImage.sumOfChanges.brightness[i] = 128 + filterValue;

      mainImage.sumOfChanges.changed[i] =
        mainImage.sumOfChanges.initial[i] +
        mainImage.sumOfChanges.brightness[i] +
        mainImage.sumOfChanges.after[i] -
        128 * 9;
      if (mainImage.sumOfChanges.changed[i] > 100000) {
        mainImage.sumOfChanges.changed[i] = 0;
      }
      mainImage.imageData.data[i] = mainImage.sumOfChanges.changed[i];
    }
  }
  // console.log(mainImage.sumOfChanges.changed);
  mainCanvasCtx.putImageData(mainImage.imageData, 0, 0);
  console.timeEnd("mouse drag brightness");
}

function mouseDownContrast() {
  for (let i = 0; i < mainImage.imageData.data.length; i++) {
    mainImage.sumOfChanges.after[i] =
      mainImage.sumOfChanges.highlights[i] +
      mainImage.sumOfChanges.shadows[i] +
      mainImage.sumOfChanges.whites[i] +
      mainImage.sumOfChanges.blacks[i] +
      mainImage.sumOfChanges.clarity[i] +
      mainImage.sumOfChanges.vibrance[i] +
      mainImage.sumOfChanges.saturation[i];
  }
}
function mouseDragContrast() {
  console.time("mouse drag contrast");
  filterValue = parseInt(contrastSlider.value);
  contrastTextField.value = contrastSlider.value;
  let factor = (259 * (filterValue + 255)) / (255 * (259 - filterValue));
  for (let i = 0; i < mainImage.imageData.data.length; i++) {
    if (i % 4 === 3) {
      // mainImage.sumOfChanges.initial[i] = 255;
    } else {
      mainImage.sumOfChanges.contrast[i] =
        factor * (mainImage.sumOfChanges.initial[i] - 128) +
        128 -
        mainImage.sumOfChanges.initial[i] +
        128;
      mainImage.sumOfChanges.changed[i] =
        mainImage.sumOfChanges.initial[i] +
        mainImage.sumOfChanges.brightness[i] +
        mainImage.sumOfChanges.contrast[i] +
        mainImage.sumOfChanges.after[i] -
        128 * 9;
      if (mainImage.sumOfChanges.changed[i] > 100000) {
        mainImage.sumOfChanges.changed[i] = 0;
      }
      mainImage.imageData.data[i] = mainImage.sumOfChanges.changed[i];
    }
  }
  mainCanvasCtx.putImageData(mainImage.imageData, 0, 0);
  console.timeEnd("mouse drag contrast");
}
// function mouseDragHighlights() {}
// function mouseDragShadows() {}
// function mouseDragWhites() {}
// function mouseDragBlacks() {}
// function mouseDragClarity() {}
// function mouseDragVibrance() {}
// function mouseDragSaturation() {}

// function createSumOfFilters(currentFilter) {
//   console.time("Create sum of filters");
//   for (let i = 0; i < mainImage.imageData.data.length; i++) {
//     mainImage.sumOfChanges.changed[i] =
//       mainImage.sumOfChanges.initial[i] +
//       returnBrightness(currentFilter, i) +
//       returnContrast(currentFilter, i) +
//       returnHighlights(currentFilter, i) +
//       returnShadows(currentFilter, i) +
//       returnWhites(currentFilter, i) +
//       returnBlacks(currentFilter, i) +
//       returnClarity(currentFilter, i) +
//       returnVibrance(currentFilter, i) +
//       returnSaturation(currentFilter, i) -
//       128 * 9;
//     mainImage.imageData.data[i] = mainImage.sumOfChanges.changed[i];
//   }
//   mainCanvasCtx.putImageData(mainImage.imageData, 0, 0);
//   console.timeEnd("Create sum of filters");
// }
// function returnBrightness(currentFilter, i) {
//   if (currentFilter === "brightness") {
//     if (i === 0) {
//       filterValue = parseInt(brightnessSlider.value);
//       brightnessTextField.value = brightnessSlider.value;
//     }
//     calculateBrightness(i);
//     return mainImage.sumOfChanges.brightness[i];
//   } else {
//     return mainImage.sumOfChanges.brightness[i];
//   }
// }
// function returnContrast(currentFilter, i) {
//   if (currentFilter === "contrast") {
//     if (i === 0) {
//       filterValue = parseInt(contrastSlider.value);
//       contrastTextField.value = contrastSlider.value;
//     }
//     calculateContrast(i);
//     return mainImage.sumOfChanges.contrast[i];
//   } else {
//     return mainImage.sumOfChanges.contrast[i];
//   }
// }
// function returnHighlights(currentFilter, i) {
//   if (currentFilter === "highlights") {
//     if (i === 0) {
//       return calculateHighlights();
//     } else {
//       return mainImage.sumOfChanges.brightness[i];
//     }
//   } else {
//     return mainImage.sumOfChanges.highlights[i];
//   }
// }
// function returnShadows(currentFilter, i) {
//   if (currentFilter === "shadows") {
//     if (i === 0) {
//       return calculateShadows();
//     } else {
//       return mainImage.sumOfChanges.brightness[i];
//     }
//   } else {
//     return mainImage.sumOfChanges.shadows[i];
//   }
// }
// function returnWhites(currentFilter, i) {
//   if (currentFilter === "whites") {
//     if (i === 0) {
//       return calculateWhites();
//     } else {
//       return mainImage.sumOfChanges.brightness[i];
//     }
//   } else {
//     return mainImage.sumOfChanges.whites[i];
//   }
// }
// function returnBlacks(currentFilter, i) {
//   if (currentFilter === "blacks") {
//     if (i === 0) {
//       return calculateBlacks();
//     } else {
//       return mainImage.sumOfChanges.brightness[i];
//     }
//   } else {
//     return mainImage.sumOfChanges.blacks[i];
//   }
// }
// function returnClarity(currentFilter, i) {
//   if (currentFilter === "clarity") {
//     if (i === 0) {
//       return calculateClarity();
//     } else {
//       return mainImage.sumOfChanges.brightness[i];
//     }
//   } else {
//     return mainImage.sumOfChanges.clarity[i];
//   }
// }
// function returnVibrance(currentFilter, i) {
//   if (currentFilter === "vibrance") {
//     if (i === 0) {
//       return calculateVibrance();
//     } else {
//       return mainImage.sumOfChanges.brightness[i];
//     }
//   } else {
//     return mainImage.sumOfChanges.vibrance[i];
//   }
// }
// function returnSaturation(currentFilter, i) {
//   if (currentFilter === "saturation") {
//     if (i === 0) {
//       return calculateSaturation();
//     } else {
//       return mainImage.sumOfChanges.brightness[i];
//     }
//   } else {
//     return mainImage.sumOfChanges.saturation[i];
//   }
// }

// function calculateBrightness(i) {
//   mainImage.sumOfChanges.brightness[i] = 128 + filterValue;
//   mainImage.sumOfChanges.brightness[i + 1] = 128 + filterValue;
//   mainImage.sumOfChanges.brightness[i + 2] = 128 + filterValue;
// }

//----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------contrast--------------------
// function mouseDownContrast() {}
// function calculateContrast(i) {
//   let factor = (259 * (filterValue + 255)) / (255 * (259 - filterValue));
//   mainImage.sumOfChanges.contrast[i] =
//     factor * (mainImage.sumOfChanges.initial[i] - 128) +
//     128 -
//     mainImage.sumOfChanges.initial[i] +
//     128;
//   mainImage.sumOfChanges.contrast[i + 1] =
//     factor * (mainImage.sumOfChanges.initial[i + 1] - 128) +
//     128 -
//     mainImage.sumOfChanges.initial[i + 1] +
//     128;
//   mainImage.sumOfChanges.contrast[i + 2] =
//     factor * (mainImage.sumOfChanges.initial[i + 2] - 128) +
//     128 -
//     mainImage.sumOfChanges.initial[i + 2] +
//     128;
// }

//----------------------------------------------------------------------------------------------------
