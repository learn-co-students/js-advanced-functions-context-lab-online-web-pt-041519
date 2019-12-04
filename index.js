// Takes an array with 3 strings and a number
// (firstName, familyName, title, payRate/hr)
// returns Javascript Object with the following keys:
// firstName, familyName, title, payPerHour, timeInEvents, timeOutEvents
// timeInEvents & timeOutEvents should be initialized with []
function createEmployeeRecord(employeeInfo) {
    return {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}   


// Accepts an array of many employee's info
// Returns an array of employee records (objects)
// use #createEmployeeRecord on each employee's info array.
function createEmployeeRecords(allEmployeeInfo) {
    return allEmployeeInfo.map(record => createEmployeeRecord(record))
}


// Accepts a date/time stamp (string); called with #call to set context
// returns the employee record with the following added:
// an object in the timeInEvents array with the following keys:
// type (set to "TimeIn"), hour, and date
function createTimeInEvent(timeStamp) {
    let punchIn = {
        type: "TimeIn",
        hour: parseInt(timeStamp.slice(11, 15), 10),
        date: timeStamp.slice(0, 10)
    }
    this.timeInEvents.push(punchIn)
    return this;
}


// Accepts a date/time stamp (string); called with #call to set context
// returns the employee record with the following added:
// an object in the timeOutEvents array with the following keys:
// type (set to "TimeOut"), hour, and date
function createTimeOutEvent(timeStamp) {
    let punchOut = {
        type: "TimeOut",
        hour: parseInt(timeStamp.slice(11, 15), 10),
        date: timeStamp.slice(0, 10)
    }
    this.timeOutEvents.push(punchOut)
    return this;
}


// Accepts a date (string); called with #call to set context
// Returns the hours worked (number) on that date
// (subtract timeInEvent from timeOutEvent)
function hoursWorkedOnDate(date) {
    let timeIn = this.timeInEvents.find(event => event.date === date)
    let timeOut = this.timeOutEvents.find(event => event.date === date)

    return (timeOut.hour - timeIn.hour)/100
}


// Accepts a date (string); called with #call to set context
// Returns the pay owed (number)
// use #hoursWorkedOnDate * employee's pay rate
function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}



// Accepts an array of employeeRecords (array), and a name (string)
// Returns record matching the first name, or undefined
function findEmployeeByFirstName(employeeRecords, name) {
    return employeeRecords.find(employee => employee.firstName === name)
}


// Accepts an array of employeeRecords
// Returns the sum of all employees wages for all dates as a number
// use #wagesEarnedOnDate for every employee, for every date.
function calculatePayroll(employeeRecords) {
    // console.log(employeeRecords[0])
    // console.log(allWagesFor.call(employeeRecords[0]));
    return employeeRecords.reduce(function(totalPay, employee) {
        // console.log(allWagesFor.call(employee)
        return totalPay + allWagesFor.call(employee)
    }, 0)
}







/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}