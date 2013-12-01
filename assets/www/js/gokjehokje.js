// Settings
var maxNumbers = 40;
var numbers = new Array();
var randomNumbers = new Array();
var boxesH = 3;
var boxesV = 8;
var maxBoxes = (boxesH * boxesV);
var boxes = new Array();
var tmpEmpty = new Array();
var randomEmpty = new Array();
var places = 10;
var emptyPlaces = maxBoxes - places;
var indexRandomNumber = 0;
hint = "on";

function redefine() {
//	maxNumbers = $('#sliderNumber').slider( "option", "value" );
//	places = $('#sliderPlaces').slider( "option", "value" );
//	boxesH = $('#sliderBoxesH').slider( "option", "value" );
//	boxesV = $('#sliderBoxesV').slider( "option", "value" );
//	maxBoxes = (boxesH * boxesV);
//	if (places > maxBoxes) {places = maxBoxes;}
	emptyPlaces = maxBoxes - places;
	$('#card').width(boxesH*100).height(boxesV*100);
//	hint = $('#flipHint').val();
}

function onBodyLoad() {
//	document.addEventListener("deviceready", onDeviceReady, false);	// aanzetten for phoneGap, uitzetten voor PC
	onDeviceReady();	// uitzetten for phoneGap, aanzetten voor PC
}

function onDeviceReady() {
//alert('hello');
	$('#settings').hide();
	$('#GameOver').hide();
//	$('.screen').attr('height', $(window).height() );
//	$('.screen').attr('width', $(window).width() );
//	$('.content').attr('height', $(window).height() - 100 );
//	$('.content').append("<p class="">&nbsp;</p>;")
	//(<p style="position: absolute; left: 0px; top: " + $(window).height() + ";>&nbsp;</p>" );
	$('.settingsButton').on('click', function() { $('#game, #settings').toggle('fast', function() {}); });
	$('.backButton').on('click', function() { $('#game, #settings').toggle('fast', function() {}); makeCard() });
	$('.newButton').on('click', function() { makeCard(); });
	$('.hideMessage').on('click', function() { $('#GameOver').toggle(); });
//alert('hello2');
	makeSettings();
	redefine();
	makeCard();
	
//alert('hello3');
}
	
function makeCard() {
	redefine();
//	for (var i=0; i<=numbers.length-1; i++) {numbers[i] = i;}
//	randomNumbers = shuffleArray(numbers);
//	for (var i=0; i<=boxes.length-1; i++) {boxes[i] = "";}
//	for (var i=0; i<=tmpEmpty.length-1; i++) {tmpEmpty[i] = i;}
	for (var i=1; i<=maxNumbers; i++) {numbers[i] = i;}
	randomNumbers = shuffleArray(numbers);
	for (var i=0; i<=maxBoxes-1; i++) {boxes[i] = "";}
	for (var i=0; i<=maxBoxes-1; i++) {tmpEmpty[i] = i;}
	randomEmpty = shuffleArray(tmpEmpty);
	indexRandomNumber = 0;
	// first make all boxes as a possible place
	// then set 'emptyPlaces' boxes for emptyPlace (at random)
	// fill emptyPlaces in boxes-array with "x"
	$('#card').empty();
	for (var i=0; i<=boxes.length-1; i++) {
		$('#card').append('<div id="'+i+'" class="place normal"><div class="tokenSmall"></div></div>');
	}
	for (var i=0; i<=(emptyPlaces-1); i++) {
		$('#'+randomEmpty[i]).removeClass('place normal').addClass('emptyPlace');
		boxes[randomEmpty[i]] = "x";
	}
	// make newNumber
	$('#random').html('<div class="tokenBig">'+randomNumbers[indexRandomNumber]+"</div>");
	$('.message').html('Max. number = ' + maxNumbers);
	canCopy();
}

function canCopy() {
	$('.copy').unbind('click', copyEvent);
	$('.noCopy').unbind('click', noCopyEvent);
	$('.place').removeClass('copy noCopy highlight faint');
	var lower = -1;
	var higher = maxNumbers+1;
	var newToken = $('.tokenBig').text();
	$('#card').children('div.place').each(function(){
		var nr = $(this).attr('id');
		if ((boxes[nr] != "x")&&(boxes[nr] != "")) {
			if (Number(boxes[nr]) < Number(newToken)) {	lower = nr;	} else { higher = nr; return false; }
		}
	});
	var copyPlaces = 0;
	$('#card').children('div.place').each(function(){
		var nr = $(this).attr('id');
		if (boxes[nr] != "x"){
			if ((Number(lower) < Number(nr)) && (Number(nr) < Number(higher))) {
				if (hint=="on") {$(this).addClass('highlight');}
				$(this).addClass('copy');
				copyPlaces++;
			} else {
				if(hint=="on") {$(this).addClass('faint');}
				$(this).addClass('noCopy');
			}
		}
	});
	$('.copy').bind('click', copyEvent);
	$('.noCopy').bind('click', noCopyEvent);
	if (copyPlaces < 1) {
		setTimeout(function() {
			$('#GameOver').toggle();
			//alert('Game Over');	
			// melden of gewonnen of verloren + behaalde punten (=% van te vullen vakken herekend naar 100)!
			// hier ook een restart button maken
		}, 1000);		
	}
}
	
var copyEvent = function copyEvent() {
	$(this).find('div.tokenSmall').html(randomNumbers[indexRandomNumber]);
	var nr = $(this).attr('id');
	boxes[nr] = randomNumbers[indexRandomNumber];
	indexRandomNumber++;
	$('#random').html('<div class="tokenBig">'+randomNumbers[indexRandomNumber]+"</div>");
	canCopy();
};

var noCopyEvent = function noCopyEvent() {
	alert('Dit is geen geldige locatie !');
};
	
function shuffleArray(array) {
	var currentIndex = array.length;
	var temporaryValue;
	var randomIndex;
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;
	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	}
	return array;
}

function makeSettings() {

//    $( ".mySlider" ).slider({ orientation: "horizontal", range: "min", max: 60, value: 127, slide: refreshValues, change: refreshValues });
    $( ".mySlider" ).slider({ orientation: "horizontal", range: "min", min: 1 });
    $( "#sliderBoxesH" ).slider( "option", "max", 10 );
    $( "#sliderBoxesH" ).slider( "option", "value", 8 );
//    $( "#sliderBoxesH" ).slider( "option", "slide", refreshValues1 );
    $( "#sliderBoxesH" ).slider( "option", "change", refreshValues1 );
    $( "#sliderBoxesV" ).slider( "option", "max", 10 );
    $( "#sliderBoxesV" ).slider( "option", "value", 3 );
//    $( "#sliderBoxesV" ).slider( "option", "slide", refreshValues1 );
    $( "#sliderBoxesV" ).slider( "option", "change", refreshValues1 );
	boxesH = $('#sliderBoxesH').slider( "option", "value" );
	boxesV = $('#sliderBoxesV').slider( "option", "value" );
	maxBoxes = (boxesH * boxesV);
    $( "#sliderPlaces" ).slider( "option", "max", maxBoxes );
    $( "#sliderPlaces" ).slider( "option", "value", 14 );
//    $( "#sliderPlaces" ).slider( "option", "slide", refreshValues );
    $( "#sliderPlaces" ).slider( "option", "change", refreshValues );
    $( "#sliderNumber" ).slider( "option", "max", 100 );
    $( "#sliderNumber" ).slider( "option", "value", 40 );
//    $( "#sliderNumber" ).slider( "option", "slide", refreshValues );
    $( "#sliderNumber" ).slider( "option", "change", refreshValues );
	maxNumbers = $('#sliderNumber').slider( "option", "value" );
	places = $('#sliderPlaces').slider( "option", "value" );
    $( "#sliderBoxesHvalue" ).html(boxesH);
    $( "#sliderBoxesVvalue" ).html(boxesV);
    $( "#sliderPlacesvalue" ).html(places);
    $( "#sliderNumbervalue" ).html(maxNumbers);
	boxesHmax = $('#sliderBoxesH').slider( "option", "max" );
	boxesVmax = $('#sliderBoxesV').slider( "option", "max" );
	placesMax = $('#sliderPlaces').slider( "option", "max" );
	NumberMax = $('#sliderNumber').slider( "option", "max" );
    $( "#sliderBoxesHmax" ).html(boxesHmax);
    $( "#sliderBoxesVmax" ).html(boxesVmax);
    $( "#sliderPlacesmax" ).html(PlacesMmax);
    $( "#sliderNumbermax" ).html(NumberMax);

}

function refreshValues1(){
alert('Hallo');
	boxesH = $('#sliderBoxesH').slider( "option", "value" );
	boxesV = $('#sliderBoxesV').slider( "option", "value" );
	places = $('#sliderPlaces').slider( "option", "value" );
		maxBoxes = (boxesH * boxesV);
		if (places > maxBoxes) {places = maxBoxes;}
	    $( "#sliderPlaces" ).slider( "option", "max", maxBoxes );
	    $( "#sliderPlaces" ).slider( "option", "value", places );
}

function refreshValues(){
alert('hallo');
	boxesH = $('#sliderBoxesH').slider( "option", "value" );
	boxesV = $('#sliderBoxesV').slider( "option", "value" );
	maxNumbers = $('#sliderNumber').slider( "option", "value" );
	places = $('#sliderPlaces').slider( "option", "value" );
    $( "#sliderBoxesHvalue" ).html(boxesH);
    $( "#sliderBoxesVvalue" ).html(boxesV);
    $( "#sliderPlacesvalue" ).html(places);
    $( "#sliderNumbervalue" ).html(maxNumbers);
	emptyPlaces = maxBoxes - places;
	$('#card').width(boxesH*100).height(boxesV*100);
}
