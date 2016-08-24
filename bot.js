//About: Bot to tweet a constitution article to Twitter randomly.

// * Packages * //
var recursiveReadSync = require('recursive-readdir-sync'), files;
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

//B.- Setting Variables//
var corp = [];
var r = './capart';
var d = recursiveReadSync(r);

//C.- Extracting articles from HTMLs//
for(var i = 0; i < d.length; i++){
	var $ = cheerio.load(fs.readFileSync(d[i],'utf8'));
	$('#main_content li').each(function() {
		var cuerpo = $(this).text();
		corp.push(cuerpo.slice(0,113) + ' goo.gl/fBY9Pq');
	});	
};

function twitear(){
	var tweetPiece = corp[Math.floor(Math.random()*corp.length)];

	var tweet = {
		status: tweetPiece
	}

	console.log(tweet);

	T.post('statuses/update', tweet, function(err, data, response) {
	  console.log(data);
	  console.log('DONE!!!');
	})
}

setInterval(twitear, 1000*60*45)
twitear();