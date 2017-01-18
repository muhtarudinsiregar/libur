/* eslint-disable no-console */
/*eslint-env node*/

const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const baseUrl     = "http://www.liburnasional.com/";

axios.get(baseUrl).then(response => {
	var $ = cheerio.load(response.data);

	var sources = $(".dropdown-menu").eq(0).children().children();

	var years = [];

	sources.each(function(index, response) {

		var uncleanYear = response.children[0].data.split(" ");

		var year = uncleanYear[uncleanYear.length - 1];

		years.push({
			year: parseInt(year),

			link: response.attribs.href,

			data: []
		});
	});

	// assign data value
	years.forEach(function(response, index){
		var url = baseUrl+response.link;

		axios.get(url).then(function(res){

			var $ = cheerio.load(res.data);

			$(".libnas-calendar-holiday-title").each(function(x, y) {

				years[index].data.push({

					day     : y.children[1].children[0].data,

					date    : y.children[2].children[0].data,

					event   : y.children[0].children[0].children[0].children[0].data
				});

				fs.writeFile("hari-libur.json", JSON.stringify(years, null, 2), function (err) {

					var notify = "Berhasil perbarui hari-libur.json";

					if (err) notify = err;

					console.log(notify);
				});
			});
		});
	});

}).catch(error => {

	console.log(error);

});
