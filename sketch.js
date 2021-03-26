// Inicia variables
var c, myFont, re, song1;
var value = 255;
var titulares = []

// Carga previa de archivos
function preload() {
  titulares = loadStrings("data/titulares.txt");
  re = loadStrings("data/regex.txt");
  song1 = loadSound("data/paz.wav");
}

// Reordenamiento de texto al azar y música
function loaded() {
  shuffle(titulares, true);
  song1.play();
}

function setup() {
  c = createCanvas(windowWidth, windowHeight);
  textFont('Special Elite', 18);
}

function draw() {
  background(255);
  tachar(titulares);
}

function tachar(titulares) {
  var reg = new RegExp(re);
  var x = 20;
  var y = 20;
  
// Crea una lista de palabras para cada titular:  
  for (let i = 0; i < titulares.length; i++){
    var titular = titulares[i];
    var palabras = titular.split(" ");
    
// Imprime en rojo palabras que cumplen condición RegEx y en blanco resto
    for (let i = 0; i < palabras.length; i++) {
      var palabra = palabras[i];

      if (reg.test(palabra.toLowerCase())) {
        fill("red");
      }
      else {
        fill(value);
      }
      text(palabra, x, y);

// Calcula posición de palabra siguiente
      var ancho_palabra = textWidth(palabra);
      x = x + ancho_palabra + textWidth(" ");
      
// Salto de línea si próxima palabra llega a final de pantalla
      var ancho_prox_palabra = textWidth(palabras[i+1]);

        if (x > windowWidth - ancho_prox_palabra - 20) {
          y += 25;
          x = 20;
        }
      }
    
  }
}

// Va oscureciendo palabras en blanco al mover mouse
function mouseMoved() {
  if (value > 100) {
    value = value - 3;
  }
}
  
// Reinicia con click
function mouseClicked() {
  value = 255;
  transp = 0;
  shuffle(titulares, true);
  song1.play();
}