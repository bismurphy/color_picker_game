let red = document.getElementById('red');
let green = document.getElementById('green');
let blue = document.getElementById('blue');
let guess_output = document.querySelector('div.output');
let answer_output = document.querySelector('div.answer_box');
let submit_btn = document.getElementById('submitbutton')


let r = 128, g = 128, b = 128;
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
				console.log(chosenLine);
			});
		}
	)
	.catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

red.oninput = function() {
	r = red.value;
	if (!r)
		r = 0;
	guess_output.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
	var red_out = document.getElementById('redout');
	red_out.innerText = r;

};

green.oninput = function() {
	g = green.value;
	if (!g)
		g = 0;
	guess_output.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
	var green_out = document.getElementById('greenout');
	green_out.innerText = g;
};

blue.oninput = function() {
	b = blue.value;
	if (!b)
		b = 0;
	guess_output.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
	var blue_out = document.getElementById('blueout');
	blue_out.innerText = b;
};
submit_btn.addEventListener("click",submitGuess);
function submitGuess(){
	var resultBox = document.getElementById('Results');
	resultBox.innerText = "Real Color: " + targetRed + ", " + targetGreen + ", " + targetBlue;
	answer_output.style.backgroundColor =`rgb(${targetRed}, ${targetGreen}, ${targetBlue})`;
}
