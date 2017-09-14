var sock=io.connect('http://localhost:4000');
var rojo=0;var verde=0; var azul=0;
//puede borrarse
setInterval(function(){
	sock.emit("send","desde el cliente");
},10000);

sock.on('luces', function (data) {
			var red=data.r; console.log("luces:"+red);
		});

//comprobar  si esta online con el servidor.
sock.on('disconnect', function ()
   {    console.log('desconectado!');
        alert("Se perdio conexion con el servidor");
        //open(location, '_self').close();
   });
//=================== aki pruebo con firebase =====================\\\\\\\\\\\\\\\\\\
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCL3aOba5DDiVAEAudGGOUL9gfB2TGnvTo",
  authDomain: "ccbol-2017.firebaseapp.com",
  databaseURL: "https://ccbol-2017.firebaseio.com",
  projectId: "ccbol-2017",
  storageBucket: "ccbol-2017.appspot.com",
  messagingSenderId: "10555400118"
};
firebase.initializeApp(config);
  console.log("se inicializo firebase!!");
  var bdSensores= firebase.database().ref().child('Luces');
  var bdActuadores= firebase.database().ref().child('actuadores');

// recuperar datos
bdSensores.on('value', function(snapshot){
   var s= snapshot.val();
  console.log("rojo_js:"+s.rojo);
  console.log("verde_js"+s.verde);
  console.log("azul_js"+s.azul);
  sock.emit('sliderval','r'+s.rojo);
  sock.emit('sliderval','v'+s.verde);
  sock.emit('sliderval','a'+s.azul);
});
// escribir datos
function actualizarFB(a,b,c){

bdSensores.update({
  azul:c,
  rojo:a,
  verde:b
  
});
}
//=====================fin ==========================================\\\\\\\\\\\\\\\\\\\\\
/////////////////////////////////////////////////////
iosocket=sock;/*
iosocket.on('sensor', function (data) {
		    rojo=data.sr;
		    verde=data.sv;
		    azul=data.sa;
        console.log("rojo->:"+rojo);
        console.log("verde->:"+verde);
        console.log("azul->:"+azul);
        //actualizarFB(rojo,verde,azul);
		}); */


