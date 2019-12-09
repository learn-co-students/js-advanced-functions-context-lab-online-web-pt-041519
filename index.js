/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */


function createEmployeeRecord(array){
    return{
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrays){
    return arrays.map(array => createEmployeeRecord(array));
}

function createTimeInEvent(dateStamp){
    let date = dateStamp.split(" ")[0];
    let hour = dateStamp.split(" ")[1];
    
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    });

    return this;
}

function createTimeOutEvent(dateStamp){
    let date = dateStamp.split(" ")[0];
    let hour = dateStamp.split(" ")[1];
    
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    });
    
    return this;
}

function hoursWorkedOnDate(date){
    let timeIn = this.timeInEvents.find(e => e.date === date);
    let timeOut = this.timeOutEvents.find(e => e.date === date);

    let hours = (timeOut.hour - timeIn.hour)/100;
    // console.log(hours);
    
    return hours;
}

function wagesEarnedOnDate(date){
    // console.log(this);
    let hours = hoursWorkedOnDate.call(this, date);
    // console.log(hours);
    let rate = this.payPerHour;
    let wages = hours * rate;
    
    return wages;
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date;
    });

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0); // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable;
}

function findEmployeeByFirstName(srcArray, firstName){
    // console.log(this);
    // console.log(srcArray);
    // console.log(firstName);
    return srcArray.find(e => e.firstName === firstName);
}

function calculatePayroll(records){
    return records.reduce((total, record) => {
        return total + allWagesFor.call(record);
    }, 0);
}