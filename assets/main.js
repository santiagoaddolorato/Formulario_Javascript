const form = document.getElementById("form")
const nameInput = document.getElementById("username")
const emailInput = document.getElementById("email")
const passInput = document.getElementById("password")
const phoneInput = document.getElementById("phone")

const checkUserName = () => {
let valid = false;

const min = 3;
const max = 25;

const username = nameInput.value.trim();

if(isEmpty(username)){
    showError(nameInput, `el nombre es obligatorio`)
} else if  (!isBetween(username.length, min, max)){
   showError(nameInput, `El nombre debe tener entre ${min} y ${max} caracteres`);
} else {
    showSucces(nameInput);
    valid =true;
}
  return valid;
};

const checkEmail = () => {
  let valid = false;

  const emailValue = emailInput.value.trim();

  if (isEmpty(emailInput)){
    showError(emailInput, `El email es obligatorio`);
  } else if (!isEmailValid(emailValue)){
    showError(emailInput, `El email no es valido`)
  } else {
    showSucces(emailInput);
    valid = true;
  }
  return valid;

};

const checkPassword = () => {
    let valid = false;
    const password = passInput.value.trim();

    if (isEmpty(passInput)){
        showError(passInput, `La contraseña es obligatoria`)
    } else if (!isPassSecure(password)) {
        showError(passInput, 
        `La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula y un simbolo`);
    } else {
        showSucces(passInput);
        valid = true;
    }
    return valid;
}

const checkPhone = () => {
    let valid = false;
    const phoneValid = phoneInput.value.trim();
    if(isPhoneValid(phoneValid)){
        showError(phoneInput, `El telefono no es valido`);
    } else {
        showSucces(phoneInput);
        valid = true;
    }
    return valid;
}

    
const isEmpty = (value) => value === "";

const isBetween = (length, min, max) => length < min || length > max ? false : true;

const isEmailValid = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    return re.test(email);
};

const isPassSecure = (pass) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    return re.test(pass)
    };

const isPhoneValid = (phone) => {
    const re = /^[0-9]{10}$/;
    return re.test(phone)
};

const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove(`success`);
    formField.classList.add(`error`) ;
    console.log(formField.querySelector("small"));
    const error  = formField.querySelector("small");
    error.innerText  = message;
} ;
const showSucces = (input) => {
    const formField = input.parentElement;
    formField.classList.remove(`error`);
    formField.classList.add(`success`) ;
    const error  = formField.querySelector("small");
    error.innerText  = "";
} ;

form.addEventListener(`submit`, (e) => {
    e.preventDefault();
   
    let  isUserNameValid = checkUserName();
    let isEmailValid = checkEmail();
    let isPassSecure = checkPassword();
    let isPhoneValid = checkPhone ();

    console.log(isUserNameValid, isEmailValid,isPassSecure, isPhoneValid);

    let isFormValid = isUserNameValid && isEmailValid && isPassSecure && isPhoneValid;

    if(isFormValid) {
        form.submit();
        alert (`Enviamos el formulario`, isUserNameValid, isEmailValid, isPassSecure, isPhoneValid)
    }
})

const debounce =(fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        if(timeoutId) clearTimeout(timeoutId)
        timeoutId = setTimeout(()=> {
            fn.apply(null, args)
        }, delay)
    }
}

form.addEventListener(`input`, debounce((e) => {
    switch (e.target.id) {
        case `username`:
            checkUserName();
            break;
         case `email`:
            checkEmail();
            break;
        case `password`:
            checkPassword();
            break;
        
        case `phone`:
            checkPhone();
            break;
         
    }
}))