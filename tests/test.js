/* eslint-env node, mocha */
var assert = require("assert");
const expect = require("chai").expect;

const Libur = require("../src");
const libur = new Libur();


describe("Libur", function() {
	var year = libur.getYears();

	it("should return 2013", function() {

		assert.equal(2013, year[0]);
	});

	it("harus kembalikan data tahun dari param yang dipilih", function() {
		var actualDataLibur = libur.getDataByYear(2013);

		assert.equal(2013, actualDataLibur[0].year);
	});

	it("return false jika param tidak diisi di func getDataByYear()", function() {
		var actualDataLibur = libur.getDataByYear();

		assert.equal(false, actualDataLibur);
	});

	it("return tanggal, hari dan event libur", function() {
		var actualDataLibur = libur.getDataByYear(2013);

		expect("1 Januari 2013").to.equal(actualDataLibur[0].data[0].date);

		expect("Selasa").to.equal(actualDataLibur[0].data[0].day);

		expect("Tahun Baru Masehi").to.equal(actualDataLibur[0].data[0].event);
	});
});
