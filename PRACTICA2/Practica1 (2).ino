/*Practica 1 Fase 2*/
#include <SoftwareSerial.h>
SoftwareSerial BT(10, 11); // RX, TX
#include <DHT.h>
#include <LiquidCrystal.h>
#define DHTPIN 2
#define COLS 16
#define ROWS 2
#define VELOCIDAD 300
#define DHTTYPE DHT11
/*Practica 1 Fase 1*/
/*Practica 1 Fase 2*/
#include <Wire.h>
#include <RTClib.h>
#define DELAY 500
#define VIN 5
#define R 10000
/*Practica 1 Fase 2*/
/*Practica 1 Fase 1*/
DHT dht(DHTPIN, DHTTYPE);
LiquidCrystal lcd(12, 11, 10, 9, 8, 7);
String Texto = "Temperatura", Texto1 = "asd", Texto2 = "Humedad", Texto3 = "";
String Texto4 = "Direccion Viento", Texto5 = "";
String Texto9 = "Velocidad Viento", Texto10 = "";
float Calculo_Velocidad = 0.0;
float velocidad1 = 0.0;
/*Practica 1 Fase 1*/

/*Practica 1 Fase 2*/
RTC_DS3231 rtc;
const int sensorPin = A0;
int sensorVal, Luminosidad;
String EstadoClima = "", Lluvia = "", Calor = "", VelocidadV = "";
byte SNorte = 3, SSur = 4, SEste = 5, SOeste = 6;
int direc = 0;
String DiaSemana = "", Fecha = "";
String ArregloSemana[7] = {"Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"};

/*Practica 1 Fase 2*/

void setup() {
  /*Practica 1 Fase 1*/
  // Inicializamos comunicación serie
  Serial.begin(9600);
  BT.begin(38400);
  // Comenzamos el sensor DHT
  dht.begin();
  lcd.begin(COLS, ROWS);
  analogReference(DEFAULT);

  pinMode(SNorte, INPUT);
  pinMode(SSur, INPUT);
  pinMode(SEste, INPUT);
  pinMode(SOeste, INPUT);
  /*Practica 1 Fase 1*/
  /*Practica 1 Fase 2*/
  if (!rtc.begin()) {

    while (1);
  }
  // Ponemos en hora, solo la primera vez, luego comentar y volver a cargar.
  // Ponemos en hora con los valores de la fecha y la hora en que el sketch ha sido compilado.
  //   rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
  /*Practica 1 Fase 2*/
}

void loop() {
  delay(3000);
  Direccion();
  Humedad();
  Velocidad();
  Dias();
  Visibilidad();
  Serial.println(Fecha  + "$" + Texto1  + "$" + Luminosidad + "$" + Texto5 + "$" + Texto10 + "$" + Texto3 + "$" + VelocidadV + "$" + EstadoClima + "$" + Lluvia + "$" + Calor + "$" + DiaSemana);
  BT.println(Fecha  + "$" + Texto1  + "$" + Luminosidad + "$" + Texto5 + "$" + Texto10 + "$" + Texto3 + "$" + VelocidadV + "$" + EstadoClima + "$" + Lluvia + "$" + Calor + "$" + DiaSemana);
}
void Dias() {
  DateTime reloj = rtc.now();

  Fecha = String(reloj.year());
  if (reloj.month() < 10) {
    Fecha.concat("0" + String(reloj.month()));
  } else {
    Fecha.concat(String(reloj.month()));
  }
  if (reloj.day() < 10) {
    Fecha.concat("0" + String(reloj.day()));
  } else {
    Fecha.concat(String(reloj.day()));
  }

  DiaSemana = ArregloSemana[reloj.dayOfTheWeek()];
}

void Direccion() {

  if (digitalRead(SNorte) == LOW) {
    Texto5 = "Norte";
    direc = 0;
  }  else  if (digitalRead(SEste) == LOW) {
    Texto5 = "Este";
    direc = 1;
  } else  if (digitalRead(SOeste) == LOW) {
    Texto5 = "Oeste";
    direc = 2;
  } else if (digitalRead(SSur) == LOW) {
    Texto5 = "Sur";
    direc = 3;
  } else {

  }
  delay(300);
}

void Humedad() {
  // Leemos la humedad relativa
  float h = dht.readHumidity();
  // Leemos la temperatura en grados centígrados (por defecto)
  float t = dht.readTemperature();
  // Leemos la temperatura en grados Fahreheit
  float f = dht.readTemperature(true);

  // Comprobamos si ha habido algún error en la lectura
  if (isnan(h) || isnan(t) || isnan(f)) {
    //Serial.println("Error obteniendo los datos del sensor DHT11");
    return;
  }

  // Calcular el índice de calor en Fahreheit
  float hif = dht.computeHeatIndex(f, h);
  // Calcular el índice de calor en grados centígrados
  float hic = dht.computeHeatIndex(t, h, false);
  Texto1 = String(t);
  Texto3 = h;
  if (h > 70) {
    Lluvia = "Con";
  } else {
    Lluvia = "Sin";
  }

  if (t > 30) {
    Calor = "Con";
  } else {
    Calor = "Sin";
  }
}

void Velocidad() {
  velocidad1 = (analogRead(A1));

  Calculo_Velocidad = (0.649) * velocidad1 - 623.11;
  if (Calculo_Velocidad < 0) {
    Texto10 = String(0);
  } else {
    Texto10 = Calculo_Velocidad;
  }

  if (Calculo_Velocidad > 30) {
    VelocidadV = "Alto";
  } else {
    VelocidadV = "Normal";
  }
  delay(1000);
}

void Visibilidad() {
  sensorVal = analogRead(sensorPin);
  Luminosidad = Conversor(sensorVal);
  //  Serial.println(String(Luminosidad));
  if (Luminosidad > 170) {
    EstadoClima = "Despejado";
  } else {
    EstadoClima = "Nublado";
  }
  delay(500);
}

int Conversor(int raw) {
  // Conversion rule
  float Vout = float(raw) * (VIN / float(1023));// Conversion analog to voltage
  float RLDR = (R * (VIN - Vout)) / Vout; // Conversion voltage to resistance
  int phys = 500 / (RLDR / 1000); // Conversion resitance to lumen
  return phys;
}
