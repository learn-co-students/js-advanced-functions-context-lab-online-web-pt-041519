// Fn loads arr els and initializes timeIn/Out arrs into obj, returns obj
let createEmployeeRecord = function(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

// Fn converts nested arr into employee rec using prev fn, accumulates objs into new arr
let createEmployeeRecords = function(arr) {
    return arr.map(emp => createEmployeeRecord(emp))
}

// Fn creates timeIn obj with dateStamp data, adds obj to empRec, returns updated empRec
let createTimeInEvent = function(dateStamp) {
    let [date, time] = dateStamp.split(' ')
    let timeIn = {
        type: 'TimeIn',
        hour: parseInt(time),
        date: date
    }
    // Push this (timeIn obj) into timeInEvents
    this.timeInEvents.push(timeIn)
    // Return empRec updated with timeIn
    return this
}

// Fn creates timeOut obj with dateStamp data, adds obj to empRec, returns updated empRec
let createTimeOutEvent = function(dateStamp) {
    let [date, time] = dateStamp.split(' ')
    let timeOut = {
        type: 'TimeOut',
        hour: parseInt(time),
        date: date
    }
    // Push this (timeOut obj) into timeOutEvents
    this.timeOutEvents.push(timeOut)
    // Return empRec updated with timeOut
    return this
}

// Fn calculates number of hours bt timeIn and timeOut (hours worked) for input date
let hoursWorkedOnDate = function(date) {
    let timeIn = this.timeInEvents.find(el => el.date === date)
    let timeOut = this.timeOutEvents.find(el => el.date === date)
    let totalHrs = (timeOut.hour - timeIn.hour) / 100
    return totalHrs
 }

 // Fn calculates wages for the day by multiplying hours worked by emp's payPerHour
 let wagesEarnedOnDate = function(date) {
    let dailyPay = hoursWorkedOnDate.call(this, date) * this.payPerHour
    return dailyPay
 }

 // allWagesFor is defined below!!!

 // Fn finds empRec with firstName that matches input firstName, otherwise returns undefined
 let findEmployeeByFirstName = function(srcArr, firstName) {
    return srcArr.find(emp => emp.firstName === firstName)
 }

 // Fn accumulates value of all dates worked by all emp in arr (total payroll)
 let calculatePayroll = function(empArr) {
     const reducer = (memo, emp) => memo + allWagesFor.call(emp)
     return empArr.reduce(reducer, 0)
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