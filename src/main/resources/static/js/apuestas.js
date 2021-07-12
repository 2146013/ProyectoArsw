function ChatServiceURL() {
    return 'ws://localhost:8080/apuestasService';
}



class WSChatChanel {
    constructor(URL, callback){

        this.URL = URL;
        this.wsocket = new WebSocket(URL);
        this.wsocket.onopen = (evt) => this.onOpen(evt);
        this.wsocket.onmessage = (evt) => this.onMessage(evt);
        this.wsocket.onError = (evt) => this.onError(evt);
        this.received = callback; // Esto me envia a la clase o lugar donde me
        // llamaron
    }

    onOpen(evt){
        console.log("On Open: ",evt);
    }

    onError(evt){
        console.log("On Error: ",evt);
    }


    onMessage(evt){
        console.log("On Message: ",evt);
        if(evt.data != "Connection established."){
            this.received(evt.data);
        }
        console.log(evt,evt.returnValue,"return value?",evt.returnValue==true)
        var parsed = JSON.parse(evt.data);
        if(typeof parsed == "number"){

            console.log(parsed,'parseado')
            console.log()
            document.getElementById("container-apuestas-general").innerHTML = `<p class="meta">${parseInt(evt.data)}</p>`;
            console.log("recibe mensaje ev.data", evt.data)
            console.log("salaapuestas",salaapuestas,"ev.data",evt.data)
            salaapuestas = parseInt(evt.data)
            localapuestas = parse
        }
        else{
          salaapuestas = salaapuestas
        }
    }

    sendToServer(tipo,user,room,message,valor){
        let msg = `{ "tipo": "${tipo}", "sala": "${room}" , "nombreusuario": "${user}" , "message": "${message}","valor": "${valor}" }`;
        this.wsocket.send(msg);

    }
}


const nombreusuario = document.getElementById('nombreusuario').innerText;
console.log(nombreusuario,"nombre usuario",)
const chatRoom = document.getElementById('room-name').innerText;
const users = document.getElementById('users');
const sendButton = document.getElementById('send');
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');



let comunnicationWS = new WSChatChanel (ChatServiceURL(),
    (msg,b) => {

        var mensaje = JSON.parse(msg);
        console.log("El JSON: ",mensaje);
        if(mensaje.tipo == "userMessage"){
            userMessage(mensaje);
        }else if(mensaje.userList){
            showUserList(mensaje.userList);
        } else{
            //if(!b){
                botMessage(mensaje);



        }


    });

function refreshDiv(){

}


function showUserList(userList){
    users.innerHTML = `${userList.map(usr => `<li>${usr}</li>`).join('')}`;
}

function botMessage(mensaje){
    const div = document.createElement('div');
    div.classList.add('message');
    if (mensaje && mensaje.tipo ){
        div.innerHTML = `<p class="meta">${mensaje.tipo} <span> ${mensaje.time}</span></p>
		
		<p class="text">${mensaje.nombreusuario}  ${mensaje.message}</p>
	`;

        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }


}

function userMessage(mensaje){

    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${mensaje.nombreusuario} <span> ${mensaje.time}</span></p>
		
		<p class="text">${mensaje.message}</p>
	`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
var salaapuestas= 0;
var localapuestas=0;
var visitanteapuestas=0;
var sp1 = document.querySelector('.container-apuestas-general');

const apuesta50L = document.getElementById('50KL').addEventListener('click',(e)=>{
    console.log(e);
    var val= 50;
    const msg=  'Ha apostado 50 K por equipo local';
    salaapuestas+=50;
    localapuestas += 50;
    console.log( msg)
    comunnicationWS.sendToServer("ApuestasBot",nombreusuario,chatRoom,msg ,50);


    //const div = document.createElement('div');
    //sp1.setAttribute("id", "container-apuestas-general");



    //div.innerHTML = `<p class="meta">${salaapuestas}</p>
	//`;
   // sp1.appendChild(div);
// crear algún contenido para el nuevo elemento
    //var sp1_content = document.createTextNode("Nuevo elemento span para reemplazo.");

// aplicar dicho contenido al nuevo elemento
   // sp1.appendChild(sp1_content);
   // $( "#container-apuestas-general" ).load(window.location.href + " #container-apuestas-general" );
});
const apuesta100L = document.getElementById('100KL').addEventListener('click',(e)=>{
    console.log(e);
    var val= 1000;
    const msg=  'Ha apostado 100 K por equipo local';
    salaapuestas+=100;
    console.log( msg)
    comunnicationWS.sendToServer("ApuestasBot",nombreusuario,chatRoom,msg ,100);


    //const div = document.createElement('div');
    //sp1.setAttribute("id", "container-apuestas-general");



    //div.innerHTML = `<p class="meta">${salaapuestas}</p>
    //`;
    // sp1.appendChild(div);
// crear algún contenido para el nuevo elemento
    //var sp1_content = document.createTextNode("Nuevo elemento span para reemplazo.");

// aplicar dicho contenido al nuevo elemento
    // sp1.appendChild(sp1_content);
    // $( "#container-apuestas-general" ).load(window.location.href + " #container-apuestas-general" );
});
const apuesta150L = document.getElementById('150KL').addEventListener('click',(e)=>{
    console.log(e);
    var val= 150;
    const msg=  'Ha apostado 150 K por equipo local';
    salaapuestas+=150;
    console.log( msg)
    comunnicationWS.sendToServer("ApuestasBot",nombreusuario,chatRoom,msg ,150);


    //const div = document.createElement('div');
    //sp1.setAttribute("id", "container-apuestas-general");



    //div.innerHTML = `<p class="meta">${salaapuestas}</p>
    //`;
    // sp1.appendChild(div);
// crear algún contenido para el nuevo elemento
    //var sp1_content = document.createTextNode("Nuevo elemento span para reemplazo.");

// aplicar dicho contenido al nuevo elemento
    // sp1.appendChild(sp1_content);
    // $( "#container-apuestas-general" ).load(window.location.href + " #container-apuestas-general" );
});
const apuesta50V = document.getElementById('50KV').addEventListener('click',(e)=>{
    console.log(e);
    var val= 50;
    const msg=  'Ha apostado 50 K por equipo Visitante';
    salaapuestas+=50;
    console.log( msg)
    comunnicationWS.sendToServer("ApuestasBot",nombreusuario,chatRoom,msg ,50);


    //const div = document.createElement('div');
    //sp1.setAttribute("id", "container-apuestas-general");



    //div.innerHTML = `<p class="meta">${salaapuestas}</p>
    //`;
    // sp1.appendChild(div);
// crear algún contenido para el nuevo elemento
    //var sp1_content = document.createTextNode("Nuevo elemento span para reemplazo.");

// aplicar dicho contenido al nuevo elemento
    // sp1.appendChild(sp1_content);
    // $( "#container-apuestas-general" ).load(window.location.href + " #container-apuestas-general" );
});
const apuesta100V = document.getElementById('100KV').addEventListener('click',(e)=>{
    console.log(e);
    var val= 1000;
    const msg=  'Ha apostado 100 K por equipo visitante';
    salaapuestas+=100;
    console.log( msg)
    comunnicationWS.sendToServer("ApuestasBot",nombreusuario,chatRoom,msg ,100);


    //const div = document.createElement('div');
    //sp1.setAttribute("id", "container-apuestas-general");



    //div.innerHTML = `<p class="meta">${salaapuestas}</p>
    //`;
    // sp1.appendChild(div);
// crear algún contenido para el nuevo elemento
    //var sp1_content = document.createTextNode("Nuevo elemento span para reemplazo.");

// aplicar dicho contenido al nuevo elemento
    // sp1.appendChild(sp1_content);
    // $( "#container-apuestas-general" ).load(window.location.href + " #container-apuestas-general" );
});
const apuesta150V = document.getElementById('150KV').addEventListener('click',(e)=>{
    console.log(e);
    var val= 150;
    const msg=  'Ha apostado 150 K por equipo visitante';
    salaapuestas+=150;
    console.log( msg)
    comunnicationWS.sendToServer("ApuestasBot",nombreusuario,chatRoom,msg ,150);


    //const div = document.createElement('div');
    //sp1.setAttribute("id", "container-apuestas-general");



    //div.innerHTML = `<p class="meta">${salaapuestas}</p>
    //`;
    // sp1.appendChild(div);
// crear algún contenido para el nuevo elemento
    //var sp1_content = document.createTextNode("Nuevo elemento span para reemplazo.");

// aplicar dicho contenido al nuevo elemento
    // sp1.appendChild(sp1_content);
    // $( "#container-apuestas-general" ).load(window.location.href + " #container-apuestas-general" );
});


chatForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Para que no se actualice la pagina
    const msg = e.target.elements.msg.value;
    console.log(e)
    comunnicationWS.sendToServer("userMessage",nombreusuario,chatRoom,msg,salaapuestas);
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();

});


comunnicationWS.onOpen = () => comunnicationWS.sendToServer("ApuestasBot",nombreusuario,chatRoom,"has joined.",0);

// Funciona bien pero no imrpime ni muestra alerts.
window.addEventListener('beforeunload',() => {
    comunnicationWS.sendToServer("ApuestasBot",nombreusuario,chatRoom,"has left.",salaapuestas);
});
