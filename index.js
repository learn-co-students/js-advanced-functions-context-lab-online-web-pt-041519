function createEmployeeRecord(array) {  
    const createEmployee = Object.assign({}, {
        firstName: array[0],
        familyName: array[1], 
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    })
    return createEmployee
}

const createEmployeeRecords = function(array) {
    const createEmployees = array.map(a => createEmployeeRecord(a))
    return createEmployees
}

function createTimeInEvent(timeInPunch) {
    const [date, hour] = timeInPunch.split(' ')
    const addTimeInPunch = {
        type: "TimeIn", 
        hour: parseInt(hour), 
        date: date 
    }
    this.timeInEvents.push(Object.assign({}, addTimeInPunch))
    return this
}

function createTimeOutEvent(timeOutPunch) {
    const [date, hour] = timeOutPunch.split(' ')

    const addTimeOutPunch = {
        type: "TimeOut", 
        hour: parseInt(hour), 
        date: date 
    }
    
    this.timeOutEvents.push(Object.assign({}, addTimeOutPunch))
    return this
}

function hoursWorkedOnDate(dateWorked) {
    const timeInRecord = this.timeInEvents.find(e => e.date === dateWorked)
    const timeOutRecord = this.timeOutEvents.find(e => e.date === dateWorked)

    const hoursWorked = (timeOutRecord.hour - timeInRecord.hour) / 100
    
    return hoursWorked
}

function wagesEarnedOnDate(dateWorked) {
    const hours = hoursWorkedOnDate.call(this, dateWorked)
    const payOwed = hours * this.payPerHour
    return payOwed
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

function calculatePayroll(employees) {
    let allWages = employees.map(e => allWagesFor.call(e))
    let allPayroll = allWages.reduce(function(accumulator, currentValue) {
        return accumulator + currentValue
    })
    return allPayroll
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName)
}

