var assert    = require('assert');
var extend    = typeof(process) !== 'undefined' && typeof(process.exit) === 'function' ? require('..') : require('extend-class');

describe('extend', function() {

	it('the new child should be instance of parent', function() {
		function Parent() {}
		var Child = extend(Parent);
		var child = new Child();
		assert(child instanceof Parent);
	});

	it('the new child should have parent properties', function() {

		function Parent() {}
		Parent.prototype.GENDER_MALE    = 'MALE';
		Parent.prototype.GENDER_FEMALE  = 'FEMALE';
		Parent.prototype.sleep  = function() {};

		var Child = extend(Parent);

		assert(Parent.prototype.GENDER_MALE,    Child.prototype.GENDER_MALE);
		assert(Parent.prototype.GENDER_FEMALE,  Child.prototype.GENDER_FEMALE);
		assert(Parent.prototype.sleep,          Child.prototype.sleep);

		var child = new Child();

		assert(Parent.prototype.GENDER_MALE,    child.GENDER_MALE);
		assert(Parent.prototype.GENDER_FEMALE,  child.GENDER_FEMALE);
		assert(Parent.prototype.sleep,          child.sleep);

	});

	it('the new child should have child properties', function() {

		function Parent() {}
		var properties = {
			GENDER_MALE:    'MALE',
			GENDER_FEMALE:  'FEMALE',
			sleep:          function() {}
		};

		var Child = extend(Parent, properties);

		assert(properties.GENDER_MALE,    Child.prototype.GENDER_MALE);
		assert(properties.GENDER_FEMALE,  Child.prototype.GENDER_FEMALE);
		assert(properties.sleep,          Child.prototype.sleep);

		var child = new Child();

		assert(properties.GENDER_MALE,    child.GENDER_MALE);
		assert(properties.GENDER_FEMALE,  child.GENDER_FEMALE);
		assert(properties.sleep,          child.sleep);

	});

	it('when I don\'t provide a constructor, new child should call the parent constructor', function() {

		function Parent() { this.klass = 'Parent'; }
		var Child = extend(Parent);

		var child = new Child();
		assert('Parent', child.klass);

	});

	it('when I provide a constructor, new child should call the child constructor', function() {

		function Parent() { this.klass = 'Parent'; }
		var Child = extend(Parent, {
			constructor: function() {
				this.klass = 'Child';
			}
		});

		var child = new Child();
		assert('Child', child.klass);

	});

	it('when I provide a constructor, new child should call the child constructor and then the parent constructor', function() {

		function Parent() {
			this.klass = this.klass || [];
			this.klass.push('Parent');
		}
		var Child = extend(Parent, {
			constructor: function() {
				this.klass = this.klass || [];
				this.klass.push('Child');
			}
		});

		var child = new Child();
		assert('Child',   child.klass[0]);
		assert('Parent',  child.klass[1]);

	});

});
