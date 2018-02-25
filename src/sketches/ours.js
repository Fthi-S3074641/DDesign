export default function sketch (p) {
    var startx=150;
var starty=150;

var faces = [];

p.setup = function() {
    main_canvas = p.createCanvas(300, 300);

    faces.push(
        {
        eyeSize : 0,
          eyeWidth : 0,
          eyeColour : '#bf8040',

          pettalLength : 0,
          pettalWidth : 0,
          pettalColour : '#e6ffff',
          pettalSpacing : 15,

          mouth : false,

          centerColour : '#ffffcc',
          centerSize : 100,

        }
    );


randomThings(); // initialise them all Random
}
};