var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();

var socketio = require('socket.io').listen(4000);
var SerialPort = require('serialport');

//var serial_port;
//var portName = 'COM41';///dev/ttyAMA0
//var firebase = require("firebase");
var sendData = "0";
// socket IO
socketio.sockets.on("connection",function(socket){
    socket.on('send',function(){
        console.log("<--dede cliente");
        //socket.broadcast.emit('luces', {r:sendData});
    });
    socket.on('sliderval', function(data) {
        dato=data;
        serial_port.write(dato);
        console.log("enviado al Arduino:"+dato);
    });

});
//
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var SerialPort = require('serialport');
var serial_port = new SerialPort('COM45', {
  baudRate: 115200
});
 
serial_port.write('a255', function(err) {
  if (err) {
    return console.log('Error on write: ', err.message);
  }
  console.log('message written');
});
 
serial_port.on('open', function() {
  serial_port.on('data', function (data) {
    //console.log('Data:', data);
    //receivedData += data.toString();
    //console.log('Data:'+ data);
    var receivedData = ""+data;
    if (receivedData .indexOf('E') >= 0 && receivedData .indexOf('B') >= 0) {
                sendData = receivedData .substring(receivedData .indexOf('B') + 1, receivedData .indexOf('E'));
                  var colores = sendData;
                  var s = colores.split(" ");console.log("---------------");
                  var sr=s[0];
                  var sv=s[1];
                  var sa=s[2];
                  console.log('rojo:'+sr+' verde:'+sv+' azul:'+sa);
                  socketio.emit('sensor',{r:sr,v:sv,a:sa} );
                receivedData = '';
        }

  });
});
/*
setInterval(function(){
  var r=parseInt(Math.random() *(255 - 0) + 0);
  var v=parseInt(Math.random() *(255 - 0) + 0);
  var a=parseInt(Math.random() *(255 - 0) + 0);
    serial_port.write('a'+r);
    serial_port.write('r'+r);
    serial_port.write('v'+r);
    console.log("enviado a Arduino:"+r+" "+v+" "+a);
},1600);*/
module.exports = app;
