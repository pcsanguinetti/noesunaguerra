// Listas y variables necesarias
var titulares = [];
var words = [];
var rojas = [];
var value = 255;
var re, x;

// Carga lista de titulares y de ReGex
function preload() {
  titulares = loadStrings("data/titulares.txt");
  re = loadStrings("data/regex.txt");
}

// Llama a dispose y reordena al azar palabras bélicas
function setup() {
  c = createCanvas(windowWidth, windowHeight-30);
  textFont('Special Elite', 18);
  dispose();
  shuffle(rojas, true);
  textSize(18);
  frameRate(5);
}

function draw() {
  background(255);
  mostrar();
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

// Asigna coordenadas a cada palabra de cada titular
function dispose() {
  
  shuffle(titulares, true);
  var x = 20;
  var y = 20;
  
  var reg = new RegExp(re);

// Filtra palabras bélicas, les asigna roja y las envía a nueva lista
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

// Pinta palabras en pantalla
function mostrar() {

// Palabra en grande en el centro
  if (frameCount < rojas.length) {
    fill(150);
    textSize(50);
    textAlign(CENTER);
    text(rojas[frameCount].word, windowWidth/2, windowHeight/2); 
    textSize(18);
    textAlign(LEFT);

// Palabra roja en su sitio, una a una
    for (var n = 0; n < frameCount; n++){
      rojas[n].display();
    }
  }
// Todas las palabras en su sitio a la vez
  else {
    for (var j = 0; j < rojas.length; j++){
      rojas[j].display();
    }
    for (var i = 0; i < words.length; i++){
      words[i].fcolor = value;
      words[i].display();
    }

// Cartel en el centro
    rectMode(CENTER);
    noStroke();
    fill("rgba(255,0,0,0.8)");
    rect(windowWidth/2,(windowHeight/2)-40,250, 40, 10, 10, 0, 0);
    fill("rgba(0,0,0,0.8)");
    rect(windowWidth/2,(windowHeight/2),250, 40, 0, 0, 10, 10);
    textAlign(CENTER);
    fill(0);
    text("Mira el contexto:", windowWidth/2, (windowHeight/2)-30);
    fill(255);
    text("no es una guerra",windowWidth/2,(windowHeight/2)+5);
    textAlign(LEFT);
  }
}

// Vuelve a pintar en blanco los titulares
function mouseClicked() {
  value = 255;
}

// Varía color de titulares
function mouseMoved(){
  value = 'rgba(40,40,40,'+1/windowWidth*mouseX+')';
  return false;
}
