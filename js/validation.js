const form = document.querySelector("form");
const campoErrores = document.getElementById("errors");
const email = document.getElementById("inputEmail4");
const nameUser = document.getElementById("name");
const textarea = document.getElementById("inputAddress");
const tel = document.getElementById("inputAddress2");
const country = document.getElementById("inputState");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let errors = [];

 
  const valueEmail = email.value.trim();
  const valueName = nameUser.value.trim();
  const textareaValue = textarea.value.trim();
  const valueTel = tel.value.trim();
  const valueCountry = country.value;

  if (valueEmail === "") {
    errors.push("-El campo de usuario está vacío.");

  }
  if (valueName === "") {
    errors.push("-El campo de email está vacío");

  }
  if (textareaValue === "") {
    errors.push("-El mensaje está vacío");

  }
  if (valueTel === "") {
    errors.push("-Ingrese un teléfono por favor");

  }
  if (valueCountry === "Seleccionar") {
    errors.push("-Seleccione un país por favor");
  
  }

  if (errors.length > 0) {
    campoErrores.innerHTML = "";
    for (let index = 0; index < errors.length; index++) {
      let errorItem = document.createElement("li");
      errorItem.textContent = errors[index];
      campoErrores.appendChild(errorItem);
    }
  } else {
    campoErrores.innerHTML = "";
    alert("El mensaje fue enviado, en breve enviaremos una respuesta...");
    form.submit();
  }
});

// PETICION A LA API 

const select = document.getElementById("inputState");
const url = "https://restcountries.com/v3.1/lang/spanish"

 fetch(url)
 .then(response => {
    if (!response.ok) {
        throw new Error("Error en la solicitud" + response.statusText)
    }
    return response.json()
 })
 .then(data => {
    data.forEach(countri =>{
        const option = document.createElement("option");
        option.textContent = countri.name.common ;
        option.value = countri.name.common;
        select.appendChild(option);
    })
 })
 .catch(error =>{
    console.log(error , "Hay errores");
 })



