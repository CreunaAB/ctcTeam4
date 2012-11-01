/*  
 *  Declare standard objects for the API (model/view)
 */
var sp = getSpotifyApi(1);
var m = sp.require('sp://import/scripts/api/models');
var v = sp.require('sp://import/scripts/api/views');
var dom = sp.require('sp://import/scripts/dom');

console.log(m.Playlist);

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
	var imgUrl = (maxLength > 60) ? "/assets/cassette_90.png" : "/assets/cassette_60.png";
	var sectionImport = $(document.createElement('section'));
	sectionImport.addClass('import-playlist');
	sectionImport.addClass('c' + maxLength);

	var title = createTextElement('<h2>', 'Du har valt ' + maxLength + ' minuter');
	sectionImport.append(title);

	var wrapperSideA = $(document.createElement('div'));
	wrapperSideA.addClass('wrapper-side-a');
	$(sectionImport).append(wrapperSideA);

	var imgWrapperSideA = $(document.createElement('div'));
	imgWrapperSideA.addClass('imageWrapper');
	var imgSideA = $('<img>');
	imgSideA.attr('src', imgUrl);
	imgSideA.addClass('img-side-a');
	imgWrapperSideA.append(imgSideA);
	wrapperSideA.append(imgWrapperSideA);

	var labelA = createTextElement('<label>', 'Sida A');
	wrapperSideA.append(labelA);
	var sideA = createInputElement('playlist-input-a');
	wrapperSideA.append(sideA);

	var wrapperSideB = $(document.createElement('div'));
	wrapperSideB.addClass('wrapper-side-b');
	$(sectionImport).append(wrapperSideB);

	var submitSideA = createTextElement('<button>', 'Importera');

	submitSideA.addClass('add-playlist-a');
	submitSideA.on('click', function(e) {
		validatePlaylist(sideA.val(), maxLength, labelA);
	});
	
	$('.app').append(sectionImport);

	$('.playlist-input-a').after(submitSideA);

	var imgWrapperSideB = $(document.createElement('div'));
	imgWrapperSideB.addClass('imageWrapper');
	var imgSideB = $('<img>');
	imgSideB.attr('src', imgUrl);
	imgSideB.addClass('img-side-b');
	imgWrapperSideB.append(imgSideB);
	wrapperSideB.append(imgWrapperSideB);	

	var labelB = createTextElement('<label>', 'Sida B');
	wrapperSideB.append(labelB);
	var sideB = createInputElement('playlist-input-b');
	wrapperSideB.append(sideB);	


	var submitSideB = createTextElement('<button>', 'Importera');
	submitSideB.addClass('add-playlist-b');
	submitSideB.on('click', function(e) {
		validatePlaylist(sideB.val(), maxLength, labelB);
	});
	wrapperSideB.append(submitSideB);

}

function createTextElement(element, text) {
	var $element = $(element);
	$element.text(text);
	return $element;
}

function createInputElement(className) {
	var input = $(document.createElement('input'));
	input.addClass(className);
	input.attr('placeholder', 'Klistra in din playlist URI');
	return input;
}

function validatePlaylist(val, maxLength, parent)
{
	var playlist = getPlayList(val);
	var maxSecondsPerSide = (maxLength * 60) / 2;
	if (playlist == null) {
		alert("Ogiltig playlist URI!");
	}
	else if(!isValidPlayList(playlist, maxSecondsPerSide)) {
		alert("Din playlist är tyvärr för lång, prova med någon annan!");
	}
	else {
		// Send all tracks in playlist for setting labels
		generateTitle(new m.Track.fromURI(playlist.data.all());
		createPlaylistView(playlist, parent, maxSecondsPerSide);
	}
}

function getPlayList(playListUri) {
	try {
		return m.Playlist.fromURI(playListUri);
	}
	catch(err) {
		return null;
	}
}

function isValidPlayList(playlist, maxSecondsPerSide) {
	if (playlist.data.getDuration() > maxSecondsPerSide)
		return false;
	else
		return true;
}

function createPlaylistView(playlist, parent, maxSecondsPerSide) {
	if (parent.parent().find('.sp-list')) {
		parent.parent().find('.sp-list').remove();
	}
	var list = new v.List(playlist, function(track) {
		return new v.Track(track, v.Track.FIELD.STAR | v.Track.FIELD.POPULARTIY | v.Track.FIELD.ARTIST | v.Track.FIELD.NAME | v.Track.FIELD.DURATION );
	});
	parent.before(list.node);
	var duration = playlist.data.getDuration();
	parent.before(createTextElement('<p class="data">', 'Längd Sida A: ' + Math.floor(duration/60) + ':' + pad(duration%60, 2) + "min"));
	duration = maxSecondsPerSide - duration;
	parent.before(createTextElement('<p class="data">', 'Wasted Time: ' + Math.floor(duration/60) + ':' + pad(duration%60, 2) + "min"));

	// Add label to side
	var label = createTextElement('<p>', 'Titel');
	parent.parent().find('.imageWrapper img').before(label);
}

function pad(number, length) { 
	return (number+"").length >= length ? number + "" : pad("0" + number, length);
}
