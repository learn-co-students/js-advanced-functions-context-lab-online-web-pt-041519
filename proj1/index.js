// Functions as First-Class Objects

// 1 Fns can  be stored in a var, obj, or arr
// Stored in a var (several optional ways!)
// OPT A: var fnHolder stores fn sayHello
function sayHello(name) {
    console.log(`Hello, I am ${name}`)
}
const fnHolder = sayHello 
fnHolder('Kelsey')

// OPT B; var sayHi stores anonymous fn
const sayHey = function(name) { 
    console.log(`Hey, I am ${name}`)
}
sayHey('Penny')

// OPT C: var sayHey stores (anonymous) arrow fn (single-line or {multi-line})
const sayHi = (name) => console.log(`Hi, I am ${name}`) 
sayHi('Poki')

// Stored in a obj
const hubble = {
    name: 'Hubble',
    sayMew: function(){console.log(`Mew, I am ${this.name}`)},
    sayMeow: () => console.log(`Meow, I am ${this.name}`) // this is undefined bc arrow fn!
}
hubble.sayMew()
hubble.sayMeow()


// 2 Fns can be passed as an arg
const add = (a, b) => a + b // NOTE: arrow fn implicitly returns! (Unless {multi-line!!!})
const subtract = (a, b) => a - b
const multiply = (a, b) => a * b
const divide = (a, b) => a / b
const doMath = (a, b, fn) => fn(a, b)
console.log(doMath(7, 2, add)) // Pass in add fn
console.log(doMath(7, 2, subtract)) // Pass in subtract fn
console.log(doMath(7, 2, multiply)) // Pass in multiply fn
console.log(doMath(7, 2, divide)) // Pass in divide fn
// NOTE: PASSing and CALLing fns are different things! 
// doMath CALLS the fn with (a, b), so the passed in fn arg will error if ()!


// 3 Return a fn from a fn
function lazyCalcMin(arr) {
    return function() {
        let min = Infinity // set placeholder for min (Infinity will be > everything in arr)
        for(let el of arr) { // iterate thru arr
            if(el < min) { // if current el is less than current min...
                min = el // ...replace min with el
            }
        } 
        return min
    }
}
const arr = [2,3,4,65,7,8,3,39,21,43,54,56,23,12]
const readyToCalc = lazyCalcMin(arr)
console.log(readyToCalc) // Shows that var readyToCalc is a [Function]
console.log(readyToCalc()) // With (), runs the fn and returns the min value of 2


// filter, map, reduce
// FILTER (like Ruby select, see test.rb)
const arr2 = [1,2,3,4,5,6,7]
const filteredArr = arr2.filter(function(el) {return el % 2 === 0})
console.log(filteredArr)

const filteredArrArrow = arr2.filter(el => el % 2 === 0)
console.log(filteredArrArrow)


// MAP: call fn on every el of arr and create new arr containing true values
const mappedArr = arr2.map(el => el * 2)
console.log(mappedArr)


// REDUCE: takes a collection and aggregates to a single value by some equation (input fn)
// input fn takes two args, 1 memo: "memory", what we've aggregated so far (defaults to 0)
// input fn takes two args, 2 el: each el from arr being passed in
// optional third arg after input fn, what should first memoization value be (in this case, 0)
// into reduce we pass two things
    // a fn 
    // a starting value of memo (remembering something we did on prev iterations)
// reduce iterates thru arr one el at a time..
// ..it passes in the el and whatever was returned on the prev iteration (memo)..
// ..on first iteration there is no past iteration, it starts at 0 (default or opt third arg)..
// EXAMPLE: starts w memo 0 and el 1, returns memo 1 adds el 2, returns memo 3 adds el 3..
const arr3 = [1,2,3,4,5,6,7]
const sum = arr3.reduce((memo, el) => memo + el, 0) 
console.log(sum) // 28

const sum2 = arr3.reduce((memo, el) => memo + el, 10) // memo starts at 10
console.log(sum2) // 38

// more real world example, calculate mean (single average value from a collection of nums)
function mean(arr) {
    const sum = arr.reduce((memo, el) => memo + el)
    return sum / arr.length
}
console.log(mean(arr3))


// this, call, apply, bind
// THIS
// this is a refernece to the context
    // inside a fn, this is the obj that represents the fn's execution context
    // when defining a fn using fn keyword, this is the obj that the fn is called upon
    // when defining a fn w an arrow fn, this will be it's surrounding context
// to dictate what 'this' will be, use call, apply, and bind
// const fnToCall = function(){ 'DOES STUFF WITH THIS' }
// fnToCall.call(whatThisShouldBe, arg1, arg2, ...) // CALL: explicitly define what 'this' should be
// fnToCall.apply(whatThisShouldBe, [arg1, arg2, ...]) // APPLY: same as call fn, but just two args (whatThisShouldBe and arr of args)
// const newFn = fnToCall.bind(whatThisShouldBe) // BIND: copies fnToCall, defines 'this', newFn is always whatThisShouldBe context when called

const penny = {
    name: 'Penny'
}
const poki = {
    name: 'Poki'
}
const hubs = {
    name: 'Hubble'
}
function sayHeya() {
    console.log(`Heya, I am ${this.name}`)
}
penny.greet = sayHeya // context of 'this' is penny (NOTE: only using fn keyword! doesn't work with arrow fn)
poki.greet = sayHeya // context of 'this' is poki
hubble.greet = sayHeya.bind(penny) // makes copy of sayHeya and binds to penny (!!!)
console.log(penny.greet === poki.greet) // true, points to the same fn
penny.greet() // Heya, I am Penny
poki.greet() // Heya, I am Poki
hubble.greet() // Heya, I am Penny (!!!)