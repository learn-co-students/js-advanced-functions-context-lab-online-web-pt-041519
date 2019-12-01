/* Your Code Here */

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
//Loads Array elements into corresponding Object properties. 
//Additionally, initialize empty Arrays on the properties timeInEvents and timeOutEvents.
let createEmployeeRecord = function(array) {
    // Populate object from array
    let employee = {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    }
    return employee
  }
  
  // Return array of employee objects from input array of arrays
  let createEmployeeRecords = function(array) {
    // Map employee objects to array
    let employees = array.map(employee => createEmployeeRecord(employee))
    return employees
  }
  
  // Return employee record with new Time In
  let createTimeInEvent = function(stampdate) {
    // Split "2014-02-28 1400" into components needed for date object
    let [day, hour] = stampdate.split(" ")
  
    // Create new TimeIn
    let newTimeIn = {
      type: "TimeIn",
      hour: parseInt(hour),
      date: day
    }
  
    // Add TimeIn to employee record
    this.timeInEvents.push(newTimeIn)
    return this
  }
  
  // Return employee record with new Time Out
  let createTimeOutEvent = function(date) {
    // Split "2014-02-28 1400" into components needed for date object
    let [day, hour] = date.split(" ")
  
    // Create new TimeIn
    let newTimeOut = {
      type: "TimeOut",
      hour: parseInt(hour),
      date: day
    }
  
    // Add TimeIn to employee record
    this.timeOutEvents.push(newTimeOut)
    return this 
  }
  
  let hoursWorkedOnDate = function(checkDate){ 
      let timeInE = this.timeInEvents.find( element => element.date === checkDate)
  
      let timeOutE = this.timeOutEvents.find(element => element.date === checkDate )
  
      let hours = (timeOutE.hour - timeInE.hour) / 100
      return hours
  }
  
  //Using hoursWorkedOnDate, multiply the hours by the record's payRate to determine 
  //amount owed. Amount should be returned as a number.
  
  let wagesEarnedOnDate = function(date){
      //hrs from previous hoursWorkedoNdate function
      let wages = hoursWorkedOnDate.call(this, date) * this.payPerHour
      return wages
  }
  //start here
 
  
  
  // Test the firstName field for a match with the firstName argument
  let findEmployeeByFirstName = function(array, name) {
      return array.find(employee => employee.firstName === name)
  }
  
  // Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in 
  //the record used as context. Amount should be returned as a number.
  let calculatePayroll = function(array) { 
      const total = (total, employee) => total + allWagesFor.call(employee) 
      return array.reduce(total, 0) 
  }

 