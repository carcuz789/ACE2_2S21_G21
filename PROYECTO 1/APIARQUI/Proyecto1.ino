#include <Wire.h>
#include <RTClib.h>
#include "HX711.h"
#define DEBUG_HX711
#define CALIBRACION -3000.01

const byte pinData = 4;
const byte pinClk = 5;
HX711 bascula;
RTC_DS3231 rtc;
const byte Trigger = 2;
const byte Echo = 3;
long t, d;
double ContadorI = 0, ContadorF = 0, TiempoTranscurrido = 0, sumi = 0, sumf = 0;
int DiaInicio = 0, DiaFin = 0, Contador = 0;
String HoraInicio = "", HoraFin = "";
String FechaInicio = "", FechaFin = "";
double horai = 0, horaf = 0, mini = 0, minf = 0, peso;
String DiaSemana = "", AuxHoraInicio = "", AuxHoraFin = "", AuxFechaInicio = "", AuxFechaFin = "";
String ArregloSemana[7] = {"Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"};

void setup() {
  Serial.begin(9600);
  pinMode(Trigger, OUTPUT);
  pinMode(Echo, INPUT);
  digitalWrite(Trigger, LOW);

  if (!rtc.begin()) {

    while (1);
  }

  bascula.begin(pinData, pinClk);
  bascula.set_scale(CALIBRACION);
  bascula.tare();
  // Ponemos en hora, solo la primera vez, luego comentar y volver a cargar.
  // Ponemos en hora con los valores de la fecha y la hora en que el sketch ha sido compilado.
  //   rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
}

void loop()
{
  Pesa();
  Distancia();
  Periodos();
  delay(1000);

}


void Distancia() {
  digitalWrite(Trigger, HIGH);
  delayMicroseconds(10);
  digitalWrite(Trigger, LOW);
  t = pulseIn(Echo, HIGH);
  d = t / 59;

  delay(1000);

}

void Periodos() {
  DateTime reloj = rtc.now();

  //Si la distancia es menor que 10 cm entonces esta sentado
  if (d < 10 and ContadorI == 0) {
    ContadorI += 1;
    //Almacenamos la hora en la que se sienta
    horai = reloj.hour() * 60;
    mini = reloj.minute() + (reloj.second() / 60);
    sumi = horai + mini;
    HoraInicio = String(reloj.hour());
    HoraInicio.concat(":");
    HoraInicio.concat(String(reloj.minute()));
    HoraInicio.concat(":");
    HoraInicio.concat(String(reloj.second()));
    //Almancenamos la fecha en la que se sienta
    FechaInicio = String(reloj.year());
    if (reloj.month() < 10) {
      FechaInicio.concat("0" + String(reloj.month()));
    } else {
      FechaInicio.concat(String(reloj.month()));
    }
    if (reloj.day() < 10) {
      FechaInicio.concat("0" + String(reloj.day()));
    } else {
      FechaInicio.concat(String(reloj.day()));
    }
    DiaInicio = reloj.day();
    DiaSemana = ArregloSemana[reloj.dayOfTheWeek()];

    ContadorF = 0;

  }

  if (d > 10 and ContadorF == 0) {
    ContadorF++;
    //Si la distancia es mayor a 10 es porque se ha levantado
    //Almacenamos la hora en la que se levanta
    horaf = reloj.hour() * 60;
    minf = reloj.minute() + (reloj.second() / 60);
    sumf = horaf + minf;
    HoraFin = String(reloj.hour());
    HoraFin.concat(":");
    HoraFin.concat(String(reloj.minute()));
    HoraFin.concat(":");
    HoraFin.concat(String(reloj.second()));
    //Almancenamos la fecha en la que se levanta
    FechaFin = String(reloj.year());
    if (reloj.month() < 10) {
      FechaFin.concat("0" + String(reloj.month()));
    } else {
      FechaFin.concat(String(reloj.month()));
    }
    if (reloj.day() < 10) {
      FechaFin.concat("0" + String(reloj.day()));
    } else {
      FechaFin.concat(String(reloj.day()));
    }

    DiaFin = reloj.day();
    ContadorI = 0;
    Contador++;
    if (!DiaSemana.equals("")) {
      Tiempo();
      Serial.println(HoraInicio  + "$" + HoraFin  + "$" + FechaInicio + "$" + FechaFin + "$" + TiempoTranscurrido + "$" + Contador + "$" + peso + "$" + DiaSemana);

    }
  }


}

void Tiempo() {
  TiempoTranscurrido = (sumf - sumi) / 60;
}

void Pesa() {
#ifdef DEBUG_HX711
  if (bascula.get_units() >= 0) {
    peso = bascula.get_units() * 2.2;

  }

#endif
}
