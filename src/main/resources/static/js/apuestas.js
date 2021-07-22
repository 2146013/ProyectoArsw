function ChatServiceURL() {
    return 'ws://localhost:8080/apuestasService';
}


var isMessageApuestaLocal= "";
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
        var parsed;
        console.log("On Message: ",evt);
        if (isNaN(evt.data)  ){

                try{
                    parsed = JSON.parse(evt.data);
                    console.log("entra parsejson &&&&&&&&&&&&&")

                }
                catch (e){


                        parsed=  evt.data;
                        console.log("entra catcht normi &&&&&&&&&&&&&")

                }




        }
        else{

                parsed= parseInt(evt.data)
                console.log("entra parseint &&&&&&&&&&&&&")

        }
        console.log(parsed,"qye es parsed?")
        if(evt.data != "Connection established." && (parsed !== "apuestalocal" && parsed !== "apuestavisitante" ) &&  parsed != "number" &&parsed != undefined){
            console.log(evt.data,parsed,parsed !== "apuestavisitante")
            this.received(evt.data);
        }
        console.log(evt,evt.returnValue,"return value?",evt.returnValue==true,typeof parsed, parsed,"///////////////7")

        if(typeof parsed =="string" && parsed == "apuestalocal"){
            isMessageApuestaLocal = true;
        }
        if(typeof parsed =="string" && parsed == "apuestavisitante"){
            isMessageApuestaLocal = false;
        }
        if(typeof parsed == "number" && isMessageApuestaLocal == true){

            console.log(parsed,'parseado',typeof parsed)
            console.log()
            document.getElementById("container-apuestas-locales").innerHTML = `<p class="meta">${parseInt(evt.data)}</p>`;


            console.log("recibe mensaje ev.data", evt.data)
            console.log("salaapuestas",salaapuestas,"ev.data",evt.data)
            document.getElementById("container-apuestas-general").innerHTML = `<p class="meta">${parseInt(evt.data)}</p>`;

            salaapuestas = parseInt(evt.data)
            localapuestas = parseInt(evt.data)
            //localapuestas = parse
        }
        console.log(typeof parsed == "number" && isMessageApuestaLocal == false , typeof parsed , isMessageApuestaLocal )
        if(typeof parsed == "number" && isMessageApuestaLocal == false){
            console.log(parsed,'parseado')
            console.log()
            document.getElementById("container-apuestas-visitantes").innerHTML = `<p class="meta">${parseInt(evt.data)}</p>`;
            document.getElementById("container-apuestas-general").innerHTML = `<p class="meta">${parseInt(evt.data)}</p>`;


            console.log("recibe mensaje ev.data", evt.data)
            console.log("salaapuestas",salaapuestas,"ev.data",evt.data)
            salaapuestas = parseInt(evt.data)
            visitanteapuestas = parseInt(evt.data)
            //localapuestas = parse
        }
        else{
          salaapuestas = salaapuestas
        }
    }

    sendToServer(tipo,user,room,message,valor){

        let msg = `{ "tipo": "${tipo}", "sala": "${room}" , "nombreusuario": "${user}" , "message": "${message}","valor": "${valor}" ,"valorLocal":"${isLocalApuesta?valor:0}","valorVisitante":"${isLocalApuesta?0:valor}"}`;
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
var isLocalApuesta=false;
var visitanteapuestas=0;
var apuestaactual=0;
var sp1 = document.querySelector('.container-apuestas-general');
var sl1 = document.querySelector('.container-apuestas-locales');
var sv1 = document.querySelector('.container-apuestas-visitantes');

const apuesta50L = document.getElementById('50KL').addEventListener('click',(e)=>{
    console.log(e);
    var val= 50;
    isLocalApuesta = true;
    const msg=  'Ha apostado 50 K por equipo local';
    apuestaactual=50;
    salaapuestas+=apuestaactual;
    localapuestas += apuestaactual;
    console.log( msg)
    comunnicationWS.sendToServer("ApuestasBot",nombreusuario,chatRoom,msg ,apuestaactual);



});
const apuesta100L = document.getElementById('100KL').addEventListener('click',(e)=>{
    console.log(e);
    var val= 1000;
    const msg=  'Ha apostado 100 K por equipo local';
    apuestaactual=100;
    salaapuestas+=apuestaactual;
    localapuestas += apuestaactual;
    //salaapuestas+=100;
    console.log( msg)
    comunnicationWS.sendToServer("ApuestasBot",nombreusuario,chatRoom,msg ,apuestaactual);



});
const apuesta150L = document.getElementById('150KL').addEventListener('click',(e)=>{
    console.log(e);
    var val= 150;
    const msg=  'Ha apostado 150 K por equipo local';

    apuestaactual=150;
    salaapuestas+=apuestaactual;
    localapuestas += apuestaactual;
    console.log( msg)
    comunnicationWS.sendToServer("ApuestasBot",nombreusuario,chatRoom,msg ,apuestaactual);


    });
const apuesta50V = document.getElementById('50KV').addEventListener('click',(e)=>{
    console.log(e);
    var val= 50;
    const msg=  'Ha apostado 50 K por equipo Visitante';
    //salaapuestas+=50;
    apuestaactual=50;
    salaapuestas+=apuestaactual;
    visitanteapuestas += apuestaactual;
    console.log( msg)
    comunnicationWS.sendToServer("ApuestasBot",nombreusuario,chatRoom,msg ,apuestaactual);



});
const apuesta100V = document.getElementById('100KV').addEventListener('click',(e)=>{
    console.log(e);
    var val= 1000;
    const msg=  'Ha apostado 100 K por equipo visitante';
    //salaapuestas+=100;
    apuestaactual=100;
    salaapuestas+=apuestaactual;
    visitanteapuestas += apuestaactual;
    console.log( msg)
    comunnicationWS.sendToServer("ApuestasBot",nombreusuario,chatRoom,msg ,apuestaactual);



});
const apuesta150V = document.getElementById('150KV').addEventListener('click',(e)=>{
    console.log(e);
    var val= 150;
    const msg=  'Ha apostado 150 K por equipo visitante';
    //salaapuestas+=150;
    apuestaactual=150;
    salaapuestas+=apuestaactual;
    visitanteapuestas += apuestaactual;
    console.log( msg)
    comunnicationWS.sendToServer("ApuestasBot",nombreusuario,chatRoom,msg ,apuestaactual);


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
