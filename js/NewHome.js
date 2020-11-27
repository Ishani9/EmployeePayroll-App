let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    empPayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem("editEmp");
});

const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ? JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

const createInnerHtml = () => {
    if (empPayrollList.length == 0) return;
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    for (const empPayrollData of empPayrollList) {
        innerHtml= `${innerHtml}
        <tr>
            <td><img class="profile" src="${empPayrollData._profilePic}" alt=""></td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td>${getDeptHtml(empPayrollData._department)}</td>
            <td>${empPayrollData._salary}</td>
            <td>${empPayrollData._startDate}</td>
            <td><img name=${empPayrollData._id} onclick="remove(this)" alt="delete" src="../assets/delete-black-18dp.svg">
                <img name=${empPayrollData._id} onclick="update(this)" alt="edit" src="../assets/create-black-18dp.svg"></td>
        </tr>
    `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}

/*
const createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [{
        _name: 'Ishani M',
        _gender: 'Female',
        _department: [
            'Engineer',
            'Finance'
        ],
        _salary: '500000',
        _startDate: '21 Nov 2019',
        _note: '',
        _id: new Date().getTime(),
        _profilePic: '../assets/Ellipse -1.png'
    },
    {
        _name: 'Kia',
        _gender: 'female',
        _department: [
            'Sales'
        ],
        _salary: '400000',
        _startDate: '22 Oct 2018',
        _note: '',
        _id: new Date().getTime() + 1,
        _profilePic: '../assets/Ellipse -4.png'
    }
    ];
    return empPayrollListLocal;
}*/
