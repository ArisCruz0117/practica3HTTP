'use strict';

let userTest = 
{ 
  "nombre":"L", 
  "apellido":"G", 
  "correo":"t@t.com", 
  "url":"", 
  "sexo":"H", 
  "fecha":"10-10-2019", 
  "password":"12345" 
}

const exp = '708067';
const url = 'https://users-dasw.herokuapp.com/';
const endpointUser = 'api/users';
const endpointLogin = 'api/login';
const endpointToken = 'api/tokenDASW';


//Funcion GET expediente
function getExp(exp){
  return{
    method: 'GET',
    headers: {
      'x-expediente': `${exp}`
    }
  }
}

//Definir parametros para GET con token
function createPost(token, userJSON){
  return{
    method: 'POST',
    body: userJSON,
    headers: {
      'Content-Type': 'application/json',
      'x-auth': `${token}`
    }
  }
}

//Cuando se carga la pagina recibe las funciones
function getToken(getT){
  return getT(url, endpointToken, exp);
}

//Funcion cargar el token 
async function cargarToken(url, endpoint, exp){
  let urlEnd = url + endpoint
  let response = await fetch(urlEnd, getExp(exp));
  if(response.status != 200)return ''; 
  let t = await response.json();
  localStorage.token = t.token;
  console.log('token: ' + t.token);
  return localStorage.token;
}
window.getToken = getToken(cargarToken);



var form = document.querySelector('form');
let btn = document.getElementsByClassName('btn-success mt-3')[0];
let pass = document.getElementsByClassName('form-control mt-3')[1];
let pass2 =document.getElementsByClassName('form-control mt-3')[2];
//in constrast to 'input' this isn't fired every time user presses a key 
//in a text input, but rather on blur if there was a  change.

//Event Listener Enable/Disable
btn.disabled = true;
form.addEventListener('change', function (e) {
    let invalid = form.querySelectorAll('input:invalid');
    
    if(invalid.length > 0){
      btn.disabled = true;
    }
    else if(pass.value === pass2.value){
        btn.disabled = false;
    }
    if(!event.target.validity.valid){
      event.target.style.borderColor="red";
    }else event.target.style.borderColor= 'white';
},true);

//Event Listener click btn submit
//Guardar en user los inputs
btn.addEventListener('click', async function(e){
  event.preventDefault();
  let user = {};
  form.querySelectorAll('input').forEach(i =>{
    
    if(i.placeholder == 'Nombre o nombres'){
        user.nombre = i.value;
    }
    if(i.placeholder == 'Apellidos'){
        user.apellido = i.value;
    }
    if(i.placeholder == 'Tu correo'){
        user.correo = i.value;
    }
    if(i.placeholder == 'Contraseña'){
        user.password = i.value;
    }
    if(i.type == 'date'){//guardar y cambiarlo a dds-mm-yyyy
      user.fecha = i.value.substring(8,10)+ '-';//day
      user.fecha += i.value.substring(5,7)+ '-';//month
      user.fecha += i.value.substring(0,4); //year
    }
    if(i.name == 'sexo'){
      if(i.value == 'H') user.sexo = 'H';
      if(i.value == 'M') user.sexo = 'M';
    }
    if(i.placeholder == 'Url de imagen de perfil'){
      user.url = i.value;
  }
  });

//Registro de usuario
let urlEnd = url + endpointUser;
console.log(localStorage.token);
console.log(urlEnd);
console.log('user: ' + JSON.stringify(user));
let response = await fetch(urlEnd, createPost(localStorage.token, JSON.stringify(user)));

if(response.status != 201)alert('Usuario no creado');
else alert('Usuario creado exitosamente');
})

//Login de usuario
let btn_login = document.getElementsByClassName('btn-success')[0];
let form_login = document.getElementsByClassName('container-fluid')[0];
//Guardar los inputs
btn_login.addEventListener('click', async function(e){
  event.preventDefault();
  let bodyL = {};
  form_login.querySelectorAll('input').forEach(i =>{
    
    if(i.placeholder == 'correo registrado'){
      if(i.type == 'text'){
        bodyL.correo = i.value;
      }
      if(i.type == 'password'){
        bodyL.password = i.value;
      }
    }
  });
  //Login 
  let urlEnd = url + endpointLogin;
  console.log(localStorage.token);
  console.log(urlEnd);
  console.log('user: ' + JSON.stringify(bodyL));
  let response = await fetch(urlEnd, createPost(localStorage.token, JSON.stringify(bodyL)));

  if(response.status != 200)alert('Usuario no creado');
  else {
    alert('Login exitoso!');
    window.location.href = "practica3HTTP/consulta.html"
  }
  let tokenJson = await response.json();
  localStorage.responseToken = tokenJson.token;//guardar token de usuario en localStorage
});






