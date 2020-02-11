/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

class Employee {
    constructor(array) {
        this.firstName = array[0];
        this.familyName = array[1];
        this.title = array[2];
        this.payPerHour = array[3];
        this.timeInEvents = [];
        this.timeOutEvents = [];
    }
    
}

function createEmployeeRecord(array) {
    return new Employee(array)
}

function createEmployeeRecords(array) {
    return array.map(function(element) {
        return createEmployeeRecord(element)
    })
}

function createTimeInEvent(dateStamp) {
    let stamp = dateStamp.split(' ')
    let event = {}
    event.type = "TimeIn"
    event.hour = parseInt(stamp[1])
    event.date = stamp[0]
    this.timeInEvents.push(event)
    return this
}

function createTimeOutEvent(dateStamp) {
    let stamp = dateStamp.split(' ')
    let event = {}
    event.type = "TimeOut"
    event.hour = parseInt(stamp[1])
    event.date = stamp[0]
    this.timeOutEvents.push(event)
    return this
}

function hoursWorkedOnDate(date) {
    let i = this.timeInEvents.find(e => e.date == date)
    let o = this.timeOutEvents.find(e => e.date == date)
    return (o.hour - i.hour) / 100
}

function wagesEarnedOnDate(date) {
    let h = hoursWorkedOnDate.bind(this)
    return h(date) * this.payPerHour
}

function findEmployeeByFirstName(array, name) {
    return array.find(element => element.firstName == name)
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function calculatePayroll(array) {
    return array.reduce(function(total, employee) {
        return total + allWagesFor.call(employee)
    }, 0)
}