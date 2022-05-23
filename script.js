let red = document.getElementById('red');
let green = document.getElementById('green');
let blue = document.getElementById('blue');
let guess_output = document.querySelector('div.output');
let answer_output = document.querySelector('div.answerbox');
let submit_btn = document.getElementById('submitbutton')


let r = 0; let g = 0; let b = 0;
updateRed();
updateGreen();
updateBlue();

let targetRed,targetGreen,targetBlue = 0;

fetch('colors.csv')
	.then(
		function(response){
			if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
			response.text().then(function(data){
				var lines = data.split("\n");
				var chosenLineNum = Math.floor(Math.random() * lines.length);
				var chosenLine = lines[chosenLineNum];
				var lineparts = chosenLine.split(",");
				var colorName = lineparts[0];
				targetRed = lineparts[1];
				targetGreen = lineparts[2];
				targetBlue = lineparts[3];
				var namebox = document.getElementById('NameToGuess');
				namebox.innerText = colorName;
				//console.log(chosenLine);
			});
		}
	)
	.catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
function updateRed(){
	r = red.value;
	if (!r)
		r = 0;
	guess_output.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
	var red_out = document.getElementById('redout');
	red_out.innerText = r;
}
function updateGreen(){
	g = green.value;
	if (!g)
		g = 0;
	guess_output.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
	var green_out = document.getElementById('greenout');
	green_out.innerText = g;
}
function updateBlue(){
	b = blue.value;
	if (!b)
		b = 0;
	guess_output.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
	var blue_out = document.getElementById('blueout');
	blue_out.innerText = b;
}

red.oninput = updateRed;
green.oninput = updateGreen;
blue.oninput = updateBlue;

submit_btn.addEventListener("click",submitGuess);
function submitGuess(){
	var guess_LAB = XYZtoLAB(...RGBtoXYZ(r,g,b));
	var target_LAB = XYZtoLAB(...RGBtoXYZ(targetRed,targetGreen,targetBlue));
	var dist = eucDistance(guess_LAB,target_LAB);
	var score = Math.max(Math.round(50 * (100-dist)),0) //Max score of 5000, cap a min at 0
	var resultBox = document.getElementById('Results');
	resultBox.innerText = "Real Color: " + targetRed + ", " + targetGreen + ", " + targetBlue + "\nScore: " + score;
	answer_output.style.backgroundColor =`rgb(${targetRed}, ${targetGreen}, ${targetBlue})`;
	answer_output.style.visibility = 'visible';
	document.getElementById('playagain').style.visibility = 'visible';

}
//Taken from https://stackoverflow.com/questions/15408522/rgb-to-xyz-and-lab-colours-conversion

function RGBtoXYZ(R, G, B)
{

    var_R = parseFloat( R / 255 )        //R from 0 to 255
    var_G = parseFloat( G / 255 )        //G from 0 to 255
    var_B = parseFloat( B / 255 )        //B from 0 to 255

    if ( var_R > 0.04045 ) var_R = Math.pow( ( var_R + 0.055 ) / 1.055, 2.4 )
    else                   var_R = var_R / 12.92
    if ( var_G > 0.04045 ) var_G = Math.pow( ( var_G + 0.055 ) / 1.055, 2.4 )
    else                   var_G = var_G / 12.92
    if ( var_B > 0.04045 ) var_B = Math.pow( ( var_B + 0.055 ) / 1.055, 2.4 )
    else                   var_B = var_B / 12.92

    var_R = var_R * 100
    var_G = var_G * 100
    var_B = var_B * 100

    X = var_R * 0.4124 + var_G * 0.3576 + var_B * 0.1805
    Y = var_R * 0.2126 + var_G * 0.7152 + var_B * 0.0722
    Z = var_R * 0.0193 + var_G * 0.1192 + var_B * 0.9505
    return [X, Y, Z]
}


function XYZtoLAB(x, y, z)
{
    var ref_X =  95.047;
    var ref_Y = 100.000;
    var ref_Z = 108.883;
    var_X = x / ref_X
    var_Y = y / ref_Y
    var_Z = z / ref_Z

    if ( var_X > 0.008856 ) var_X = Math.pow(var_X, 1/3 )
    else                    var_X = ( 7.787 * var_X ) + ( 16 / 116 )
    if ( var_Y > 0.008856 ) var_Y = Math.pow(var_Y, 1/3 )
    else                    var_Y = ( 7.787 * var_Y ) + ( 16 / 116 )
    if ( var_Z > 0.008856 ) var_Z = Math.pow(var_Z, 1/3 )
    else                    var_Z = ( 7.787 * var_Z ) + ( 16 / 116 )

    CIE_L = ( 116 * var_Y ) - 16
    CIE_a = 500 * ( var_X - var_Y )
    CIE_b = 200 * ( var_Y - var_Z )

return [CIE_L, CIE_a, CIE_b]
}
function eucDistance(a, b) {
    return a
        .map((x, i) => Math.abs( x - b[i] ) ** 2) // square the difference
        .reduce((sum, now) => sum + now) // sum
        ** (1/2)
}
