/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
function createEmployeeRecord(srcArray) {
    let employee = {
      firstName: srcArray[0],
      familyName: srcArray[1],
      title: srcArray[2],
      payPerHour: srcArray[3],
      timeInEvents: [],
      timeOutEvents: []
    }
    return employee
  }
  
  function createEmployeeRecords(srcArray) {
    return srcArray.map(e => createEmployeeRecord(e))
  }
  
  function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(" ")
    this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date
    })
  
    return this
  }
  
  function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(" ")
    this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date
    })
    return this
  }
  
  const hoursWorkedOnDate = function(onDate) {
    let clockIn = this.timeInEvents.find(el =>
      el.date === onDate)
    let clockOut = this.timeOutEvents.find(el =>
      el.date === onDate)
    return (clockOut.hour - clockIn.hour) / 100
  }
  
  const wagesEarnedOnDate = function(onDate){
      let wages = hoursWorkedOnDate.call(this, onDate) * this.payPerHour
      return wages
  }
  
  const allWagesFor = function () {
      let eligibleDates = this.timeInEvents.map(function (e) {
          return e.date
      })
      let payable = eligibleDates.reduce(function (memo, d) {
          return memo + wagesEarnedOnDate.call(this, d)
      }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
      return payable
  }
  
  const findEmployeeByFirstName = function (srcArray, firstName) {
      return srcArray.find(el => el.firstName === firstName)
  }
  
  const calculatePayroll = function(recArr) {
    return recArr.reduce((memo, rec) => memo + allWagesFor.call(rec), 0)
  }