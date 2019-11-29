/* Your Code Here */

function createEmployeeRecord(arr) {
  let employeeArray = Object.assign({}, { firstName: arr[0], familyName: arr[1], title: arr[2], payPerHour: arr[3], timeInEvents: [], timeOutEvents: []})
  return employeeArray
}

function createEmployeeRecords(arr) {
  let employeeArrays = []
  arr.map(function(e) {
    employeeArrays.push(createEmployeeRecord(e))
  })
  return employeeArrays
}

function createTimeInEvent(dateStamp) {
  let [date, hour] = dateStamp.split(" ")
  // let date = dateStamp.split(" ")[0];
  // let hour = parseInt(dateStamp.split(" ")[1], 10);
  this.timeInEvents.push({type: "TimeIn", hour: parseInt(hour, 10), date: date})
  return this
}

function createTimeOutEvent(dateStamp) {
  let [date, hour] = dateStamp.split(" ")
  this.timeOutEvents.push({type: "TimeOut", hour: parseInt(hour, 10), date: date})
  return this
}

function hoursWorkedOnDate(date) {
  let timeIn = this.timeInEvents.filter(function(el) {
    if (el.date === date) { return el }
  })
  let timeOut = this.timeOutEvents.filter(function(el) {
    if (el.date === date) { return el }
  })
  return (timeOut[0].hour - timeIn[0].hour)/100
}

function wagesEarnedOnDate(date) {
  return this.payPerHour * hoursWorkedOnDate.call(this, date)
}

function calculatePayroll(arr) {
  return arr.reduce(function(memo, i) {
    return memo + allWagesFor.call(i)
  }, 0)
}

function findEmployeeByFirstName(arr, str) {
  let employee = arr.filter(function(el) {
    if (el.firstName === str) { return el }
  })
  return employee[0];
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