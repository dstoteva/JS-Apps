function solve(){

    const kinveyUserName = 'guest';
    const kinveyPassword = 'guest';
    const baseUrl = 'https://baas.kinvey.com/appdata/kid_SJmmXzIGH/students';

    let form = elementsFactory('form');
    let header = elementsFactory('h3', null, '-----> Create Student <-----');
    let idLabel = elementsFactory('label', null, 'ID');
    let ID = elementsFactory('input', 'iD');
    ID.type = 'number';
    let firstNameLabel = elementsFactory('label', null, 'First Name');
    let firstName = elementsFactory('input', 'firstName');
    firstName.type = 'text';
    let lastNameLabel = elementsFactory('label', null, 'Last Name');
    let lastName = elementsFactory('input', 'lastName');
    lastName.type = 'text';
    let facultyNumLabel = elementsFactory('label', null, 'Faculty Number');
    let facultyNum = elementsFactory('input', 'facultyNum');
    facultyNum.type = 'text';
    let gradeLabel = elementsFactory('label', null, 'Grade');
    let grade = elementsFactory('input', 'grade');
    grade.type = 'number';
    let submitBtn = elementsFactory('button', 'submit', 'Submit');

    form.appendChild(header);
    form.appendChild(idLabel);
    form.appendChild(ID);
    form.appendChild(firstNameLabel);
    form.appendChild(firstName);
    form.appendChild(lastNameLabel);
    form.appendChild(lastName);
    form.appendChild(facultyNumLabel);
    form.appendChild(facultyNum);
    form.appendChild(gradeLabel);
    form.appendChild(grade);
    form.appendChild(submitBtn);
    document.getElementsByTagName('body')[0].appendChild(form);

    load();

    submitBtn.addEventListener('click', (ev) =>{
        ev.preventDefault();

        let studentId = ID.value;
        let studentFirstName = firstName.value;
        let studentLastName = lastName.value;
        let studentFacultyNum = facultyNum.value;
        let studentGrade = grade.value;

        if(studentId && studentFirstName && studentLastName && studentFacultyNum && studentGrade){
            fetch(baseUrl, {
                method: 'POST',
                credentials: 'include',
                Authorization: 'Basic ' + btoa(`${kinveyUserName}:${kinveyPassword}`),
                headers: {
                    'content-type':'application/json'
                },
                body: JSON.stringify({
                    ID: studentId,
                    FirstName: studentFirstName,
                    LastName: studentLastName,
                    FacultyNumber: studentFacultyNum,
                    Grade: studentGrade
                })
            }).then(load);
        }
        ID.value = '';
        firstName.value = '';
        lastName.value = '';
        facultyNum.value = '';
        grade.value = '';
    });

    function load(){
        document.getElementsByTagName('tbody')[0].innerHTML = '';
        fetch(baseUrl, {
            credentials: 'include',
            Authorization: 'Basic ' + btoa(`${kinveyUserName}:${kinveyPassword}`),
        }).then(response => response.json())
        .then(data => {
            let sorted = Object.entries(data).sort((x, y) => x[1].ID - y[1].ID);
            sorted.forEach(element => {
                let currentStudent = element[1];

                let tr = elementsFactory('tr');
                tr.appendChild(elementsFactory('th', null, currentStudent.ID));
                tr.appendChild(elementsFactory('th', null, currentStudent.FirstName));
                tr.appendChild(elementsFactory('th', null, currentStudent.LastName));
                tr.appendChild(elementsFactory('th', null, currentStudent.FacultyNumber));
                tr.appendChild(elementsFactory('th', null, currentStudent.Grade));

                document.getElementsByTagName('tbody')[0].appendChild(tr);
            });

        });
    };

    function elementsFactory(tag, id, text){
        let currentEl = document.createElement(tag);
        if(id){
            currentEl.id = id;
        }
        if(text){
            currentEl.innerHTML = text;
        }
        return currentEl;
    };
};
solve();