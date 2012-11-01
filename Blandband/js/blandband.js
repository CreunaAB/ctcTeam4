/*  
 *  Declare standard objects for the API (model/view)
 */
var sp = getSpotifyApi(1);
var m = sp.require('sp://import/scripts/api/models');
var v = sp.require('sp://import/scripts/api/views');
var dom = sp.require('sp://import/scripts/dom');

function init()
{
	$('.deck-picker a').on('click', function(e){
		e.preventDefault();
		$('.cassette-picker').remove();

		if ($(this).hasClass('c_60')) {
			importPlaylistView(60);
		}
		else {
			importPlaylistView(90);
		}
	});
}

function importPlaylistView(maxLength)
{
	var imgUrl = (maxLength > 60) ? "/assets/cassette_90_large.png" : "/assets/cassette_60_large.png";
	var sectionImport = $(document.createElement('section'));
	sectionImport.addClass('import-playlist');

	var title = createTextElement('<h2>', 'Du har valt ' + maxLength + ' minuter');
	sectionImport.append(title);

	var img = $('<img>');
	img.attr('src', imgUrl);
	sectionImport.append(img);

	var labelA = createTextElement('<label>', 'Sida A');
	sectionImport.append(labelA);
	var sideA = createInputElement();
	sectionImport.append(sideA);

	var submit = createTextElement('<button>', 'Importera');
	submit.addClass('add-playlist');
	submit.on('click', function(e) {
		if(!isValidPlayList(sideA.val(), maxLength)) {
			alert("Invalid playlist for Side A, please try another.");
		}
	});
	sectionImport.append(submit);

	$('.app').append(sectionImport);
}

function createTextElement(element, text) {
	var $element = $(element);
	$element.text(text);
	return $element;
}

function createInputElement() {
	var input = $(document.createElement('input'));
	input.addClass('playlist-input');
	input.attr('placeholder', 'Klistra in din playlist URI');
	return input;
}

function parsePlayList(playListUri, maxLength) {
	var playlist = m.Playlist.fromURI(playListUri);
	if(playlist.data.getDuration() > maxLength * 60)
	{
		alert("Invalid playlist, please try another.");
	}
}