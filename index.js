/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    let employeeRecord = {
    "firstName": firstName,
    "familyName": familyName,
    "title": title,
    "payPerHour": payPerHour,
    "timeInEvents": [],
    "timeOutEvents": []
    }

    return employeeRecord

}

function createEmployeeRecords(array) {
    let employeeRecords = array.map(el => createEmployeeRecord(el))
    return employeeRecords
}

function createTimeInEvent(dateStamp) {
    this.timeInEvents.push({
        "type": "TimeIn",
        "hour": parseInt(dateStamp.split(" ")[1], 10),
        "date": dateStamp.split(" ")[0]
    })

    return this
}

function createTimeOutEvent(dateStamp) {
    this.timeOutEvents.push({
        "type": "TimeOut",
        "hour": parseInt(dateStamp.split(" ")[1], 10),
        "date": dateStamp.split(" ")[0]
    })

    return this
}

function hoursWorkedOnDate(date) {
    let timeInDate = this.timeInEvents.find(d => d.date === date)
    if (timeInDate) {
        let timeOutDate = this.timeOutEvents.find(d => d.date === date )
        return (timeOutDate.hour - timeInDate.hour)/100
    }
        return 0

}

function wagesEarnedOnDate(date) {
    let wage = this.payPerHour
    let totalHours = hoursWorkedOnDate.call(this, date)
    return totalHours * wage

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


function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName)

}

function calculatePayroll(employeeRecordsArray) {
    return employeeRecordsArray.reduce(function(memo, record){
        return memo + allWagesFor.call(record)
    },0)

}

        