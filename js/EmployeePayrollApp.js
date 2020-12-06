
let isUpdate = false;
let employeePayrollObj = {};

// JS UC 2
// Validating name and adding eventlistener for salary

window.addEventListener('DOMContentLoaded', (event) => {
    
    const name = document.querySelector("#name");
    const textError = document.querySelector(".text-error");
    name.addEventListener("input", function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-error');
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });

    const startdate = document.querySelector("#startDate");
    const dateError = document.querySelector(".date-error");
    startdate.addEventListener("input", function() {
        let date = new Date(Date.parse(getInputValueById('#month') + " " +
                    getInputValueById('#day') + " " + getInputValueById('#year')));
        try {
            (new EmployeePayrollData()).startDate = date;
            dateError.textContent="";
        } catch (e) {
            dateError.textContent;
        }
    });

    checkForUpdate();
});

const save = () => {
    try {
        alert("HELLO")
        let empPayrollData = createEmployeePayroll();
        alert(empPayrollData.toString());
        createAndUpdateStorage(empPayrollData);
    }
    catch (e) {
        return;
    }
}

//UC4: Storing in local storage
function createAndUpdateStorage(employeePayrollData) {
    //localStorage.clear(); this can be used to clear all records from localStorage
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

    if (employeePayrollList != undefined) {
        employeePayrollList.push(employeePayrollData);
    }
    else {
        employeePayrollList = [employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

//UC3: Create Employee payroll object
const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById('#name');
    }
    catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    // Use of helper function
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.notes = getInputValueById('#notes');
    let date = getInputValueById('#month') + " " + getInputValueById('#day') + 
                                " " + getInputValueById('#year');
    employeePayrollData.startDate = new Date(date);
    return employeePayrollData;
}

//Generating employee id for all objects
const createNewEmployeeId = () => {
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : (parseInt(empID) + 1).toString();
    localStorage.setItem("EmployeeID", empID);
    return empID;
}

const setEmployeePayrollObject = () => {
    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollObj._profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollObj._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObj._department = getSelectedValues('[name=department]');
    employeePayrollObj._salary = getInputValueById('#salary');
    let date = getInputValueById('#month') + " " + getInputValueById('#day') + " "
                     + getInputValueById('#year');
    employeePayrollObj._startDate = new Date(date);
    employeePayrollObj._notes = getInputValueById('#notes');
}

const setEmployeePayrollData = (employeePayrollData) => {
    try {
        employeePayrollData.name = employeePayrollObj._name;
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = employeePayrollObj._profilePic;
    employeePayrollData.gender = employeePayrollObj._gender;
    employeePayrollData.department = employeePayrollObj._department;
    employeePayrollData.salary = employeePayrollObj._salary;
    employeePayrollData.notes = employeePayrollObj._notes;
    try {
        employeePayrollData.startDate = new Date(Date.parse(employeePayrollObj._startDate));
    } catch (e) {
        setTextValue('.date-error', e);
        throw e;
    }
    alert(employeePayrollData.toString());
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}

const getSelectedValues = (propertValue) => {
    let allItems = document.querySelectorAll(propertValue);
    let selectedItems = [];
    allItems.forEach(items => {
        if (items.checked) selectedItems.push(items.value);
    });
    return selectedItems;
}


//UC5: Reset all the value in the form on clicking reset button
const resetForm = () => {
    setValue('#name', '');
    unSetSelectedValues('[name=profile]');
    unSetSelectedValues('[name=gender]');
    unSetSelectedValues('[name=department]');
    setValue('#salary', '');
    setValue('#notes', '');
    setValue('#day',0);
    setValue('#month',0);
    setValue('#year',0);
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}


// CURD UC 2
const checkForUpdate = () => {
    const employeePayrollJSON = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJSON ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJSON);
    setForm();
}

const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]', employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrollObj._department);
    setValue('#salary', employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary);
    setValue('#notes', employeePayrollObj._notes);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
}

const stringifyDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const newDate = !date ? "undefined" : new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
    return newDate;
}

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if(Array.isArray(value)){
            if(value.includes(item.value)){
                item.checked = true;
            }
        }
        else if(item.value === value)
        item.checked = true;
    });
}
 