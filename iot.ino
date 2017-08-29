int led_rojo = 6;                //Pin actuador lampara

void setup() {                    //arranque inicial
  Serial.begin(115200);           // Se inicia la comunicacion serial
  // init LEDS
  pinMode(led_rojo,OUTPUT);    //se declara como salida los pines para led_pin 10
  //pinMode(led_verde,OUTPUT);   //se declara como salida los pines para pwmPin 9
  //pinMode(led_azul,OUTPUT);    //se declara como salida los pines para pin 8
  digitalWrite(led_rojo,0);     //se inicia como apagado en 10
  //analogWrite(led_verde,0);    //se inicia como apagado en 9
  //analogWrite(led_azul,0);     //se inicia como apagado en 8
}
void loop() {                       //ciclo donde se ejecutara todo
  // Recibir datos desde el node y escribir en una cadena
  //  lee una letra y que recoja el valor segun ello
   if(Serial.available()>0){
    lectura = Serial.read();
    //Serial.println(lectura);
    switch (lectura) {
      case 'a':
        lectura = Serial.parseInt();
        digitalWrite(led_rojo,lectura);
        break;
      case 'b':
        lectura = Serial.parseInt();
        digitalWrite(led_verde,lectura);
        break;
        case 'c':
        lectura = Serial.parseInt();
        digitalWrite(led_azul,lectura);
        break;
      case 'd':
        lectura = Serial.parseInt();
        digitalWrite(lampara,lectura);
        break;
      default:
        // if nothing else matches, do the default
        // default is optional
      break;
    }

   }
  //delay(500); // give the Arduino some breathing room.
}
