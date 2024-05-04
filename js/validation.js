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

    // Obtener los valores de los campos justo antes de verificar si están vacíos
    const valueEmail = email.value.trim();
    const valueName = nameUser.value.trim();
    const textareaValue = textarea.value.trim();
    const valueTel = tel.value.trim();
    const valueCountry = country.value

    if (valueEmail === "") {
        errors.push("-El campo de usuario está vacío.");
        // email.style.border = "1px solid red";
    }
    if (valueName === "") {
        errors.push("-El campo de email está vacío");
        // nameUser.style.border = "1px solid red";
    }
    if (textareaValue === "") {
        errors.push("-El mensaje está vacío");
        // textarea.style.border = "1px solid red";
    }
    if (valueTel === "") {
        errors.push("-Ingrese un teléfono por favor");
        // valueTel.style.border = "1px solid red";
    }
    if (valueCountry === "Seleccionar") {
        errors.push("-Seleccione un país por favor");
        // country.style.border = "1px solid red";
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
