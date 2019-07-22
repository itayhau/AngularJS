// symbols
// why? use them as identifiers in object properties
// no shortcut
const sym1 = Symbol() // create new unique number
const sym2 = Symbol() // create new unique number
c(sym1==sym2) // false

const sym3 = Symbol("cat") // create new unique number
const sym4 = Symbol("cat") // create new unique number
c(sym3==sym4) // false
console.log(sym3) // Symbol(cat)

let user = {
  id : 9541,
  name : "john"
}
//user.id = 1 // not good will override id
// so
const idSym = Symbol('id')
user[idSym] = 459
c(user[idSym])
// inside json
let insideJson = {
  id : 9541,
  name : "john",
  [idSym] : 459
}
c(insideJson)
// access
c(Object.getOwnPropertyNames(user)) // will not appear
for(let f in user) // will not appear
  {
    c(`${f} : ${user[f]}`)
  }
c(Object.getOwnPropertySymbols(user)) // appear
c(user[Object.getOwnPropertySymbols(user)[0]]) // walla

// global shared symbol [global symbol space]
// shared among iFrames
const catSymbol1 = Symbol.for("cat")
const catSymbol2 = Symbol.for("cat")
c(catSymbol1 === catSymbol2) // true
//usages
// 1 Enum like - switch case
const SWITCH_ON = Symbol('on')
const SWITCH_OFF = Symbol('off')
const SWITCH_Broken = Symbol('broken')
function getLightSwitchState(state)
{
  switch (state) {
    case SWITCH_ON:
      return "on"
    case SWITCH_OFF:
      return "off"
    case SWITCH_Broken:
      return "broken"
    default:
      return "unknown"
  }
}
// 2 meta data - will not appear in reflection
const length = Symbol('length')
class Train {
  constructor() {
    this[length] = 0
  }
  add(car, content) {
    this[car] = content;
    this[length]++;
  }
}
const t1 = new Train()
t1.add('flat car','ice')
for (let f in t1) {
  c(`${f} : ${t1[f]}`)
}
// 3
class AlertService {
  constructor() {
    this.alerts = { }
  }
  addAlert(symbol, alertText) {
    this.alerts[symbol] = alertText
    c(`adding alert`)
    c(symbol)
  }
 removeAlert(symbol) {
    delete this.alerts[symbol]
    c(`removing alert`)
    c(symbol)
  }
}
const alertService = new AlertService()
const alertStartSymbol = Symbol('start')
const alertStartExtraSymbol = Symbol('start')
alertService.addAlert(alertStartSymbol, "Start")
alertService.addAlert(alertStartExtraSymbol, "Start")
alertService.removeAlert(alertStartSymbol)
alertService.removeAlert(alertStartExtraSymbol)

const myMap2 = new Map()
myMap2.set(alertStartSymbol, "start")
c(myMap2.get(alertStartSymbol))


// iteratos

// generators
function* genny() {
  yield 'a'
  yield 'b'
  yield 'c'
}
let iter = genny()
for(let f of iter) {
  c(f)
}
let iter1 = genny()
c(iter1.next()) // { value : 'a', done: false}
c(iter1.next()) // { value : 'b', done: false}
c(iter1.next()) // { value : 'c', done: false} !!
c(iter1.next()) // { value : undefined, done: true}

function* gennyReturn() {
  console.log("once") // printed only once
  yield 'a'
  yield 'b'
  return 'c'
  yield 'd' // unreachable code
}
let iter2 = gennyReturn()
for(let f of iter2) {
  c(f)
}
let iter3 = gennyReturn()
c(iter3.next()) // { value : 'a', done: false}
c(iter3.next()) // { value : 'b', done: false}
c(iter3.next()) // { value : 'c', done: true} !!
c(iter3.next()) // { value : undefined, done: true}

function* genny4() {
  var x = 1
  while (x < 10) {
    yield x
    x++
  }
  yield -1
}
let iter4 = genny4()
for(let f of iter4)
  {
    c(f)
  }

let myIteratorObject = {
  count12 : 1,
  [Symbol.iterator] : function() {
    return {
      next: () => {
          while (this.count12 < 12) {
            this.count12++
            return { value : this.count12, done : false }       
          }
          return { value : this.count12, done : true }
      }
    }
  }
}

for(let f of myIteratorObject)
  {
    c(f)
  }
  
