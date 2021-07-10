const nombreUsuario=document.querySelector("#nombreUsuario")
const divCharlar = document.querySelector('#charlar') 
const segundoTitulo = document.querySelector('#segundoTitulo') 
const listadoChats = document.querySelector('#listadoChats') 
const fotoPortada = document.querySelector('#fotoPortada') 
var user=''

pantallaInicio();

function pantallaInicio(){ 
    user='nadie';
  //  console.log('En Pantalla Inicio, usuario: '+user)
    nombreUsuario.innerHTML='SELECCIONA USUARIO:';
     botones.innerHTML=`
       <button type="button" class="btn btn-success mr-20" id='entrarRoberto' >ENTRAR USUARIO A</button>
       `
     botones.innerHTML +=`
       <button type="button" class="btn btn-warning mr-20" id='entrarNastya' >ENTRAR USUARIO B</button>
       `
     segundoTitulo.innerHTML ='Quieres entrar al Chat?';   
       //divCharlar.innerHTML=``
    //divCharlar.classList='container input-group d-none' //hace visible el DIV    console.log("CLASS LIST DE DIVCARLAR" + divCharlar.classList);
    divCharlar.style.display='none';
    listadoChats.style.display='none';
    fotoPortada.style.display='block';
     //console.log("estilo del div :"+ divCharlar.style.display);
       //cick sobre alguno de los botones de entrar
    iniciarSesion();
}
//} while (true);  //salir al marcar matare el navegador              
    
    
    function iniciarSesion () {
        const btnEntrarRoberto = document.querySelector('#entrarRoberto')
        btnEntrarRoberto.addEventListener('click',() => {
        //ACCEDER ROBERTO  
        user='user1'        
      //  divCharlar.classList='container input-group d-block' //hace visible el DIV
        segundoTitulo.innerHTML ='Listado de Mensajes';
        divCharlar.style.display='block';
        listadoChats.style.display='block';
        fotoPortada.style.display='none';
       // console.log("estilo del div :"+ divCharlar.style.display);
        nombreUsuario.innerHTML='USUARIO: '+ user
      //  console.log('Click en Boton ROBERTO, Usuario: ' +user)
        botones.innerHTML=`
        <button type="button" class="btn btn-danger mr-20" id='salirChat' >SALIR DEL CHAT</button>
        `   
        chatear(user);   
      })
        const btnEntrarNastya = document.querySelector('#entrarNastya')
        btnEntrarNastya.addEventListener('click',() => {
            //ACCEDER NASTYA
            user='user2'
            //divCharlar.classList='container input-group d-block' //hace visible el DIV            nombreUsuario.innerHTML='ПОЛЬЗОВАТЕЛЯ: '+ user
            segundoTitulo.innerHTML ='Listado de Mensajes';
            divCharlar.style.display='block';
            listadoChats.style.display='block';
            fotoPortada.style.display='none';
          //  console.log('Click en Boton NASTIA, Usuario: ' +user)
            botones.innerHTML=`
            <button type="button" class="btn btn-danger mr-20" id='salirChat' >SALIR DEL CHAT</button>
            `   
            chatear(user);   
           
       })     
    }   
 
    function chatear(user) {
      // maneja eventos de Enviar mensaje, enviar fotoy sali  
      const enviarChat = document.querySelector('#enviarMensaje') 
      const inputChat = document.querySelector('#inputChat')
      enviarChat.addEventListener('click', () => {
             if (!inputChat.value.trim()){
            //  console.log("MENSAJE VACIO") 
              return;
             }
             firebase.firestore().collection('chat').add({
               usuari: user,
               mensaje: inputChat.value,
               fechayhora: Date.now()
             })
             .then(res => {console.log("mensaje guardado")} )
             .catch(e => console.log("Error al guardar el mensaje "+e))

           //  console.log("CLICK SOBRE ENVIAR MENSAJE")           
           //  console.log("usuario: "+user+" mensaje a enviar: "+inputChat.value);
             inputChat.value ='' //borra lo de antes  
             focus(inputChat) ;  

             //LEEMOS LOS MENSAJES DE FIRESTORE Y LOS MOSTRAMOS
             firebase.firestore().collection('chat').orderBy('fechayhora')
             //.where("usuario", "==", user)
             .onSnapshot(query => { // se activa automaticamente al añadir un nuevo documento
             //  var misMensajes = [];
                listadoChats.innerHTML = ''
                 query.forEach(doc => {
                  if(doc.data().usuari === user){
                    listadoChats.innerHTML +=`<div class="d-flex justify-content-end align-items-end">            
                    <span class="badge bg-primary rounded-pill fs-6">${doc.data().mensaje}</span>
                  </div>`
                  }else{
                    listadoChats.innerHTML +=`<div class="d-flex justify-content-start  align-items-end">
                    <span class="badge bg-secondary rounded-pill fs-6">${doc.data().mensaje}</span>
                  </div>`
                  } 
                  listadoChats.scrollTop=listadoChats.scrollHeight
                //console.log("Historico menasajes mio: "+doc.data().mensaje);
                //misMensajes.push(doc.data().mensaje);
                });
                 // console.log("HISTORICO DE MIS MENSAJES: ", misMensajes.join(", "));
              });  
      })    
      const salirChat = document.querySelector('#salirChat') 
      salirChat.addEventListener('click', () => {
   //   console.log("CLICK SOBRE SALIR")
         //click sobre salir y confirmar con una ventana emergente
         // ventana emergente y pregunta console.log("Sacar el menu pupup")
         //xxxx.innerHTML='Хочешь выйти oт чатa?'
          pantallaInicio()        
      })       
      const enviarFoto = document.querySelector('#enviarFoto') 
      const inputFoto = document.querySelector('#inputFoto') 
      enviarFoto.addEventListener('click', () => {

          firebase.firestore().collection('chat').add({
            usuari: user,
            mensaje: inputFoto.value,
            fechayhora: Date.now()
          })
          .then(res => {console.log("mensaje guardado")} )
          .catch(e => console.log("Error al guardar el mensaje "+e))

     //      console.log("CLICK SOBRE ENVIAR FOTO")
     //      console.log("usuario: "+user+" FOTO a enviar: "+inputFoto.value)
           inputFoto.value='' //borra lo de ante
      })   
    }

    