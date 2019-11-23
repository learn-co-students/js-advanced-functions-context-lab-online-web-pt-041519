/* Your Code Here */

let createEmployeeRecord = function(employeeData) {
    let name = employeeData[0]
    let lastName = employeeData[1]
    let job = employeeData[2]
    let pay = employeeData[3]

    let employeeRecord = {
        firstName: name,
        familyName: lastName,
        title: job,
        payPerHour: pay,
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord
}

let createEmployeeRecords = function(allEmployeeData) {
    let employeeRecords = allEmployeeData.map((employee) => createEmployeeRecord(employee))
    return employeeRecords
}

let createTimeInEvent = function(event) {
   // split the event array, convert the hour to an integer
   let eventArr = event.split(' ')
   let shiftDate = eventArr[0]
   let shiftHour = parseInt(eventArr[1])

   // we now have the elements of the new time card, this needs to be pushed into the EE record
   this.timeInEvents.push({
      type: "TimeIn",
      date: shiftDate,
      hour: shiftHour
   })
    // return this
   return this
}

let createTimeOutEvent = function(event) {
    // split the event array, convert the hour to an integer
   let eventArr = event.split(' ')
   let shiftDate = eventArr[0]
   let shiftHour = parseInt(eventArr[1])

   this.timeOutEvents.push({
    type: "TimeOut",
    date: shiftDate,
    hour: shiftHour
   })
   return this
}

let hoursWorkedOnDate = function(desiredDate) {
    let inEvent = this.timeInEvents.find(function(e) {
        return e.date === desiredDate
    })

    let outEvent = this.timeOutEvents.find(function(e) {
        return e.date === desiredDate
    })
    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(desiredDate) {
    let total = hoursWorkedOnDate.call(this, desiredDate) * this.payPerHour

    return parseFloat(total.toString())
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}

let findEmployeeByFirstName = function(employees, searchName) {
    return employees.find((employee) => employee.firstName === searchName)
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

