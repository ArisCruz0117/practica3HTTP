'use strict';

const exp = '708067';
const url = 'https://users-dasw.herokuapp.com/';
const endpointUser = 'api/users';
const endpointLogin = 'api/login';
const endpointToken = 'api/tokenDASW';
let container = document.getElementsByClassName('container')[0]




window.onload = onload();

function onload(){
  container.innerHTML += 
  `<!-- Modal editar usuario-->
  <div class="modal fade" id="editar" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Editar Usuario</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form action="" id="formAct" >
          <div class="row">
              <div class="col-6" id="editarNombre">
                <input type="text" name="" class="form-control" placeholder="Nombre" aria-describedby="helpId" required>
              </div>
              <div class="col-6" id="editarApellido">
                <input type="text" name="" class="form-control" placeholder="Apellido" aria-describedby="helpId" required>
              </div>
          
          </div>

              <input type="date" name="date" id="editarFecha" class="form-control mt-3" value="2000-01-01" id="" >

              <input type="url" name="" id="editarUrl" class="form-control mt-3" placeholder="Url" aria-describedby="helpId">

            <button id="actualizar" type="submit" class="btn btn-success mt-3">Actualizar</button>
            <button id="close" type="button" class="btn btn-secondary mt-3" data-dismiss="modal">Close</button>
          
            </form>


        </div>
        
      </div>
    </div>
  </div>
  <!-- Modal borrar usuario -->
  <div class="modal fade" id="borrar" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">¿Seguro que quiere borrar al usuario?</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">

          <div class="media col-12 mt-2" id="modelo">
            <div class="media-left align-self-center mr-3">
            </div>
            <div class="media-body">
                <h4 id="borrNom">John Doe</h4>
                <p id="borrCorr">Correo: jdoe@test.com</p>
                <p id="borrFech">Fecha de nacimiento: 01-01-2001 </p>
                <p id="borrSex">Sexo: Hombre </p>
                <p id="borrPass">Password: Hombre </p>
            </div>
          </div>
            <button id="eliminar" type="button" class="btn btn-success mt-3" onclick="eliminarUsuario(correo)">Borrar</button>
            <button id="close" type="button" class="btn btn-secondary mt-3" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
  </div>`
}

let btnActualizar = document.getElementById('actualizar');
var formAct = document.getElementById('formAct');

let borrNom = document.getElementById('borrNom');
let borrCorr = document.getElementById('borrCorr');
let borrFech = document.getElementById('borrFech');
let borrSex = document.getElementById('borrSex');
let borrUrl = document.getElementById('borrUrl');
let borrPass = document.getElementById('borrPass');
let eliminar = document.getElementById('eliminar');

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


//Funcion DELETE usuarios
function deleteUsers(){
    return{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': `${localStorage.token}`,
        'x-user-token': `${localStorage.responseToken}`
      }
    }
  }


//Funcion UPDATE usuarios
function updateUsers(bodyJSON){
    return{
      method: 'PUT',
      body: bodyJSON,
      headers: {
        'Content-Type': 'application/json',
        'x-auth': `${localStorage.token}`,
        'x-user-token': `${localStorage.responseToken}`
      }
    }
  }

//Administracion de Usuarios
let urlEnd = url + endpointUser;
//console.log(localStorage.token);
//console.log(localStorage.responseToken);
//console.log(urlEnd);

let lista = document.querySelector('#lista')
let list = '';
let usuario = {};

let respuesta = fetch(urlEnd, getUsers())
  .then(function(response) {
     return response.json()
     .then(data=>{
      data.forEach(e => {        
        //Insertar en HTML
        list += usersToHTML(e);
        return lista.innerHTML = list;
      });
    })
  })
  .then(function(myJson) {
    //console.log(myJson);
  });

  

function usersToHTML(user){

  let urlEdit = url + endpointUser + '/' + user.correo;  

  //console.log(urlEdit);
  /*let ans = fetch(urlEdit, getUsers())
  .then( function(response) {
     return response.json()
     .then(data=>{
       console.log(data);
       console.log(data.nombre);
      });
  })
  .then(function(myJson) {
    //console.log(myJson);
  }); */

  return `<div class="media col-8 mt-2" id="modelo">
          <div class="media-left align-self-center mr-3">
              <img class="rounded-circle" style="width: inherit;" src="${user.url}">
          </div>
          <div class="media-body">
              <h4>${user.nombre} ${user.apellido}</h4>
              <p >Correo: ${user.correo}</p>
              <p >Fecha de nacimiento: ${user.fecha} </p>
              <p >Sexo: ${(localStorage.sexo == 'H')?'Hombre':'Mujer'} </p>
          </div>
          <div class="media-right align-self-center">
              <div class="row">
                  <a href="#" class="btn btn-primary edit" onclick="verDetalle('${user.correo}')"><i class="fas fa-search edit  "></i></a>
              </div>
              <div class="row">
                  <a href="#" class="btn btn-primary mt-2" onclick="editUser('${user.correo}')"data-dismiss="modal" data-toggle="modal" data-target="#editar">
                  <i class="fas fa-pencil-alt edit  "></i></a>
              </div>
              <div class="row">
                  <a href="#" class="btn btn-primary mt-2" onclick="removeUser('${user.correo}')" data-dismiss="modal" data-toggle="modal" data-target="#borrar">
                  <i class="fas fa-trash-alt  remove "></i></i></a>
              </div>
          </div>
        </div>`

}

//Imprimir correo en consola
function verDetalle(correo){
  localStorage.detalleCorreo = correo;
  console.log(correo);
  window.location.href = "practica3HTTP/detalle.html"
}
function editUser(correo){

  let urlEdit = url + endpointUser + '/' + correo;

  console.log(urlEdit);
  let ans = fetch(urlEdit, getUsers())
  .then(function(response) {
     return response.json()
     .then(data=>{
       console.log(data);
       showUser(data);
      });
  })
  .then(function(myJson) {
    //console.log(myJson);
  });  
}


function removeUser(correo){
  console.log('remove user: ' + correo);

  let urlEdit = url + endpointUser + '/' + correo;

  console.log(urlEdit);
  let ans = fetch(urlEdit, getUsers())
  .then(function(response) {
     return response.json()
     .then(data=>{
       console.log(data);
       modalBorrar(data);
      });
  })
  .then(function(myJson) {
    //console.log(myJson);
  });

  
  
}


let ediNom = document.getElementById('editarNombre')
let ediApe = document.getElementById('editarApellido')
let ediUrl = document.getElementById('editarUrl')
let ediFec = document.getElementById('editarFecha')

//Show user in editUser button
function showUser(user){
  ediNom.innerHTML = `<input type="text" name="" id="editarNombre" class="form-control" placeholder="${user.nombre}" aria-describedby="helpId">`
  ediApe.innerHTML = `<input type="text" name="" id="editarApellido" class="form-control" placeholder="${user.apellido}" aria-describedby="helpId">`
  ediUrl.innerHTML = `<input type="url" name="" id="editarUrl" class="form-control mt-3" placeholder="${user.url}" aria-describedby="helpId">`       

  //guardar y cambiarlo a dd-mm-yyyy
  let newFecha = user.fecha.substring(6,10)+ '-'; //year
  newFecha += user.fecha.substring(3,5)+ '-'; //month
  newFecha += user.fecha.substring(0,2); //year
  console.log('fecha: ' + newFecha);
  ediFec.innerHTML = `<input type="date" id="editarFecha" class="form-control mt-3" value="${newFecha}" name="" id="" >`

  //console.log('user password: ' +user.password);

  localStorage.editarCorreo = user.correo;//lo guardamos para ponerlo en el urlEnd de Editar usuario al momento de hacer el PUT
  localStorage.editPass = user.password;//lo guardamos para ponerlo en el password de Editar usuario al momento de hacer el PUT
  localStorage.editNom = user.nombre;//lo guardamos para ponerlo en el nombre de Editar usuario al momento de hacer el PUT
  localStorage.editApe = user.apellido;//lo guardamos para ponerlo en el apellido de Editar usuario al momento de hacer el PUT
  localStorage.editUrl = user.url;//lo guardamos para ponerlo en el url de Editar usuario al momento de hacer el PUT
  localStorage.editFecha = user.fecha;//lo guardamos para ponerlo en la fecha de Editar usuario al momento de hacer el PUT
  localStorage.editSex = user.sexo;//lo guardamos para ponerlo en el sexo de Editar usuario al momento de hacer el PUT
              
}

btnActualizar.addEventListener('click', async function(e){
  event.preventDefault();
  let user = {};
  formAct.querySelectorAll('input').forEach(i =>{
    
    if(i.id == 'editarNombre'){
        if(i.value != '')
          user.nombre = i.value;
        else user .nombre = localStorage.editNom
    }
    if(i.id == 'editarApellido'){
      if(i.value != '')
        user.apellido = i.value;
      else user.apellido = localStorage.editApe
    }
    if(i.placeholder == 'Url'){
      if(i.value != '')
        user.url = i.value;
      else user.url = localStorage.editUrl

    }
    if(i.name == 'date'){//guardar y cambiarlo a dd-mm-yyyy
      if(i.value != '01-01-2000'){
        user.fecha = i.value.substring(8,10)+ '-';//day
        user.fecha += i.value.substring(5,7)+ '-';//month
        user.fecha += i.value.substring(0,4); //year
      }
      else user.fecha = localStorage.editFecha;
    }
    
  });

  user.password = localStorage.editPass;
  user.correo = localStorage.editarCorreo
  user.sexo = localStorage.editSex
  console.log(user);
  //Editar usuario
  let urlEnd = url + endpointUser + '/' + localStorage.editarCorreo;
  console.log(localStorage.token);
  console.log('editar correo: ' + localStorage.editarCorreo);
  console.log(urlEnd);
  console.log('user: ' + JSON.stringify(user));
  let response = await fetch(urlEnd, updateUsers(JSON.stringify(user)));

  if(response.status != 200)alert('Usuario no actualizado');
  else alert('Usuario actualizado exitosamente');
  location.reload();

  
})



//Borrar Usuario Modal



//Show user in borrar button
function modalBorrar(user){
  borrNom.innerHTML = `<h4 id="borrNom">${user.nombre} ${user.apellido}</h4>`
  borrCorr.innerHTML = `<p id="borrCorr">Correo: ${user.correo}</p>`
  borrFech.innerHTML = `<p id="borrFech">Fecha de nacimiento: ${user.fecha} </p>`       
  borrSex.innerHTML = `<p id="borrSex">Sexo: ${user.sexo} </p>`       
  //borrUrl.innerHTML = `<img id="borrUrl" class="rounded-circle" style="width: inherit;" src="${user.url}>`       
  borrPass.innerHTML = `<p id="borrPass">Password: ${user.password} </p>`                     
  eliminar.innerHTML = `<button id="eliminar" type="submit" class="btn btn-success mt-3" onclick="eliminarUsuario('${user.correo}')">Borrar</button>`                     
}

//Eliminar usuario

function eliminarUsuario(correo){
  //Eliminar usuario
  let urlEnd = url + endpointUser + '/' + correo;
  let respuesta = fetch(urlEnd, deleteUsers())
    .then(function(response) {
      alert('eliminado con exito');
      location.reload();
      return response.json()
    })
    .then(function(myJson) {
      //console.log(myJson);
    });
}