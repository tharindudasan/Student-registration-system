const tblStudents = document.getElementById('tbl-students');
const btnNew = document.getElementById('btn-new');
const btnSave = document.getElementById('btn-save');
const btnClear = document.getElementById('btn-clear');
const txtId = document.getElementById('txt-id');
const txtName = document.getElementById('txt-name');
const txtContact = document.getElementById('txt-contact');
const txtAddress = document.getElementById('txt-address');
const frmStudent = document.getElementById('frm-student');
let selectedStudent = null;

tblStudents.tBodies[0].addEventListener('click', ({ target: elm }) => {
    console.log("line 12")
    if (elm && elm.tagName === 'I' && elm.classList.contains('bi-trash')) {
        const elmRow = elm.closest("tr");
        const index = students.findIndex(student => student.rowElm === elmRow);
        students.splice(index, 1);
        elmRow.remove();

        if (!tblStudents.tBodies[0].rows.length) {
            tblStudents.classList.add("empty");
        }
    }
});

frmStudent.addEventListener('submit', (eventData) => eventData.preventDefault());
frmStudent.addEventListener('reset', (eventData) => {
    eventData.preventDefault();
    [txtName, txtAddress, txtContact].forEach(input => {
        input.value = '';
        input.classList.remove('is-invalid');
    });
    txtName.focus();
});


const regExp4Name = /^[A-Za-z]+$/;
const regExp4Address = /^[A-Za-z0-9,:./\-]+$/;
const regExp4Contact = /^\d{3}-\d{7}$/;
const students = [];

class Student {
    id;
    #nameCell;
    address;
    #contactCell;
    rowElm
    #name;
    #contact

    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
        this.#nameCell.innerText = name;
    }
    get contact() {
        return this.#contact;
    }
    set contact(contact) {
        this.#contact = contact;
        this.#contactCell.innerText=contact
    }


    constructor(id, name, address, contact) {
        this.rowElm = tblStudents.tBodies[0].insertRow();
        const idCell = this.rowElm.insertCell();
        this.#nameCell = this.rowElm.insertCell();
        this.#contactCell = this.rowElm.insertCell();
        const removeCell = this.rowElm.insertCell();

        // nameCell.innerText = this.name;
        // contactCell.innerText = this.contact;
        removeCell.innerHTML = `<i class="bi bi-trash"></i>`;
        
        this.id = id;
        this.name = name;
        this.address = address;
        this.contact = contact;
        idCell.innerText = this.id;



        // sremoveCell.querySelector("i").addEventListener('click', () => this.rowElm.remove());

        tblStudents.classList.remove('empty');

        this.rowElm.addEventListener('click', () => {
            students.forEach(student => student.rowElm.classList.remove('selected'));
            this.rowElm.classList.add('selected');

            txtId.value = this.id;
            txtName.value = this.name;
            txtAddress.value = this.address;
            txtContact.value = this.contact;
            btnSave.innerText = "Update Student";

            selectedStudent = this;
        });
    }
}

console.log(tblStudents, btnNew, btnSave, btnClear, txtId, txtName, txtContact, txtAddress);

const inputListener = (eventData) => eventData.target.classList.remove('is-invalid');
[txtId, txtName, txtAddress, txtContact].forEach(input =>
    input.addEventListener('input', inputListener));

btnNew.addEventListener('click', () => {
    [txtId, txtName, txtAddress, txtContact, btnClear, btnSave]
        .forEach(ctrl => ctrl.disabled = false);
    txtId.value = genarateNewStudentId();
    btnClear.click();
    students.forEach(student => student.rowElm.classList.remove('selected'));
    btnSave.innerText = 'Save Student';



});

function genarateNewStudentId() {
    return "S001";
}

btnSave.addEventListener('click', () => {

    let invalidInput = null;

    if (!regExp4Name.test(txtName.value.trim())) {
        txtName.classList.add('is-invalid');
        if (!invalidInput) invalidInput = txtName;
    }
    if (!regExp4Address.test(txtAddress.value.trim())) {
        txtAddress.classList.add('is-invalid');
        if (!invalidInput) invalidInput = txtAddress;
    }
    if (!regExp4Contact.test(txtContact.value.trim())) {
        txtContact.classList.add('is-invalid');
        if (!invalidInput) invalidInput = txtContact;
    }
    if (invalidInput) {
        invalidInput.select();
        return;
    }
    if (btnSave.innerText === 'Save Student') {
        students.push(new Student(txtId.value, txtName.value, txtAddress.value, txtContact.value));

    } else {
        selectedStudent.name = txtName.value;
        selectedStudent.address = txtAddress.value;
        selectedStudent.contact = txtContact.value;
    }
});