

function createEmployeeRecord(newEmployee){

    return {
    firstName: newEmployee[0],
    familyName: newEmployee[1],
    title: newEmployee[2],
    payPerHour: newEmployee[3],
    timeInEvents: [],
    timeOutEvents: []
    }
}

function createEmployeeRecords(severalEmployees){

    return severalEmployees.map( (employee)=>{return createEmployeeRecord(employee)} )
}

function createTimeInEvent(employeeRecord, dateTimeString){

    let timeArray = dateTimeString.split(' ');
    let date = timeArray[0];
    let hour = parseInt(timeArray[1], 10);
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: hour, date
    })
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTimeString){

    let timeArray = dateTimeString.split(' ');
    let date = timeArray[0];
    let hour = parseInt(timeArray[1], 10);
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: hour, date
    })
    return employeeRecord;
}

let hoursWorkedOnDate = function (employeeRecord, dateString){

    let timeInOnDate = employeeRecord.timeInEvents.find((hour)=>{return hour.date ===dateString })
    let timeOutOnDate = employeeRecord.timeOutEvents.find((hour) => {return hour.date === dateString})

    return (timeOutOnDate.hour - timeInOnDate.hour)/100;
}

let wagesEarnedOnDate = function (employeeRecord, dateString){

    let hoursWorked = parseInt(hoursWorkedOnDate(employeeRecord, dateString));

    return (parseInt(employeeRecord.payPerHour)*hoursWorked);
}


let allWagesFor = function(employeeRecord){

    //find all dates
    let allDates = employeeRecord.timeOutEvents.map((daysWorked)=>{return daysWorked.date})
    //reduce wages on dates to one integer 
    let allPayable = allDates.reduce((total, date)=> {return total + wagesEarnedOnDate(employeeRecord, date)}, 0)
    return allPayable;
}

let findEmployeeByFirstName = function(employeeRecords, firstName){

    return employeeRecords.find((record)=>{return record.firstName === firstName})
}

let calculatePayroll = function (employeeRecords){

    let totalPayroll = employeeRecords.reduce((sum, employee) => {return sum + allWagesFor(employee)}, 0)

    return totalPayroll;
}