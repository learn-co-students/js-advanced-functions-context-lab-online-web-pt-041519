// Return employee object from input record array
let createEmployeeRecord = function(recordArr) {
    // Create object from array
    return {
        firstName: recordArr[0],
        familyName: recordArr[1],
        title: recordArr[2],
        payPerHour: recordArr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

// Return array of employee objects from input array of arrays
let createEmployeeRecords = function(arr) {
    // Map employee objects to array
    return arr.map(employee => createEmployeeRecord(employee))
}

// Return employee record with new Time In
let createTimeInEvent = function(date) {
    // Split date into components
    let [day, hour] = date.split(" ")

    // Create new TimeIn
    let timeInObj = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: day
    }

    // Add TimeIn to employee record
    this.timeInEvents.push(timeInObj)
    return this
}

// Return employee record with new Time Out
let createTimeOutEvent = function(date) {
    // Split date into components
    let [day, hour] = date.split(" ")
  
    // Create new TimeIn
    let timeOutObj = {
      type: "TimeOut",
      hour: parseInt(hour),
      date: day
    }
  
    // Add TimeIn to employee record
    this.timeOutEvents.push(timeOutObj)
    return this
}

// Return hours worked
let hoursWorkedOnDate = function(date) {
    // Find TimeIn and TimeOut based on date
    let timeIn = this.timeInEvents.find(t => t.date === date)
    let timeOut = this.timeOutEvents.find(t => t.date === date)

    // Subract TimeOut from TimeIn and divide by 100 to get total hours worked
    let hoursWorked = (timeOut.hour - timeIn.hour)/100
    return hoursWorked
}

// Return wages earned
let wagesEarnedOnDate = function(date) {
    let pay = hoursWorkedOnDate.call(this, date) * this.payPerHour
    return pay
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

// Return employee object from input first name; return undefined if no match
let findEmployeeByFirstName = function(srcArr, firstName) {
    return srcArr.find(record => record.firstName === firstName)
}

// Return total pay for all employees
let calculatePayroll = function(employeesArr) {
    // Calculate total wages for each employee
    const reducer = (total, employee) => total + allWagesFor.call(employee)
  
    // Activate reducer for each employee, starting at 0
    return employeesArr.reduce(reducer, 0)
}