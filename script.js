const pickedColorRefDOM = document.getElementById("picked-color-ref");
const customAlertDOM = document.getElementById("custom-alert");
const rgbValRefDOM = document.getElementById("rgb-val-ref");
const hexValRefDOM = document.getElementById("hex-val-ref");
const fileInputDom = document.getElementById("file");
const resultDOM = document.getElementById("result");
const errorDOM = document.getElementById("error");
const imageDOM = document.getElementById("image");

let eyeDropper;

window.onload = () => {
  if (window.EyeDropper) {
    eyeDropper = new EyeDropper();
  } else {
    errorDOM.classList.remove("hide");
    errorDOM.innerText = "Tu novegador no es compatible con nuestra funcion.";
    return false;
  }
};

const changeImage = () => {
  resultDOM.style.display = "none";

  let reader = new FileReader();

  reader.readAsDataURL(fileInputDom.files[0]);
  reader.onload = () => {
    imageDOM.setAttribute("src", reader.result);
  };
};

const copy = (textId) => {
  document.getElementById(textId).select();
  document.execCommand("copy");

  customAlertDOM.style.transform = "scale(1)";

  setTimeout(() => {
    customAlertDOM.style.transform = "scale(0)";
  }, 2000);
};

const colorSelector = async () => {
  eyeDropper
    .open()
    .then((colorValue) => {
      error.classList.add("hide");

      let hexValue = colorValue.sRGBHex;
      let rgbArr = [];

      for (let i = 1; i < hexValue.length; i += 2) {
        rgbArr.push(parseInt(hexValue[i] + hexValue[i + 1], 16));
      }

      let rgbValue = "rgb(" + rgbArr + ")";

      result.style.display = "flex";

      hexValRefDOM.value = hexValue;
      rgbValRefDOM.value = rgbValue;
      pickedColorRefDOM.style.backgroundColor = hexValue;
    })
    .catch((err) => {
      errorDOM.classList.remove("hide");

      if (err.toString().includes("AbortError")) {
        errorDOM.innerText = "Cancelaste la accion, intenta de nuevo, y espera";
      } else {
        errorDOM.innerText = err;
      }
    });
};
