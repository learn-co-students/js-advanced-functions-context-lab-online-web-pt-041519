/* Your Code Here */

function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arrays) {
    return arrays.map(array => createEmployeeRecord(array));
}

function createTimeInEvent(dateTime){
    // console.log(time)
    let date = dateTime.split(' ')[0];
    let time = dateTime.split(' ')[1];
    // console.log(this)
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time),
        date: date
    });
    return this;
}

function createTimeOutEvent(dateTime){
    let date = dateTime.split(' ')[0];
    let time = dateTime.split(' ')[1];
    // console.log(this);
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time),
        date: date
    });
    return this;
}

function hoursWorkedOnDate(date){
    // console.log(this)
    // console.log(date)
    let clockIn = this.timeInEvents.find((event) => event.date === date);
    let clockOut = this.timeOutEvents.find((event) => event.date === date);
    // console.log(clockIn)
    // console.log(clockOut)
    return (clockOut.hour - clockIn.hour)/100;
    // console.log(time)
    // return timeInHours
}

function wagesEarnedOnDate(date){
    // console.log(this)
    // console.log("\n\n"+date)
    let hours = hoursWorkedOnDate.call(this, date);
    // console.log(hours)
    return this.payPerHour * hours;
}

function findEmployeeByFirstName(srcArray, firstName){
    // console.log(this)
    // console.log(srcArray)
    // console.log(firstName)
    return srcArray.find((employee) => firstName === employee.firstName);
}

function calculatePayroll(employeeRecords){
    // console.log(employeeRecords)
    return employeeRecords.reduce((startValue,employees) => {
        // console.log(startValue)
        // console.log(employees)
        return startValue + allWagesFor.call(employees);
    }, 0);
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