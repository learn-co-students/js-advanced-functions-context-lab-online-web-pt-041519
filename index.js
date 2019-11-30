/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let createEmployeeRecord = function(array){
    return {
        firstName: array[0],
        familyName: array[1], 
        title: array[2], 
        payPerHour: array[3], 
        timeInEvents: [], 
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(arrays){
    return arrays.map(createEmployeeRecord)
}

let createTimeInEvent = function(dateStamp){
    this.timeInEvents.push({
        type: "TimeIn", 
        hour: parseInt(dateStamp.split(' ')[1],10),
        date: dateStamp.split(' ')[0]
    })

    return this
}

let createTimeOutEvent = function(dateStamp){
    this.timeOutEvents.push({
        type: "TimeOut", 
        hour: parseInt(dateStamp.split(' ')[1], 10),
        date: dateStamp.split(' ')[0]
    })

    return this
}

let hoursWorkedOnDate = function(date){
    let inTime = this.timeInEvents.find(function(e){
        return e.date === date
    })

    let outTime = this.timeOutEvents.find(function(e){
        return e.date === date
    })

    return (outTime.hour - inTime.hour)/100
}

let wagesEarnedOnDate = function(date){
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
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

let findEmployeeByFirstName = function(srcArray, firstName){
    return srcArray.find(function(e){
        return e.firstName === firstName
    })
}

let calculatePayroll = function(employees){
    return employees.reduce(function(memo, e) {
        return memo + allWagesFor.call(e)
    }, 0)
}