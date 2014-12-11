var assert    = require('assert');
var extend    = typeof(process) !== 'undefined' && typeof(process.exit) === 'function' ? require('..') : require('extend-class');

var animals   = require('../example/animals');
var Animal    = animals.Animal || Animal;
var Cat       = animals.Cat || Cat;
var GrumpyCat = animals.GrumpyCat || GrumpyCat;

describe('Example', function() {

	it('child should be an instance of parent', function() {
		var gc = new GrumpyCat('Fred');
		assert(gc instanceof Cat);
	});

	it('child should be an instance of ancestor', function() {
		var gc = new GrumpyCat('John');
		assert(gc instanceof Animal);
	});

});
