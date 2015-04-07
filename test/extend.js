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

		assert.equal(Parent.prototype.GENDER_MALE,    Child.prototype.GENDER_MALE);
		assert.equal(Parent.prototype.GENDER_FEMALE,  Child.prototype.GENDER_FEMALE);
		assert.equal(Parent.prototype.sleep,          Child.prototype.sleep);

		var child = new Child();

		assert.equal(Parent.prototype.GENDER_MALE,    child.GENDER_MALE);
		assert.equal(Parent.prototype.GENDER_FEMALE,  child.GENDER_FEMALE);
		assert.equal(Parent.prototype.sleep,          child.sleep);

	});

	it('the new child should have child properties', function() {

		function Parent() {}
		var properties = {
			GENDER_MALE:    'MALE',
			GENDER_FEMALE:  'FEMALE',
			sleep:          function() {}
		};

		var Child = extend(Parent, properties);

		assert.equal(properties.GENDER_MALE,    Child.prototype.GENDER_MALE);
		assert.equal(properties.GENDER_FEMALE,  Child.prototype.GENDER_FEMALE);
		assert.equal(properties.sleep,          Child.prototype.sleep);

		var child = new Child();

		assert.equal(properties.GENDER_MALE,    child.GENDER_MALE);
		assert.equal(properties.GENDER_FEMALE,  child.GENDER_FEMALE);
		assert.equal(properties.sleep,          child.sleep);

	});

	it('when I don\'t provide a constructor, new child should call the parent constructor', function() {

		function Parent() { this.klass = 'Parent'; }
		var Child = extend(Parent);

		var child = new Child();
		assert.equal('Parent', child.klass);

	});

	it('when I provide a constructor, new child should call the child constructor and not the parent constructor', function() {

		function Parent() { this.klass = 'Parent'; }
		var Child = extend(Parent, {
			construct: function() {
				this.klass = 'Child';
			}
		});

		var child = new Child();
		assert.equal('Child', child.klass);

	});

	it('when I provide a constructor, new child should call the child constructor and then the parent constructor', function() {

		function Parent() {
			this.klass = this.klass || [];
			this.klass.push('Parent');
		}
		var Child = extend(Parent, {
			construct: function() {
				this.klass = this.klass || [];
				this.klass.push('Child');
				Parent.call(this);
			}
		});

		var child = new Child();
		assert.equal('Child',   child.klass[0]);
		assert.equal('Parent',  child.klass[1]);

	});

});
