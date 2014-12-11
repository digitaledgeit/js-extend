var extend = typeof(process) !== 'undefined' && typeof(process.exit) === 'function' ? require('..') : require('extend-class');

function Animal(name) {
	this.name = name;
}

Animal.prototype = {

	speak: function(msg) {
		return this.name+' said "'+msg+'"';
	},

	noise: function() {
		throw new Error('Not implemented');
	}

};

var Cat = extend(Animal, {

	noise: function() {
		return 'Meeow!'
	}

});

var GrumpyCat = extend(Cat, {

	speak: function(msg) {
		return Cat.prototype.speak.call(this, msg)+' in a grumpy voice';
	}

});

if (typeof(module) === 'undefined') {
	module = {};
}

module.exports = {
	Animal:     Animal,
	Cat:        Cat,
	GrumpyCat:  GrumpyCat
};