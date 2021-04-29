// Listas y variables necesarias
var re, x, nro, a1, a3, data;
var titulares = [];
var words = [];
var rojas = [];
var modo = "asc";
var huboclick = 0;
var horiz = 0;
var value = 255;
var url = 'https://raw.githubusercontent.com/pcsanguinetti/elecciones4M/main/data/noesunaguerra.csv?token=ALLUPNQASLHPGN2GWJYPRU3ARKB76';

// Carga lista de titulares y de ReGex
function preload() {
  data = loadTable(url, 'csv', 'header');
  re = loadStrings("data/regex.txt");
  a1 = createA('https://github.com/pcsanguinetti/elecciones4M/blob/main/data/noesunaguerra.csv', "(listado aquí)");
  a3 = createA("https://github.com/pcsanguinetti/noesunaguerra", "código");
  a1.style("opacity", "0.0");
  a3.style("opacity", "0.0");
}

// Llama a dispose y reordena al azar palabras bélicas
function setup() {
  titulares = data.getColumn("todo");
  nro = titulares.length; //cantidad de titulares en lista
  c = createCanvas(windowWidth, windowHeight);
  textFont('Special Elite', 18);
  dispose();
  shuffle(rojas, true);
}

function draw() {
  frameRate(frameCount/2);
  background(255);
  if (frameCount < rojas.length) {
    mostrar1();
  }
  else {
    mostrar2();
    frameRate(5);
  }
}

//Crea la clase Word para asociar color, x e y a cada palabra
class Word {
    constructor(word, x, y, idx) {
      this.word = word;
      this.x = x;
      this.y = y;
      this.idx = idx;
      this.fcolor = color(90);
    }

    display() {
      fill(this.fcolor);
      text(this.word, this.x, this.y);
    }
}

// Asigna coordenadas a cada palabra de cada titular (los 40 primeros escogidos al azar)
function dispose() {
  shuffle(titulares, true);
  titulares = titulares.slice(1, 40);
  var x = 20;
  var y = 20;
  var reg = new RegExp(re);

// Filtra palabras bélicas, les asigna categoría y color rojo y las envía a nueva lista
  for (var t = 0; t < titulares.length; t++){
    
    var palabras = titulares[t].split(' ');

    for (var i = 0; i < palabras.length; i++) {
      var palabra = palabras[i];
      var ancho_palabra = textWidth(palabra);
      var word = new Word(palabra, x, y, i);
      
      if (reg.test(word.word.toLowerCase())) {
        word.fcolor = "red";
        rojas.push(word);
      }
      else {
        words.push(word);
      }
// Salto de línea cuando última palabra excede ancho de pantalla      
      x = x + ancho_palabra + textWidth(' ');
      const ancho_prox = textWidth(palabras[i+1]);
      if (x > windowWidth - ancho_prox - 20) {
        y += 35;
        x = 20;
      }
    }
  }
}

// Pinta palabras en pantalla una a una
function mostrar1() {
  for (var n = 0; n < frameCount; n++){
    rojas[n].display();
  }

// Palabra en grande en el centro
  fill(150);
  textAlign(CENTER);
  var r = random(20, 60);
  textSize(r);
  text(rojas[frameCount-1].word, windowWidth/2, windowHeight/2); 
  textSize(18);
  textAlign(LEFT);
}

// Pinta círculos y textos a la vez
function mostrar2() {
  for (var j = 0; j < rojas.length; j++){
    rojas[j].display();
  }
  for (var i = 0; i < words.length; i++){
    words[i].fcolor = value;
    words[i].display();
  }

// Círculos en el centro
  noStroke();
  fill("rgba(255,240,240, 0.5)");
  circle(windowWidth/2, windowHeight/2, 290);
  fill("rgba(255,240,240, 0.8)");
  circle(windowWidth/2, windowHeight/2, 240);
  
  textAlign(CENTER);
  fill(0);
  textSize(20);
  text("Mira el contexto:", windowWidth/2, (windowHeight/2)-20);
  fill("red");
  text("no es una guerra",windowWidth/2,(windowHeight/2)+30);

// Círculo con contador abajo a la derecha
  fill("rgba(50,40,40,0.8)");
  circle(width-50, height-30, 250);
  textSize(10);
  fill("white");
  text("titulares recogidos", windowWidth-75, windowHeight-35);
  a1.style("font-size", "10px");
  a1.style("color", "white");
  a1.position(windowWidth-130, windowHeight-20);
  a1.style("opacity", "1");
  fill("red");
  textSize(60);
  text(nro, windowWidth-65, windowHeight-60);
  textSize(18);
  textAlign(LEFT);

// Cuadrado con links arriba
  fill("rgba(200,220,200,0.8)");
  rectMode(CORNER);
  rect(0, 0, 150, 50, 0, 0, 20, 0);
  a3.style("opacity", "1");
  a3.position(15, 15);
  textSize(18);
  textAlign(LEFT);

  if (huboclick != 1) {
    instruccion();
  }
}

function instruccion() {
  rectMode(CENTER);
  fill("rgba(255,200,200,0.4)");
  rect(windowWidth/2, (windowHeight/2)+250, 320, 100, 30);
  fill("rgba(255,255,255,0.8)");
  rect(windowWidth/2, (windowHeight/2)+250, 300, 80, 20);
  textAlign(CENTER);
  noStroke();
  fill("black");

  if (modo == "asc" && horiz < 10) {
    horiz = horiz + 1;
  }
  if (modo == "asc" && horiz == 10) {
    horiz = horiz -1;
    modo = "desc";
  }
  if (modo == "desc" && horiz > 0) {
    horiz = horiz - 1;
  }
  else {
    horiz = horiz + 1;
    modo = "asc";
  }
  text("Haz click y", windowWidth/2, (windowHeight/2)+245);
  text("<- mueve el ratón ->", windowWidth/2+horiz, (windowHeight/2)+265);
  textAlign(LEFT);
}

// Vuelve a pintar en blanco los titulares
function mouseClicked() {
  huboclick = 1;
  value = 255;
}

function mouseMoved() {
  if (huboclick == 1) {
    value = 'rgba(40,40,40,'+1/windowWidth*mouseX+')';
  }
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}