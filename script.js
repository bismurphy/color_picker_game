let red = document.getElementById('red');
let green = document.getElementById('green');
let blue = document.getElementById('blue');
let box = document.querySelector('div.neumorphism-3');

let r = 0, g = 0, b = 0;

red.oninput = function() {
	r = red.value;
	if (!r)
		r = 0;
	box.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
};

green.oninput = function() {
	g = green.value;
	if (!g)
		g = 0;
	box.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
};

blue.oninput = function() {
	b = blue.value;
	if (!b)
		b = 0;
	box.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
};
