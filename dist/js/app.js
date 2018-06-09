'use strict';

var leftArrow = document.querySelector('.fa-caret-left');
var rightArrow = document.querySelector('.fa-caret-right');
var position = document.querySelector('.content');
var currentLeft = 0; //position.offsetLeft; //start of carousel
var arrayItems = document.querySelectorAll('.content li');
var maxRight = (arrayItems.length - 1) * -605;

rightArrow.addEventListener("click", function (event) {
	if (currentLeft === maxRight) {
		position.style.left = 0; // back to start
		currentLeft = 0;
	} else {
		position.style.left = currentLeft - 600 - 5 + 'px'; // move right
		currentLeft = currentLeft - 600 - 5;
	}
	console.log(position.style.left);
});

leftArrow.addEventListener("click", function (event) {
	// let positionValue = position.offsetLeft;
	if (currentLeft === 0) {
		position.style.left = (arrayItems.length - 1) * -605 + 'px'; // Loop to last item
		currentLeft = (arrayItems.length - 1) * -605;
	} else {
		position.style.left = currentLeft + 600 + 5 + 'px'; //move left
		currentLeft = currentLeft + 600 + 5;
	}
});