'use strict';

const exp = '708067';
const url = 'https://users-dasw.herokuapp.com/';
const endpointUser = 'api/users';
const endpointLogin = 'api/login';
const endpointToken = 'api/tokenDASW';

let detaNom = document.getElementById('detalleNom')
let detaCorr = document.getElementById('detalleCorr')
let detaFech = document.getElementById('detalleFech')
let detaSexo = document.getElementById('detalleSexo')
let detaPass = document.getElementById('detallePass')
let detaUrl = document.getElementById('detalleUrl')
let detaIid = document.getElementById('detalleIid')
let detaImg = document.getElementById('detalleImg')

console.log(localStorage.detalleCorreo);


//Funcion GET usuarios
function getUsers(){
    return{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': `${localStorage.token}`,
        'x-user-token': `${localStorage.responseToken}`
      }
    }
  }




    let urlEdit = url + endpointUser + '/' + localStorage.detalleCorreo;
  
    console.log('urledit' + urlEdit);
    let ans = fetch(urlEdit, getUsers())
    .then(function(response) {
       return response.json()
       .then(data=>{
         console.log(data);
         desplegar(data);
        });
    })
    .then(function(myJson) {
      //console.log(myJson);
    });  


  
//Show user in Detalle page
  function desplegar(user){
    detaNom.innerHTML = `<h4 id="detalleNom">${user.nombre} ${user.apellido}</h4>`
    detaCorr.innerHTML = `<p id="detalleCorr">Correo: ${user.correo}</p>`
    detaFech.innerHTML = `<p id="detalleFech">Fecha: ${user.fecha}</p>` 
    detaSexo.innerHTML = `<p id="detalleSexo">Sexo: ${user.sexo}</p>`
    detaPass.innerHTML = `<p id="detallePass">Password: ${user.password}</p>`
    detaUrl.innerHTML = `<p id="detalleUrl">Url: ${user.url}</p>`
    detaIid.innerHTML = `<p id="detalleIid">iid: ${user.iid}</p>`
    detaImg.src = user.url
    //console.log(user.url);
    //console.log(detaImg);

                
  }