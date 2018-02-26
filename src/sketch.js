let feature

export function wrappedSketch(_feature) {
  feature = _feature;
  return sketch
}




function sketch(p) {
  let rotation = 0;
  var startx = 150;
  var starty = 150;
  var i = 0;

  var faces = [];

  faces.push(feature);
  // p.addNewFace = function(mouth, pettalLength, pettalWidth, petalColour, petalSpacing) {
  //   faces.push(
  //     {
  //     eyeSize : 0,
  //     eyeWidth : 0,
  //     eyeColour : '#bf8040',

  //     pettalLength : pettalLength,
  //     pettalWidth : pettalWidth,
  //     pettalColour : pettalColour,
  //     pettalSpacing : pettalSpacing,

  //     mouth : mouth,

  //     centerColour : '#ffffcc',
  //     centerSize : 100,

  //     }
  //   );
  // }

  p.setup = function() {
    p.createCanvas(300, 300, p.WEBGL);
    // p.modifyFaces();
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    if (props.rotation) {
      rotation = props.rotation * Math.PI / 180;
    }
  };

  p.draw = function() {
    p.clear();
    p.background("#b3ffb3");
    p.drawFace(startx, starty, i);
    // p.noStroke();
    // p.push();
    // p.rotateY(45);
    // p.box(200);
    // p.pop();
  };

  p.drawFace = function(x, y, i) {
    p.drawPettal(
      0,
      0,
      faces[i].pettalSpacing,
      faces[i].pettalWidth,
      faces[i].pettalLength,
      faces[i].pettalColour
    ); //remove the y
    p.drawCenter(0, 0, faces[i].centerSize, faces[i].centerColour);
    p.drawEyes(0, 0, faces[i].eyeWidth, faces[i].eyeSize, faces[i].eyeColour);
    // p.drawStem(startx,starty,250,500, 60);
    p.drawMouth(
      0,
      0,
      faces[i].pettalColour,
      faces[i].mouth,
      faces[i].centerSize
    );
    //  p.drawKawaii();
  };

  p.modifyFaces = function() {
    // for(i = 0; i < faces.length; i++){
    var randomMouth = Math.floor(Math.random() * 2);
    faces[0].mouth = 1;
    faces[0].eyeSize = Math.floor(Math.random() * 50 + 20);
    faces[0].eyeWidth = Math.floor(Math.random() * 20 + 25);
    faces[0].pettalLength = Math.floor(Math.random() * 83 + 90);
    faces[0].pettalWidth = Math.floor(Math.random() * 70 + 30);
    faces[0].pettalColour = p.getRandomColor();
    //console.log(faces[0]);
    // }
  };

  p.drawPettal = function(X, Y, spacing, width, length, colour) {
    p.push();
    p.translate(X, Y);
    p.fill(colour);
    p.noStroke();
    for (var i = 0; i < 11; i++) {
      p.ellipse(0, spacing, width, length);
      p.rotate(180 / 5);
    }
    p.pop();
  };

  p.drawCenter = function(X, Y, size, colour) {
    p.push();
    p.noStroke();
    p.fill(colour);
    p.translate(X, Y);
    p.ellipse(0, 0, size, size);
    p.pop();
  };

  p.drawEyes = function(X, Y, width, size, colour) {
    p.push();
    p.translate(X, Y);
    p.noStroke();
    p.fill(colour);
    if (width < 30 && size > 30) {
      size = size - 35;
    }
    p.ellipse(width, 0, size, size);
    p.ellipse(-width, 0, size, size);

    p.drawKawaii(width, size / 9);
    p.pop();
  };

  p.drawMouth = function(X, Y, colour, smile, size) {
    p.push();
    p.translate(X, Y);
    // p.angleMode(Math.RADIANS);
    p.stroke(colour);
    // console.log(smile);
    if (smile) {
      p.fill(colour);
    } else {
      p.noFill();
    }
    p.ellipse(0,size/5,size/5,size/25);
    //  p.angleMode(Math.DEGREES);
    p.pop();
  };

  p.drawKawaii = function(width, size) {
    p.fill("#ffffff");
    p.noStroke(0);
    p.ellipse(width, -size * 3.5, size, size);
    p.ellipse(-width, -size * 3.5, size, size);

    p.ellipse(width + size * 2, -size * 2, size, size);
    p.ellipse(-width + size * 2, -size * 2, size, size);

    p.ellipse(width, -size * 1.5, size * 1.5, size * 1.5);
    p.ellipse(-width, -size * 1.5, size * 1.5, size * 1.5);
  };

  p.getRandomColor = function() {
    var colors = [
      "#FE2712",
      "#FB9902",
      "#FCCC1A",
      "#FEFE33",
      "#347C98",
      "#0247FE",
      "#4424D6",
      "#8601AF"
    ];
    return colors[Math.floor(Math.random() * 7)];
  };
}
