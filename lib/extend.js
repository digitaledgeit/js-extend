/**
 * Create a new class extending from a parent class
 * @param   {Function}  parentClass       The parent class which will be extended
 * @param   {Object}    [childPrototype]  The child prototype which will be copied
 * @returns {Child}
 */
module.exports = function(parentClass, childPrototype) {
  
  if (typeof parentClass !== 'function') {
		throw new Error ('Parent class is not a function');
	}

  //create the child class
  function Child() {
    if (childPrototype && childPrototype.construct) {
      childPrototype.construct.apply(this, arguments);
    } else {
      parentClass.prototype.constructor.apply(this, arguments);
    }
  }

  //extend the parent class
  if (Object.create) {
    Child.prototype = Object.create(parentClass.prototype);
  } else {
    Child.prototype = new parentClass;
  }
  Child.prototype.constructor = parentClass;

  //copy the prototype methods into the child class
  if (childPrototype) {
    for (var key in childPrototype) {
      if (Object.prototype.hasOwnProperty.call(childPrototype, key)) {
        Child.prototype[key] = childPrototype[key];
      }
    }
  }

  return Child;
}
