export default function sketch(p) {
var main_canvas;

//location stettings
var startx=150;
var starty=150;

var faces = [];

 p.setup = function() {

	// p.createCanvas(600, 400, p.WEBGL);
	p.createCanvas(300, 300);

  //iterates a set amount of times and adds new face traits to the array of faces which are randomized in the randomThings function
  	faces.push(
  		{
  		eyeSize : 5,
			eyeWidth : 12,
			eyeColour : '#bf8040',
			pettalLength : 3,
			pettalWidth : 4,
			pettalColour : '#e6ffff',
			pettalSpacing : 15,
			mouth : false,
			centerColour : '#ffffcc',
			centerSize : 100,
  		}
  	);

//   randomThings(); // initialise them all Random
}

};

function draw (p) {

	p.clear();
	p.background('#b3ffb3');
	//background('#80e5ff');

	var i = 0;
	drawFace(p.startx, p.starty, i);

}

function drawFace(x,y,i,p){
	//uses i to find the correct index of the faces array, which holds a set amount of faces that are initialised in the setup method

		drawPettal(p.startx, p.starty, p.faces[i].pettalSpacing, p.faces[i].pettalWidth, p.faces[i].pettalLength, p.faces[i].pettalColour); //remove the y
		drawCenter(p.startx,p.starty,p.faces[i].centerSize,p.faces[i].centerColour);
		drawEyes(p.startx, p.starty,p.faces[i].eyeWidth,p.faces[i].eyeSize,p.faces[i].eyeColour);
		drawStem(p.startx,p.starty,250,500, 60);
		drawMouth(p.startx,p.starty, p.faces[i].pettalColour,p.faces[i].mouth,p.faces[i].centerSize);
		drawKawaii();

}

// function randomThings(p){

// 	// for each faces, randomize it's features
// 	    var i =0;
// 		randomMouth = focusedRandom(0,2,1,1);
// 		faces[i].mouth = 0 ;
// 		faces[i].eyeSize = focusedRandom(20,70, 1, 50);
// 		faces[i].eyeWidth = focusedRandom(25,45,1,25);
// 		faces[i].pettalLength = focusedRandom(87,170, 1,100);
// 		faces[i].pettalWidth = focusedRandom(30,100);
// 		faces[i].pettalColour = getRandomColor();

	
// }

function drawMouth(X,Y,colour, smile, size,p){
	p.push();
	p.translate(X,Y);
	p.angleMode(p.RADIANS);
	p.stroke(colour);
	if(smile){
		p.fill(colour);
	}
	else{
		p.noFill();
	}

p.arc(0,size/5,size/5,size/5, 0, p.PI);
 p.angleMode(p.DEGREES);
 p.pop();
}

function drawEyes(X,Y,width,size,colour,p){
p.push();
	p.translate(X,Y);
	p.noStroke();
	p.fill(colour);
	if (width<30 && size>30){
		size = size -35;
	}
	p.ellipse(width,0,size,size);
	p.ellipse(-width,0,size,size);

	drawKawaii(width,size/9);


p.pop();
}

function drawKawaii(width,size,p){

	p.fill('#ffffff');
	p.noStroke(0);
	p.ellipse(width, -size*3.5, size,size);
	p.ellipse(-width,-size*3.5,size,size);

	p.ellipse(width+size*2, -size*2, size,size);
	p.ellipse(-width+size*2,-size*2,size,size);

	p.ellipse(width, -size*1.5, size*1.5,size*1.5);
	p.ellipse(-width,-size*1.5,size*1.5,size*1.5);

}

function drawCenter(X,Y,size, colour,p){
	p.push();
	p.noStroke();
	p.fill(colour);
	p.translate(X,Y);
p.ellipse(0,0,size,size);
p.pop();
}
function drawStem(X1,Y1,X2,Y2, curve,p){
	p.stroke('#009933');
	//curve(X1,Y1,450,450,X2,Y2); ///////////I DONT KNOW WHY THIS DOESNT WORK GAAA

}
function drawPettal(X, Y, spacing, width, length,colour,p){
	p.push();
	p.translate(X, Y);
	p.fill(colour);
	p.noStroke();
	for (var i = 0; i < 10; i ++) {
	   p.ellipse(0, spacing, width, length);
	   p.rotate(180/5);
	 }
	p.pop();
}

function getRandomColor() {
  var colors = ['#FE2712', '#FB9902', '#FCCC1A', '#FEFE33', '#347C98', '#0247FE', '#4424D6', '#8601AF'];
  // var colors = ['#090806', '#B7A69E', '#FFF5E1', '#DEBC99', '#B55239', '#91553D', '#4E433F', '#6A4E42'];
    return colors[Math.floor(Math.random()*7)];
}