// Instantiate using the `new` keyword - presently less common way
const obj1 = new Object();
// Need to assign fields individually
obj1.name = 'Alan';

// Object literal - more efficient and readable way to create an object
const obj2 = {
  name: 'John',
}

// Create an object from another object
const obj3 = Object.create(obj2);
obj3.name = 'Aaron';

// Create an object from iterable key / value pairs
const data = [
  ['name', 'Jane']
];
const obj4 = Object.fromEntries(data);

function printName() {
  console.log(this.name);
}

printName.call(obj1, 1);
printName.call(obj2, 2);
printName.call(obj3, 3);
printName.call(obj4, 4);

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

Object.defineProperty(obj9, 'hiddenFromLoop', {enumerable: false})

// Looping
// For..of (for values) will not work as object is not iterable
// For..in for keys
for (let i in obj9) {
  console.log(i);
}

console.log(Object.getOwnPropertyNames(obj9));
