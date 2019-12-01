class createEmployee {  
    constructor(array) {
        this.firstName = array[0],
        this.familyName = array[1], 
        this.title = array[2],
        this.payPerHour = array[3],
        this.timeInEvents = [],
        this.timeOutEvents=  []
    }
}

let createEmployeeRecord = function(array){
    new createEmployee(array);
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