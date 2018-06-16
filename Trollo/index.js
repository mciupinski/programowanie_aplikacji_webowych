dragula([
	document.getElementById('card1'),
	document.getElementById('card2'),
	document.getElementById('card3'),
	document.getElementById('card4'),
	document.getElementById('card5'),
	document.getElementById('lists')
])

.on('drag', function(el) {
	el.classList.add('is-moving');
})

.on('dragend', function(el) {
	el.classList.remove('is-moving');
});

function postToServer(){
	document.getElementById('randomForm').submit();
}

function refresh(){
	document.getElementById('refresh').submit();
}

function getFromDB(){
	document.getElementById('retreiveFromDB').submit();
}