// Strict mode for better error handling
'use strict'

// Instantiate using the `new` keyword - presently less common way
const obj1 = new Object();
// Need to assign fields individually
obj1.name = 'Alan';

// Object literal - more efficient and readable way to create an object
const obj2 = {
  name: 'John',
}

// Object.create doesn't copy an object — it sets up a prototype link
const obj3 = Object.create(obj2);

// Create way to copy
const obj2Clone = Object.assign({}, obj2)

// Changing obj2 will change obj3 as it is a prop of obj2 until obj3 shadows it
obj2.name = 'Aaron';

// Correct way for true inheritance usage
const objNeedingProto = {};
objNeedingProto.prototype = Object.create(Object.getPrototypeOf(obj2));
console.log(Object.getPrototypeOf(objNeedingProto))
console.log(objNeedingProto.prototype)

// Create an object from iterable key / value pairs
const data = [
  ['name', 'Jane']
];
const obj4 = Object.fromEntries(data);

function printName() {
  console.log(this.name);
}

printName.call(obj1);
printName.call(obj2);
printName.call(obj2Clone);
// This will also show Aaron as name is a prop of obj2
printName.call(obj3);
printName.call(obj4);

// You can copy properties from one object to another
const obj5 = {
  name: 'Danielle',
  age: 56,
}

const obj6 = {
  name: 'Logan',
  height: 1.7,
}

// First param is target - the one to change
// Existing fields will be merged too - new values overwrite target
Object.assign(obj6, obj5);
console.log(obj6);

// Object comparison is by reference (memory address)
const obj7 = {
  name: 'Gary',
  age: 42,
  isMember: true,
}
console.log(obj7 === { name: 'Gary' })

const obj8 = obj7;
console.log(obj8 === obj7);

// Get fields of an object
console.log(Object.entries(obj8))
// Another way to clone fields?
const obj9 = Object.fromEntries(Object.entries(obj8));
console.log(obj8 == obj9);

// Get keys
console.log(Object.keys(obj9)) // [ 'name', 'age', 'isMember' ]
console.log(Object.values(obj9)) // [ 'Gary', 42, true ]

// Groupby - 2024 feature
const getNamesBeginningWithA = (obj) => obj.name[0] === 'A' ? 'Begins with A' : 'Does not begin with A';
console.log(Object.groupBy([obj1, obj2, obj3], getNamesBeginningWithA));

Object.defineProperty(obj9, 'hiddenFromLoop', { enumerable: false })

// Looping
// For..of (for values) will not work as object is not iterable
// For..in for keys
for (let i in obj9) {
  console.log(i);
}

console.log(Object.getOwnPropertyNames(obj9));

// Create new object with no prototype chain
const obj10 = Object.create(null);

console.log(Object.getPrototypeOf(obj10));

// With configurable false - descriptors are locked except for writable
Object.defineProperty(obj10, 'name', {
  value: 'Alan',
  enumerable: false,
  writable: true,
  configurable: false,
});

console.log(obj10.name);

obj10.name = 'Jess';
console.log(obj10.name);

// writable descriptor can be set to false for added security
Object.defineProperty(obj10, 'name', { writable: false }); // undeclared desciptors not modified

try {
  obj10.name = 'Gary';
} catch {
  console.log('Cannot rename to Gary');
}

console.log(obj10.name);

// writable descriptor cannot be set to true if it is false and non-configurable
try {
  Object.defineProperty(obj10, 'name', { writable: true }); // error
} catch {
  console.log('Cannot change writable to')
};
console.log(obj10.name);

try {
  obj10.name = 'Gary';
} catch {
  console.log('Still cannot rename to Gary');
}

const proto = Object.create(Object.getPrototypeOf({}));
proto.prop1 = 'prop 1';
const obj11 = Object.create(proto);

// DefineProperties sets descriptors as false by default
// Direct assignment e.g. obj11.prop = 1 defaults descriptors to true
Object.defineProperties(obj11, {
  _name: {
    value: '',
    writable: true,
    enumerable: false,
  },
  name: {
    get: () => this._name,
    set: (name) => this._name = name,
    enumerable: true,
  }
});

// Shows properties of obj not inc prototype and are enumerable or not
console.log('getOwnPropertyNames: ', Object.getOwnPropertyNames(obj11));

// Shows properties of obj that are enumerable
for (let prop in obj11) {
  console.log('prop: ', prop);
}

// Shows descriptor by name
console.log('getOwnPropertyDescriptor: ', Object.getOwnPropertyDescriptor(obj11, 'name'));
// Inherited property not own
console.log('hasOwnProperty: ', Object.hasOwnProperty(obj11, 'prop1'));

const obj12 = {
  name: 'Tina',
}

obj12.age = 77;
obj12.occupation = 'engineer';
Object.preventExtensions(obj12);

// This does nothing now
try {
  obj12.height = 155;
} catch {
  console.log('Cannot add new field');
}
console.log(obj12);

// Prevent extensible allows deletion
delete obj12.age;
console.log(obj12);

// Prevent deletion and extension but can change value 
Object.seal(obj12);

try {
  // This does nothing now
  delete obj12.occupation;
} catch {
  console.log('Cannot delete field');
}

console.log(obj12);

// We can still update existing props
obj12.occupation = 'teacher'

Object.defineProperty(obj12, 'occupation', {
  value: 'mechanic',
  writable: false,
});

console.log(Object.getOwnPropertyDescriptor(obj12, 'occupation'));

try {
  obj12.occupation = 'welder';
} catch {
  console.log('Cannot modify occupation field');
}


console.log(obj12);

// Makes existing properties non-configurable
Object.freeze(obj12);

try {
  obj12.name = 'Mary';
} catch {
  console.log('Cannot modify anything');
}
console.log(obj12);

const arr1 = ['orange', 'apple', 'pear'];
Object.preventExtensions(arr1);

try {
  arr1.push('watermelon');
} catch {
  console.log('Cannot add');
}

// Can still remove
arr1.pop();
console.log(arr1);

Object.seal(arr1);

try {
  arr1.pop()
} catch {
  console.log('Cannot delete');
}

// Can still modify
arr1[0] = 'lime';
console.log(arr1);

// Prevents editing existing entries
Object.freeze(arr1);

try {
  arr1[0] = 'lemon';
} catch {
  console.log('Cannot modify array entry')
}

console.log(arr1);
