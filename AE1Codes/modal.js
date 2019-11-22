window.onload = function() {
	init();
}

function init() {
	var btn1 = document.querySelector("#btn1");
	btn1.addEventListener("click", openModal);
}

function openModal() {
	var body = document.querySelector("body");

  var formBg = document.createElement("div");
  formBg.id = "formBg";
  formBg.style.cssText = "z-index: 1; height: 100%; width: 100%; background-color: rgba(0,0,0,0.4); left: 0; top: 0; position: fixed;"

  body.appendChild(formBg);

  var formContent = document.createElement("div");
  formContent.style.cssText = "background-color: silver; margin: 10% auto; padding: 1em; border: 1px solid black; width: 20%;";

  formBg.appendChild(formContent);

  var spanBtn = document.createElement("span");
  spanBtn.style.cssText = "font-size: 2em; float: right;";

  var closeBtn = document.createTextNode("\u00D7");

  spanBtn.appendChild(closeBtn);
  formContent.appendChild(spanBtn);

  var pElem = document.createElement("p");
  var pText = document.createTextNode("Modal example");

  pElem.appendChild(pText);

  formContent.appendChild(spanBtn);
  formContent.appendChild(pElem);

  var inputType = document.createElement("input");
  var inputDetails = document.createElement("input");
  var formSubmit = document.createElement("input");

  inputType.id = "POItype";
  inputType.name = "POItype"
  inputType.type = "text";
  inputType.placeholder = "POI type";

  inputDetails.id = "POIdetails";
  inputDetails.name = "POIdetails";
  inputDetails.type = "text";
  inputDetails.placeholder = "POI details";

  formSubmit.type = "button";
  formSubmit.value = "Submit";
  formSubmit.id = "submitPOI";

  formContent.appendChild(inputType);
  formContent.appendChild(inputDetails);
  formContent.appendChild(formSubmit);
}
