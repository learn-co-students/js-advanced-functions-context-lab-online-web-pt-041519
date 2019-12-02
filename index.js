/* Your Code Here */
function createEmployeeRecord(array) {
    const employee = new Object()
    employee.firstName = array[0]
    employee.familyName = array[1]
    employee.title = array[2]
    employee.payPerHour = array[3]
    employee.timeInEvents = []
    employee.timeOutEvents = []
    return employee
}

function createEmployeeRecords(records) {
    return records.map(array => createEmployeeRecord(array))
}

function createTimeInEvent(date_time) {
    let [date, hour] = date_time.split(' ')
    this.timeInEvents.push({type: 'TimeIn', hour: parseInt(hour, 10), date,})
    return this
}

function createTimeOutEvent(date_time) {
    let [date, hour] = date_time.split(' ')
    this.timeOutEvents.push({type: 'TimeOut', hour: parseInt(hour, 10), date,})
    return this
}

function findEmployeeByFirstName(array, fName) {
    return array.find(function (elem) {
       return elem.firstName === fName
   })
}

let hoursWorkedOnDate = function(soughtDate){
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(dateSought){
    let rawWage = hoursWorkedOnDate.call(this, dateSought)
        * this.payPerHour
    return parseFloat(rawWage.toString())
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
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