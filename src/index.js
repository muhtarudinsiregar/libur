/*eslint-env node*/
/* eslint-disable no-console */
"use strict";
const data = require("../hari-libur.json");

class Libur {
	constructor() { }

	getYears() {
		var years = data.map(value => {
			return value.year;
		});

		return years;
	}

	getDataByYear(year) {
		var dataLibur = data.filter (value => {
			if (value.year === year) {
				return value;
			}

			return false;
		});

		return dataLibur;
	}
}

module.exports = function () {
	return new Libur();
};
