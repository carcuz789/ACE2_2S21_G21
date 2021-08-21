#include <DHT.h>
#include <LiquidCrystal.h>


// Definimos el pin digital donde se conecta el sensor
#define DHTPIN 2
#define COLS 16
#define ROWS 2
#define VELOCIDAD 300
// Dependiendo del tipo de sensor
#define DHTTYPE DHT11
byte SNorte = 3, SSur = 4, SEste = 5, SOeste = 6;
int direc = 0;
// Inicializamos el sensor DHT11
DHT dht(DHTPIN, DHTTYPE);
LiquidCrystal lcd(12, 11, 10, 9, 8, 7);
String Texto = "Temperatura", Texto1 = "", Texto2 = "Humedad", Texto3 = "";
String Texto4 = "Direccion Viento", Texto5 = "";
String Texto9 = "Velocidad Viento", Texto10 = "";
float Calculo_Velocidad = 0.0;
float velocidad1 = 0.0;

void setup() {
  // Inicializamos comunicación serie
  Serial.begin(9600);

  // Comenzamos el sensor DHT
  dht.begin();
  lcd.begin(COLS, ROWS);
  analogReference(DEFAULT);

  pinMode(SNorte, INPUT);
  pinMode(SSur, INPUT);
  pinMode(SEste, INPUT);
  pinMode(SOeste, INPUT);

}

void loop() {
  delay(3000);

  Direccion();
  Humedad();
  Velocidad();
  Pantalla();
  Serial.println(getJSON());
}

void Direccion() {

  if (digitalRead(SNorte) == LOW) {
    Texto5 = "Norte";
    direc = 0;
  } 
  if (digitalRead(SSur) == LOW) {
    Texto5 = "Sur";
    direc = 1;
  }
  if (digitalRead(SEste) == LOW) {
    Texto5 = "Este";
    direc = 2;
  } 
  if (digitalRead(SOeste) == LOW) {
    Texto5 = "Oeste";
    direc = 3;
  }
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
  Texto1 = t;
  Texto3 = h;

}

void Pantalla() {
  int tamanio_Texto = Texto.length();
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(Texto);
  lcd.setCursor(0, 1);
  lcd.print(Texto1);

  delay(3000);
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(Texto2);
  lcd.setCursor(0, 1);
  lcd.print(Texto3);



  
    delay(1000);
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print(Texto4);
    lcd.setCursor(0, 1);
    lcd.print(Texto5);


}

void Velocidad() {
  velocidad1 = (analogRead(0));
  Calculo_Velocidad = velocidad1 * 0.0152;
  Texto10 = Calculo_Velocidad;
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(Texto9);
  lcd.setCursor(0, 1);
  lcd.print(Texto10);
  delay(1000);
}

String getJSON() {
  String Temperatura = "\"Temperatura\": ";
  Temperatura.concat(Texto1);
  String Humedad = "\"Humedad\": ";
  Humedad.concat(Texto3);
  String Velocidad = "\"Velocidad\": ";
  Velocidad.concat(Texto10);
  String Direccion = "\"Direccion\": ";
  Direccion.concat(direc);
  return "{" + Direccion + "," + Velocidad + "," + Humedad + "," + Temperatura + "}";
  //direccion, velocidad, humedad, temperatura
}
