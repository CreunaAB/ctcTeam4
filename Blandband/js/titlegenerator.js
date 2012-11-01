
var words = [
	[['Indie','Happy'], ['Gangsta','Whigger'], ['Beard', 'Yuppie']], 
	[['Sleepover','Party'], ['Shootout','Beatbox competition'], ['Sausage Fest', 'Slam']]
];

var generateTitle = function(ratings, genres) {
	var sum = 0;
	for(var i = 0; i < ratings.length; i++) {
		sum += ratings[i];
	}
	var average = sum / ratings.length;
	
	var ratingIndex = average < 2 ? 0 : 1;
	
	var title = "";
	
	var genreIndex = getGenreIndex(genres[0]);
	title += words[0][genreIndex][ratingIndex] + ' ';
	
	genreIndex = getGenreIndex(genres[1]);
	title += words[0][genreIndex][ratingIndex] + ' ';
	
	var genreIndex = getGenreIndex(genres[0]);
	title += words[1][genreIndex][ratingIndex] + ' ';
	
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
	}
}

//var getDominantGenre


console.log(generateTitle([1,2,3], ['pop', 'hip Hop', 'pop']));
console.log(generateTitle([1,1,1], ['rock', 'rock', 'rock']));
console.log(generateTitle([1,2,3], ['rock', 'pop', 'hip hop']));
console.log(generateTitle([1,2,3], ['hip hop', 'pop', 'hip hop']));




 