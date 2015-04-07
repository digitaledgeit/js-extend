# extend-class

Creates a new class inheriting the methods and properties of a parent class, and copies a new set of methods and properties to the child class.

 - Uses [prototypal inheritance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain)
 - The `instanceof` operator works
 - If present, a constructor named `construct` is called

**Note:** Large prototype chains can impact performance. Use sparingly. 

## Install

With npm:

    npm install --save extend-class

With componentjs:

    component install --save extend-class
    
## Example
    
    var extend = require('extend-class');
    
    ...
    
    var Cat = extend(Animal, {
    
        construct: function() {
            Animal.call(this);
        },
    
        noise: function() {
            return 'Meeow!'
        }
    
    });