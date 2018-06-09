let leftArrow = document.querySelector('.fa-caret-left');
let rightArrow = document.querySelector('.fa-caret-right');
let position = document.querySelector('.content');
let currentLeft = 0; //position.offsetLeft; //start of carousel
let arrayItems = document.querySelectorAll('.content li');
let maxRight = (arrayItems.length - 1) * -605;

rightArrow.addEventListener("click", event => {
    if (currentLeft === maxRight) {
    	position.style.left = 0; // back to start
    	currentLeft = 0;
    } else {
    	position.style.left = (currentLeft - 600 - 5) + 'px'; // move right
    	currentLeft = (currentLeft - 600 - 5);
    }
	console.log(position.style.left);
});

leftArrow.addEventListener("click", event => {
	// let positionValue = position.offsetLeft;
	if (currentLeft === 0) {
		position.style.left = (arrayItems.length - 1) * -605 + 'px'; // Loop to last item
		currentLeft = (arrayItems.length - 1) * -605;
	} else {
		position.style.left = (currentLeft + 600 + 5) + 'px'; //move left
		currentLeft = (currentLeft + 600 + 5);
	}
});