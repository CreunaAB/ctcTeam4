
var words = [
	[['Indie,Alternative,Shoe Gaze,Arty','Happy,Tween,Glowing'], ['Gangsta,Tha','Whigger,Yo MTV Raps'], ['Beard,Howling,Dusty,Old Fart', 'Yuppie,Svennish'], ["Corpse Painted,The Pathologist's", "Sleazy"]], 
	[['Sleepover','Party,Knockout,Festival'], ['Shootout,Street','Beatbox competition,Underground'], ['Sausage Fest', 'Slam,Festival,Fredagsmys'], ["Basement Gig","Ozzfest,Sleaze"]]
];

var allGenres = [
	['pop','britpop','indie'], ['hip hop','gangsta'],['rock','indie rock'],['metal','speed','thrash']
];

var getInfoUrl = "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=3ae37c5d590b9d40230da7f6ee31081d&artist={0}&track={1}&format=json";

var responseCount = 0;

var generateTitle = function(tracks) {
	ratings = new Array(tracks.length);

	var trackGenres = new Array();
	// console.log(trackGenres);		
	var responsesLeft = tracks.length;
	for(var i = 0; i < tracks.length; i++) {
		var track = new m.Track.fromURI(tracks[i]);
		ratings[i] = track.data.popularity;
		var artistName = track.artists[0].name;
		/* getJSON */
		var url = getInfoUrl.replace("{0}", artistName).replace("{1}", track.name);
		// console.log(url);
		// var trackGenres = "";
		var json = $.getJSON(url, function(data){
			// console.log(data);
			for(var j = 0; j < data.track.toptags.tag.length; j++) {
				// console.log(trackGenres[i]);
				var tagName = data.track.toptags.tag[j].name;
				for(var k = 0; k < allGenres.length; k++) {
					if(allGenres[k].indexOf(tagName.toLowerCase()) >= 0) {
						 // console.log(allGenres[k]);
						trackGenres.push(allGenres[k][0]);
						responsesLeft--;
						if(responsesLeft === 0) {
							var distinctGenres = [];
							
							$.each(trackGenres, function(i, element){
								if($.inArray(element, distinctGenres) === -1) distinctGenres.push(element);
							});
							
							if(distinctGenres.length < 3) {
								distinctGenres.push(distinctGenres[distinctGenres.length - 1]);
								distinctGenres.push(distinctGenres[distinctGenres.length - 1]);
								distinctGenres.push(distinctGenres[distinctGenres.length - 1]);
							}
							console.log(distinctGenres);
							generateTitleFromRatingsAndGenres(ratings, distinctGenres);
						}
						return;
					}
				}
			}
		});
	}

	// console.log(trackGenres);		
	
	// var sum = 0;
	// for(var i = 0; i < ratings.length; i++) {
		// sum += ratings[i];
	// }
	// var average = sum / ratings.length;
	
	// var ratingIndex = average < 40 ? 0 : 1;
	
	// console.log(generateTitleFromRatingsAndGenres(ratingIndex, ['pop','metal','metal']));
	
	
}

var generateTitleFromRatingsAndGenres = function(ratings, genres) {
	var sum = 0;
	for(var i = 0; i < ratings.length; i++) {
		sum += ratings[i];
	}
	var average = sum / ratings.length;
	
	var ratingIndex = average < 40 ? 0 : 1;
	
	// console.log(generatetitlefromratingsandgenres(ratingindex, ['pop','metal','metal']));

	var title = "";
	
	var genreIndex = getGenreIndex(genres[0]);
	firstSubstantive = getRandomWord(words[0][genreIndex][ratingIndex]);
	
	genreIndex = getGenreIndex(genres[1]);
	secondSubstantive = getRandomWord(words[0][genreIndex][ratingIndex]);
	
	var substantive = firstSubstantive === secondSubstantive ? firstSubstantive : firstSubstantive + ' ' + secondSubstantive;
	
	title += substantive + ' ';
	
	var genreIndex = getGenreIndex(genres[0]);
	title += getRandomWord(words[1][genreIndex][ratingIndex]);
	
	console.log(title);
	return title;
}

var getGenreIndex = function(genre) {
	switch(genre.toLowerCase()) {
		case 'pop':
			return 0;
		case 'hip hop':
			return 1;
		case 'rock':
			return 2;
		case 'metal':
			return 3;
	}
}

var getRandomWord = function(wordsValue) {
	var words = wordsValue.split(',');
	return words[Math.floor(Math.random() * words.length)];
}

//var getDominantGenre


// console.log(generateTitle([1,2,3], ['pop', 'hip Hop', 'pop']));
// console.log(generateTitle([1,1,1], ['rock', 'rock', 'rock']));
// console.log(generateTitle([1,2,3], ['rock', 'pop', 'hip hop']));
// console.log(generateTitle([1,2,3], ['hip hop', 'pop', 'hip hop']));
// console.log(generateTitle([1,2,3], ['hip hop', 'pop', 'hip hop']));
// console.log(generateTitle([1,2,3], ['metal', 'pop', 'metal']));
// console.log(generateTitle([1,1,1], ['metal', 'pop', 'metal']));




 