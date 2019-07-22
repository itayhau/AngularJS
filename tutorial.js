console.clear()
console.log("log message")
console.info("log info")
console.warn("log info")
console.error("log error")
console.debug("will only appear in debug level")
console.table(["apples", "oranges", "bananas"]);
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}
console.table(new Person("John", "Smith"));
console.time("mytimer");
var unixtime_ms = new Date().getTime();
    while(new Date().getTime() < unixtime_ms + 10) {}
console.timeLog("mytimer");

// show filter

function c(msg) { 
  	console.log(msg); 
    // console.trace()
}
var x = 42 // no type in creation
c(typeof x)

x = "42" // type can modify
c(typeof x)

var z
c(z)
// c(z2) -- error

var y = null
c(typeof y) // why object?

c(typeof true); //"boolean"
c(typeof Boolean(true)); //"boolean"

c(typeof new Boolean(true)); //"object"
c(typeof (new Boolean(true)).valueOf()); //"boolean"
 
c(typeof "abc"); //"string"
c(typeof String("abc")); //"string"
c(typeof new String("abc")); //"object"
c(typeof (new String("abc")).valueOf()); //"string"
 
c(typeof 123); //"number"
c(typeof Number(123)); //"number"
// why use number object? to get extra methods. while avoiding auto-box
c(typeof new Number(123)); //"object"
c(typeof (new Number(123)).valueOf()); //"number"

c("123".length) // why?  answer: auto-boxing


var x1 = 5
var x2 = "5"
c(x1 == x2)
c(x1 === x2)

// ============================ Objects
var o1 = { }
o1.name = "itay"
var o2 = { name : "itay" }
o2["new property"] = "new" // good for spaces. slower then dot notation
c(o2)
var o3 = { name : "dana", address : { city: "Tel-Aviv", street : "Hertzel"}} // nested
var o4 = { good : "good", bad : "bad"}
delete o4.bad
c(o4)
var ox1 = 1
var ox2 = 2
var o5 = { ox1, ox2 } // property shorthand
var o6 = { normal : "normal", [new Date()] : 42} // calculated property
c(o6)
var o7 = { x : 5, getX : function() { return this.x} } // method inside
var o8 = { x : 5, getX() { return this.x }} // method inside ES6
function CreatePerson(id, name)
{
  var result = { id, name }
  return result
}
var p1 = CreatePerson(1, "itay")
c(p1)
function Person(id, name) // constructor mode
{
  this.id = id
  this.name = name
  return this
}
var p2 = new Person(1, "itay") // must use new
c(p2)

// ============================ Functions
var f = function func() { return 5; }
console.log(f); // prints method
console.log( f() ); // 5

var executor = function (funcName) { console.log ( funcName() ); }
var f = function func() { return 5; }
executor(f); // 5

var executor = function (funcName, number) { console.log ( funcName(number) ); }
var f = function func(number) { return number; }
executor(f, 3); // 3

function sayHello( a, b) { console.log("hello1"); }
function sayHello( a, b, c) { console.log("hello2"); } // overwrites previous
sayHello(1); // will always print hello2
sayHello(1, 2, 3); // will always print hello2
c( window.sayHello )

function sayHello( a, b) {
console.log(a);
console.log(b);
console.log(arguments[2]); // always contain arguments array
}
sayHello(1, 2, "suprise!");

function calc() { return 5; } // return value
var x = calc();
console.log(x); // 5

function calc_void() {  }
c ( calc_void() ) // same as console execution 0 always prints the returned value

// default parameters
function foo(x, y = 7, z = 42) 
{ 
  return x + y + z 
} 
c( foo(1) === 50 )

// rest parameters
function foo2(x, y, ...a) 
{ return (x + y) * a.length } 
c( foo2(1, 2, "hello", true, 7) === 9 )

// spread operator
var params = [ "hello", true, 7 ] 
var other = [ 1, 2, ...params ] // [ 1, 2, "hello", true, 7 ] 
function foo3(x, y, ...a) 
{ return (x + y) * a.length } 
c( foo3(1, 2, ...params) === 9 )
var str = "foo" 
var chars = [ ...str ] // [ "f", "o", "o" ]
c( chars )

// destructuring - DOES NOT WORK IN SCRATCHJS!!!!!!
// 1
//var list = [ 1, 2, 3 ] 
//var [ a12, , b12 ] = list 
//[ b12, a12 ] = [ a12, b12 ]
// 2
var dobj1 = { ao1: 1, bo1: 2, co1: 3}
var { ao1, bo1, co1} = dobj1
// 3 
function foo4([ name, val ]) {
    console.log(name, val)
}
function foo5({ name: n, val: v }) {
    console.log(n, v)
}
function foo6({ name, val }) {
    console.log(name, val)
}
foo4([ "bar", 42 ])
foo5({ name: "foo", val:  7 })
foo5({ val:  7, name: "foo" })
foo6({ name: "bar", val: 42 })

// ============================ Scopes
//Whenever you create variable it is added to window.<name>
{
var y_window = 12;
}
console.log(y_window); // 12
console.log(window.y_window); // 12

function foo7() { } // now there is window.foo7


// functions make scope
function hello() { var x2_scoped = 19; }
hello()
// console.log(x2_scoped); // error - undefined

// local variables override the parent[global] only in their scope
var inner = 50;
function print() {
var inner = 20;
console.log(inner); // 20
}
print();
console.log(inner); // 50

// IIFE - Immediately Invoked Function Expression -- leaves nothing behind...
// motivation: keep global scope cleaner (i.e. Angular 1)
// must be invoked immediately - ohterwise needs function name 
(function saveSpace()
{
var arr = [1,2,3,4,5,6,7];
console.log(typeof(arr));
console.log(arr.length);
})();
//Console.log(arr.length) // ERROR – does not exist!

// use strict
var a = 10;
var b = 20;
function func() { 
  var b = 20; 
  console.log(a + b); // or: console.log(a + window.b);
}
func();
// Global: a, b, func()
// func: b
// but what if we forget the var?
var name = "itay"
function printName() {
  namee ="new name"
}
// without strict mode searches all scopes till root, if not found? creates in root!!!
// bad...
// solution: "use strict" - this makes undefined variables usage produce an error

// closure
var a = 10;
function outer() {
	var b = 20;
	var inner = function() {
		a++;
		b++;
		console.log(a);
		console.log(b);
  }
	return inner;
}
var innerFn = outer();
innerFn(); // executes inner which uses b which is not inside the function
console.log("===========");
var innerFn2 = outer();
innerFn2(); // b is remembers....
// what will be printed?
// 11
// 21
// ===========
// 12
// 21
// why? 
// A closure is an inner function that has access to the outer (enclosing) function's variables—scope chain. 
// The closure has three scope chains: 
// it has access to its own scope (variables defined between its curly brackets), 
// it has access to the outer function's variables, 
// it has access to the global variables

// how to use closure to make getters/setters?
function Person(_name, _age) {
	var firstName = _name;
	var age = _age
	this.getName = function() {
    return firstName;
  }
  this.getAge = function() {
    return age;
  }
  this.setAge = function(value) {
    if (value >= 0)
      age = value
  }
}
var p3 = new Person("Ziv", 19)
c( p3.getName() ) // cannot modify name [no setter]
p3.setAge(-1)  // setter will not allow modification
c(p3.getAge())
p3.setAge(20)  // setter will not allow modification
c(p3.getAge())

// let, const
// always prefer let or const (to keep global cleaner)
// always prefer const over let [if the variable is not modify designated]
// 1
var x = 10;
// Here x is 10
{ 
  let x = 2;
  // Here x is 2
}
// Here x is 10
// 2
var i = 5;
for (var i = 0; i < 10; i++) {
  // some statements
}
// Here i is 10
// 3
let i2 = 5;
for (let i2 = 0; i2 < 10; i2++) {
  // some statements
}
// Here i2 is still 5

// const
// the keyword const is a little misleading.
// It does NOT define a constant value. It defines a constant reference to a value.
// Because of this, we cannot change constant primitive values, but we can change the properties of constant objects.
// to lock the object use freeze
const object1 = Object.freeze({   property1: 42 });
const object2 = Object.freeze(object1);
//object2["property1"] = 43 // this will cause an error , or stop the execution of the program
//c(object2.property1)

{
const PI = 3.141592653589793;
//PI = 3.14;      // This will give an error
//PI = PI + 10;   // This will also give an error  
// var PI = 2 -- this will work but has no sense
}
// c(PI) -- error

// hoisting
console.log(aaa); //undefined, but not error - conclusion: write your vars in the begining!!!
var aaa = 20;

// why hoisting must exist?
f1(); // will run f1
function f1() { console.log("hi from f1"); }
function f3() { 
  f4(); // must be hoisted 
}
function f4() { f3(); }
// this is why never define function using var
var badFunction = { } // function will be empty when called before this line!!
function goodFunction() { } // function will be loaded when called before this line

// ======================== fat arrow functions
// 1 Shorter syntax:
function addNoFat(x, y) { return x + y }
const addFat = (x, y) => x + y;
// For one argument: 
const pow2 = x => x*x;
const numbers = [1, 2, 3]; 
numbers.map( x => x * 2 ); // see below
// 2 Lexical this
// ES5
const team1 = {
  members: ['Jane', 'Bill'],
  teamName: 'Super Squad',
  teamSummary: function() {
    return this.members.map(function(member) {
      return `${member} is on team ${this.teamName}`;
    }.bind(this))
  }
}
console.log( "bind: " + team1.teamSummary() )
// ES6
const team2 = {
  members: ['Jane', 'Bill'],
  teamName: 'Super Squad',
  teamSummary() {  // this == team
       return this.members.map(member => `${member} is on team ${this.teamName}`)}
 }
console.log( "=>" + team2.teamSummary() )

// ========================= arrays + functions
// 1
var arrString = ["first", "second", "third"];
var arr=[1,2,3];
var arr2 = arr;
console.log(arr[0]);
console.log(arr);
console.log(arr.length);
arr[3] = 12; // adding on-the-fly
console.log(arr);
console.log(arr.length); //4
console.log(arr2.length); //4
arr[500] = 1;
console.log(arr);
console.log(arr.length); // the array is in length of 501
console.log(arr[300]); //undefined
// 2 -- push, pop, shift, unshift
var arr = [1,2,3];
arr.push(10); // [1,2,3,4]
arr.pop();// [1,2,3]
arr.pop();// [1,2]
console.log(arr); // [1,2]
//unshift(x): The unshift() method is like the push() method, only it works
//at the beginning of the array
//shift(): The shift() method is like the pop() method, only it works at the
//beginning of the array
var complexArray = [1, 2, 3, "hello" , {} ];
// 3 -- foreach
var printElement = function(item) { console.log(item); }
var arr = [1,2,3];
arr.forEach(printElement); // 1,2,3
// 4 -- map, filter, every, some, reduce
const nums1 = [1,2,3]
const doubled = nums1.map( function(x) { return x * 2})
c(doubled)
const cars = [ {model: "Honda", price: 50000 }, {model: "Toyota", price: 100000}, {model: "Ferrari", price: 2000000}]
const prices = cars.map( function(car) { return car.price})
c(prices)
const onlyCheap = cars.filter( function(car) { return car.price < 100000 })
c(onlyCheap)
const firstPriceyCar = cars.find( function(car) { return car.price > 50000 })
c(firstPriceyCar)
const areAllCarsAbove50000 = cars.every( function(car) { return car.price > 50000 })
c(everyCarsAbove50000)
const areSomeCarsAbove50000 = cars.some( function(car) { return car.price > 50000 })
c(areSomeCarsAbove50000)

const array1 = [1, 2, 3, 4];
const reducer = (sum, currentValue) => sum + currentValue;
console.log(array1.reduce(reducer));// 1 + 2 + 3 + 4
// expected output: 10
console.log(array1.reduce(reducer, 5)); // 5 + 1 + 2 + 3 + 4
// expected output: 15

const euros = [29.76, 41.85, 46.5];
const average = euros.reduce((total, amount, index, array) => {
  total += amount;
  if( index === array.length-1) { 
    return total/array.length;
  }else { 
    return total;
  }
});
c(average) // 39.37

const euros1 = [29.76, 41.85, 46.5];
const doubled1 = euros.reduce((total, amount) => {
  total.push(amount * 2);
  return total;
}, []);

c(doubled1) // [59.52, 83.7, 93]

const euro2 = [29.76, 41.85, 46.5];
const above30 = euro2.reduce((total, amount) => {
  if (amount > 30) {
    total.push(amount);
  }
  return total;
}, []);
c(above30) // [ 41.85, 46.5 ]

const fruitBasket = ['banana', 'cherry', 'orange', 'apple', 'cherry', 'orange', 'apple', 'banana', 'cherry', 'orange', 'fig' ];
const count = fruitBasket.reduce( (tally, fruit) => {
  tally[fruit] = (tally[fruit] || 0) + 1 ;
  return tally;
} , {})
c(count) // { banana: 2, cherry: 3, orange: 3, apple: 2, fig: 1 }

const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const flat = data.reduce((total, amount) => {
  return total.concat(amount);
}, []);
c(flat) // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

// ============================== maps & sets
const question = new Map();
question.set('question', 'What is the official name of the latest major JavaScript version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer :D');
question.set(false, 'Wrong, please try again!');
c(`key 1 : value = ${question.get(1)}`)
c(`key true : value = ${question.get(true)}`)
console.log(question.get('question'));
console.log(question.size);
if(question.has(4)) {
    question.delete(4);
    console.log('Answer 4 was removed')
}
question.forEach((value, key) => console.log(`This is ${key}, and it's set to ${value}`));
// question.clear();
 
 let map = new Map([
    [ 1, 'one' ],
    [ 2, 'two' ],
    [ 3, 'three' ], // trailing comma is ignored
]);

// The Set object lets you store unique values of any type, whether primitive values or object 
const set1 = new Set([1, 2, 3, 4, 4, 5]); // 4 will be stored only once
set1.add(5)
set1.add(3)
console.log(set1.has(1));
// expected output: true
console.log(set1.has(5));
// expected output: true
console.log(set1.has(6));
// expected output: false

// ======================== classes ES5 + prototype inheritance
function Car(options) {
  this.model = options.model
}
Car.prototype.drive = function() {
  return "vrooooooooom"
}
const myCar = new Car({ model : "Honda"})
c(myCar.drive())

function Toyota(options) {
  options.model = "Toyota"
  Car.call(this,options)
  this.color = options.color
}
Toyota.prototype = Object.create(Car.prototype)
Toyota.prototype.constructor = Toyota
Toyota.prototype.honk = () => 'beep'

const toyota = new Toyota({ color: 'red'})
c(toyota.drive())
c(toyota.honk())

/* ES5 property
const object1 = {};
Object.defineProperty(object1, 'property1', {
  value: 42,
  writable: false
});
object1.property1 = 77;
// throws an error in strict mode
console.log(object1.property1);
// expected output: 42
*/

class CarE6 {
  constructor({ model }) {
  	this.model = model
	}
  drive() {
    return 'vroooooooom'
  }
}
const myCarAgain = new CarE6({ model:"Honda"});
c(myCarAgain.drive())

class ToyotaE6 extends CarE6 {
   constructor({ color }) {
     super({ model : "Toyota"})
  	 this.color = color
	}
  honk() {
    return 'beeep'
  }
}
const toyotaAgain = new ToyotaE6({ color : "red"})
c(toyotaAgain.drive())
c(toyotaAgain.honk())

// properties
class Rectangle {
    constructor (width, height) {
        this._width  = width
        this._height = height
    }
    set width  (width)  { this._width = width               }
    get width  ()       { return this._width                }
    set height (height) { this._height = height             }
    get height ()       { return this._height               }
    get area   ()       { return this._width * this._height }
}
var r = new Rectangle(50, 20)
c(r.area) // 1000
r.width = 200
c(r.area) // 4000

// static
class Shape {
    constructor (id, x, y) {
        this.id = id
        this.move(x, y)
    }
    move (x, y) {
        this.x = x
        this.y = y
    }
}
class RectangleA extends Shape {
    static defaultRectangle () {
        return new RectangleA("default", 0, 0, 100, 100)
    }
}
class CircleA extends Shape {
    static defaultCircle () {
        return new CircleA("default", 0, 0, 100)
    }
  static x = 5
}
var defRectangle = RectangleA.defaultRectangle()
var defCircle    = CircleA.defaultCircle()
c(CircleA.x)
var c2 = new CircleA()
c(c2.x) // undefined

// iteratos
// generators
// symbols

// base2, 8, 16
// book ES6, 7 best practices
// more books?
// dice games?
// http://es6-features.org
// // typescript




