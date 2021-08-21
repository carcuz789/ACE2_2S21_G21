
 
//Variables para las medidas
int medida = 0;
float velocidad = 0;
float temperatura = 0;
int direccion = 0;
String dirT = "";
float humedad = 0;
int movFlecha = 1;
int tiempo = 0;
int numDato = 0;

//Objeto lineas
ArrayList<Line> middleLines = new ArrayList<Line>();
int lineWidth = 10;

//Json desde la API
String[]json;
JSONObject jobj;
JSONArray json_array;
JSONObject datosJSON;
String fHumedad = nf(humedad, 0, 2);
String fVelocidad = nf(velocidad, 0, 2);
String fTemperatura = nf(temperatura, 0, 2);


//Colores RGB para direcciones
int[] moradoRGB = {140,180,130,160,212,212};
int[] verdeRGB = {30,156,217,217,70,160};
int[] amarilloRGB = {229,229,230,230,30,180};
int[] rojoRGB = {230,230,80,120,80,140};

//RGB globales para los vértices de los triángulos
int r1 = 1;
int r2 = 1;
int g1 = 1;
int g2 = 1;
int b1 = 1;
int b2 = 1;

//Objetos flecha que dibujan los triángulos de las direcciones
flecha flechaNorte = new flecha(208,320,432,285,240,20,240,200);
flecha flechaSur = new flecha(208,320,432,285,47,213,47,150);
flecha flechaEste = new flecha(208,432,432,325,117,20,214,150);
flecha flechaOeste = new flecha(430,238,238,255,117,20,214,150);

//Creación de las flechas de direcciones
linea[] lineas_norte;
linea[] lineas_sur;
linea[] lineas_este;
linea[] lineas_oeste;

//Direcciones para mostrar en pantalla
String[] direcciones ={"N","S","E","O"};

void setup() {
  size(1280, 720);
  textSize(115);
  stroke(255);
  iniciarNorte();
  iniciarSur();
  iniciarEste();
  iniciarOeste();
  dirT = direcciones[direccion];
  smooth(8);
  for (int i = 0; i < width/2; i += lineWidth+lineWidth/2) {
    middleLines.add(new Line(new PVector(i, height/2), new PVector(i, height/2)));
  }
}

class linea{
  int pos;
  linea(int inicial){
    pos = inicial;
  }
}

void draw() {
  background(51);
  fill(255);
  
  //Cargar datos desde json
  esperar(100);
  
  //Pintar rectángulos para las medidas
  rect(640, 0, 320, 360,10);
  rect(960, 0, 320, 360,10);
  rect(640, 360, 320, 360,10);
  rect(960, 360, 320, 360,10);
  fill(1);
  
  //Títulos
  text("Temp", 640,80);
  text("Hum", 960,80);
  text("Vel", 640,445);
  text("Dir", 960,445);
  fill(1);
  
  //Texto de las medidas
  text(fTemperatura,680,250);
  text(fHumedad,1000,250);
  text(fVelocidad,700,615);
  text(dirT,1080,615);
  
  //Dibujar líneas de la intensidad de la velocidad del viento
  for (Line ml : middleLines) {
    ml.drawLine(direccion);
    ml.update();
  }
  
  //Verificar la dirección para pintar
  if (direccion ==0){
    if (flechaNorte.contador == 12 && movFlecha == 1){
      movFlecha = 0;
    } else if (flechaNorte.contador == 12 && movFlecha == 0){
      movFlecha = 1;
    }
    flechaMov(flechaNorte,1,movFlecha);
  }else if (direccion ==1){
    if (flechaSur.contador == 12 && movFlecha == 1){
      movFlecha = 0;
    } else if (flechaSur.contador == 12 && movFlecha == 0){
      movFlecha = 1;
    }
    flechaMov(flechaSur,1,movFlecha);    
  }else if (direccion ==2){
    if (flechaEste.contador == 12 && movFlecha == 1){
      movFlecha = 0;
    } else if (flechaEste.contador == 12 && movFlecha == 0){
      movFlecha = 1;
    }
    flechaMov(flechaEste,3,movFlecha);
  }else if (direccion ==3){
    if (flechaOeste.contador == 12 && movFlecha == 1){
      movFlecha = 0;
    } else if (flechaOeste.contador == 12 && movFlecha == 0){
      movFlecha = 1;
    }
    flechaMov(flechaOeste,4,movFlecha);
  }


}


void esperar(int valor){
  if (tiempo == valor){
    tiempo = 0;
    cargarJson("http://localhost:3001/","datos","data");
  }else{
    tiempo++;
  }
}

//Cargar json desde la api
void cargarJson(String ruta,String archivo, String id){
//JSONArray json_array;
//JSONObject datosJSON;
String[] json = loadStrings(ruta);
saveStrings("datos.json",json);
JSONObject jobj = loadJSONObject("datos.json");
//json_array = jobj.getJSONArray(id);   
//datosJSON = json_array.getJSONObject(numDato);
updateData(jobj);  
/*
  if (numDato != 3){
    numDato++;
  }else{
    numDato =0;
}
*/
}

//Actualizar datos desde el json
void updateData(JSONObject dato){
    velocidad = dato.getFloat("Velocidad");
    direccion = dato.getInt("Direccion");
    temperatura = dato.getFloat("Temperatura");
    humedad = dato.getFloat("Humedad");
    dirT = direcciones[direccion];
    fHumedad = nf(humedad, 0, 2);
    fVelocidad = nf(velocidad, 0, 2);
    fTemperatura = nf(temperatura, 0, 2);    
    //println(temperatura);
}


//Movimiento de las flechas
void flechaMov(flecha f,int dir, int mov){
  triangle(f.ps[0],f.ps[4],f.ps[1],f.ps[5],f.ps[2],f.ps[6]);
  fill(255);
  text(dirT,f.ps[3],f.ps[7]);
  f.mover(dir,mov);
}


//Clase flecha
class flecha{
  int x1,x2,x3,x4,y1,y2,y3,y4;
  int[]ps = new int[8];
  int contador = 0;
  flecha(int a, int b, int c, int d, int e, int f, int g, int h){
    x1=a;
    x2=b;
    x3=c;
    x4=d;
    y1=e;
    y2=f;
    y3=g;
    y4=h;
    ps[0]=a+0;
    ps[1]=b+0;
    ps[2]=c+0;
    ps[3]=d+0;
    ps[4]=e+0;
    ps[5]=f+0;
    ps[6]=g+0;
    ps[7]=h+0;
  }
  
  void mover(int dir,int mov){
    if (contador ==12){
     contador = 0;
    }
    switch(dir){
      case 1:
        if (mov == 1){
            ps[4]=ps[4]+1;
            ps[5]=ps[5]+1;
            ps[6]=ps[6]+1;
            ps[7]=ps[7]+1;  
            contador++;
        }else{
            ps[4]=ps[4]-1;
            ps[5]=ps[5]-1;
            ps[6]=ps[6]-1;
            ps[7]=ps[7]-1;   
            contador++;
        }
      break;
      case 2:
        if (mov == 1){
            ps[4]=ps[4]+1;
            ps[5]=ps[5]+1;
            ps[6]=ps[6]+1;
            ps[7]=ps[7]+1;  
            contador++;
        }else{
            ps[4]=ps[4]-1;
            ps[5]=ps[5]-1;
            ps[6]=ps[6]-1;
            ps[7]=ps[7]-1;   
            contador++;
        }
      break;
      case 3:
        if (mov == 1){
              ps[0]=ps[0]-1;
              ps[1]=ps[1]-1;
              ps[2]=ps[2]-1;
              ps[3]=ps[3]-1;  
              contador++;
          }else{
              ps[0]=ps[0]+1;
              ps[1]=ps[1]+1;
              ps[2]=ps[2]+1;
              ps[3]=ps[3]+1;   
              contador++;
          }
      break;
      case 4:
      if (mov == 1){
              ps[0]=ps[0]-1;
              ps[1]=ps[1]-1;
              ps[2]=ps[2]-1;
              ps[3]=ps[3]-1;  
              contador++;
          }else{
              ps[0]=ps[0]+1;
              ps[1]=ps[1]+1;
              ps[2]=ps[2]+1;
              ps[3]=ps[3]+1;   
              contador++;
          }
      break;
  
    }
  
  }
  
  void reset(){
    ps[0]=x1+0;
    ps[1]=x2+0;
    ps[2]=x3+0;
    ps[3]=x4+0;
    ps[4]=y1+0;
    ps[5]=y2+0;
    ps[6]=y3+0;
    ps[7]=y4+0;  
  }  
}


//Calcular datos random de prueba
void calcularDatos(){
  temperatura = (int)random(1,9);
  direccion = (int)random(0,4);
  dirT = direcciones[direccion];
  humedad = (int)random(1,9);
  velocidad =  (int)random(1,20);

}

void mouseClicked(){
  calcularDatos();
}


//Manejo de direcciones
void manejoAire(){
  switch(direccion){
  case 0:
    norte();
    break;
  case 1:
    sur();
    break;
  case 2:
    este();
    break;
  case 3:
    oeste();
    break; 
  }
}


//Iniciar los objetos de direcciones
void iniciarNorte(){
  medida = 0;
  lineas_norte = new linea[12];
  for (int i = 0; i<lineas_norte.length;i++){
    linea n = new linea(medida);
    lineas_norte[i]=n;
    medida = medida+60;
  }  
}

void iniciarSur(){
  medida = 720;
  lineas_sur = new linea[12];
  for (int i = 0; i<lineas_sur.length;i++){
    linea n = new linea(medida);
    lineas_sur[i]=n;
    medida = medida-60;
  }  
}

void iniciarEste(){
  medida = 0;
  lineas_este = new linea[16];
  for (int i = 0; i<lineas_este.length;i++){
    linea n = new linea(medida);
    lineas_este[i]=n;
    medida = medida+40;
  }  
}

void iniciarOeste(){
  medida = 640;
  lineas_oeste = new linea[16];
  for (int i = 0; i<lineas_oeste.length;i++){
    linea n = new linea(medida);
    lineas_oeste[i]=n;
    medida = medida-40;
  }  
}


void norte(){
  medida = 720;
  stroke(215,45,8);
  for (int i =0;i<lineas_norte.length;i++){
    line(0,lineas_norte[i].pos,640,lineas_norte[i].pos);
    lineas_norte[i].pos = lineas_norte[i].pos-int(velocidad);
    if (lineas_norte[i].pos<0){
      lineas_norte[i].pos=medida;
    }
  }
}

void sur(){
  medida = 720;
  stroke(163, 95, 220);
  for (int i =0;i<lineas_sur.length;i++){
    line(0,lineas_sur[i].pos,640,lineas_sur[i].pos);
    lineas_sur[i].pos = lineas_sur[i].pos+int(velocidad);
    if (lineas_sur[i].pos>height){
      lineas_sur[i].pos=0;
    }
  }
} 
  
  
void este(){  
  medida = 640;
  stroke(49, 182, 111);
  for (int i =0;i<lineas_este.length;i++){ 
    if (lineas_este[i].pos<640){
      line(lineas_este[i].pos,0,lineas_este[i].pos,height);      
    } 
    lineas_este[i].pos = lineas_este[i].pos-int(velocidad);
    if (lineas_este[i].pos<0){
      lineas_este[i].pos=640;
    }
  }
}


void oeste(){  
  medida = 0;
  stroke(222, 224, 55);
  for (int i =0;i<lineas_oeste.length;i++){ 
    if (lineas_oeste[i].pos<640){
      line(lineas_oeste[i].pos,0,lineas_oeste[i].pos,height);      
    } 
    lineas_oeste[i].pos = lineas_oeste[i].pos+int(velocidad);
    if (lineas_oeste[i].pos>640){
      lineas_oeste[i].pos=0;
    }
  }
}


//Clase línea para la intensidad de la velocidad del viento
class Line {
  PVector baseLoc;
  PVector loc;

  int maxLineHeight = int(random(10, 100));
  float lineSpeed = random(1, 3);
  int startX = 10;

  float angle = 0;
  int direccion=0;
  int r = int(random(120, 180));
  int g = int(random(30, 160));
  int b = int(random(212, 212));
  
  

  Line(PVector baseLoc_, PVector loc_) {
    baseLoc = baseLoc_;
    loc = loc_;
  } 

  void drawLine(int direccion) {
    switch(direccion){
      case 0:
        r1 = rojoRGB[0];
        r2 = rojoRGB[1];
        g1 = rojoRGB[2];
        g2 = rojoRGB[3];
        b1 = rojoRGB[4];
        b2 = rojoRGB[5];
        break;
      case 1:
        r1 = moradoRGB[0];
        r2 = moradoRGB[1];
        g1 = moradoRGB[2];
        g2 = moradoRGB[3];
        b1 = moradoRGB[4];
        b2 = moradoRGB[5];        
        break;
      case 2:
        r1 = verdeRGB[0];
        r2 = verdeRGB[1];
        g1 = verdeRGB[2];
        g2 = verdeRGB[3];
        b1 = verdeRGB[4];
        b2 = verdeRGB[5];        
        break;
      case 3:
        r1 = amarilloRGB[0];
        r2 = amarilloRGB[1];
        g1 = amarilloRGB[2];
        g2 = amarilloRGB[3];
        b1 = amarilloRGB[4];
        b2 = amarilloRGB[5];        
        break;
    } 
    
    r = int(random(r1, r2));
    g = int(random(g1, g2));
    b = int(random(b1, b2));
    
    stroke(r, g, b);
    strokeWeight(lineWidth);
    line(baseLoc.x, baseLoc.y, loc.x, loc.y);
  }

  void update() {
    lineSpeed = random(1, velocidad);
    angle += lineSpeed;
    float wave = abs(cos(radians(angle))*maxLineHeight);
    if (baseLoc.y <= 0) {
      loc.y = wave;
    }
    else if (baseLoc.y >= height) {
      loc.y = height-wave;
    }
    else {
      baseLoc.y = height/2-wave;
      loc.y = height/2+wave;
    }
  }
}
