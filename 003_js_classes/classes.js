

// class declaration
class SomeClass {
  // constructor - special function for initializing object
  constructor(someParam) {
    this.greeting = someParam;
  }

  // method declaration - a function that the class has access to
  someMethod() {
    console.log(this.greeting)
  }

  // same as above
  someOtherMethod = function () {
    console.log(this.greeting)
  }

  // use FatArrow to bind this
  anotherMethod = () => {
    console.log(this.greeting)
  }
}

// initialize object passing in 'hello' as argument to contructor
const myClass = new SomeClass('hello');
myClass.someMethod();               // 'hello'

const obj = { greeting: 'ciao' };
// borrow method
myClass.someOtherMethod.call(obj);   // 'ciao'
myClass.someOtherMethod.apply(obj);  // 'ciao'

myClass.anotherMethod();             // 'hello'
myClass.anotherMethod.call(obj);   // 'hello'
myClass.anotherMethod.apply(obj);  // 'hello'

class SomeClass2 extends SomeClass {
  constructor() {
    // must call super when extending before `this` keyword is used else ReferenceError
    super('hi')
  }

  greet() {
    super.someMethod();
  }
}

const myClass2 = new SomeClass2();
myClass2.greet();

class SomeClass3 extends SomeClass2 {
  constructor() {
    super()
  }
}

const myClass3 = new SomeClass3();
myClass3.someMethod();
