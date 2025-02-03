"use strict";

function createStudent(firstName, lastName, birthYear, grades = []) {
    return {
        firstName,
        lastName,
        birthYear,
        grades,
        attendance: new Array(25).fill(null),
        currentAttendanceIndex: 0,

        getAge() {
            return new Date().getFullYear() - this.birthYear;
        },

        getAverageGrade() {
            if (this.grades.length === 0) return 0;
            return this.grades.reduce((sum, grade) => sum + grade, 0) / this.grades.length;
        },

        present() {
            if (this.currentAttendanceIndex < this.attendance.length) {
                this.attendance[this.currentAttendanceIndex++] = true;
            }
        },

        absent() {
            if (this.currentAttendanceIndex < this.attendance.length) {
                this.attendance[this.currentAttendanceIndex++] = false;
            }
        },

        getAttendanceRate() {
            const attendedClasses = this.attendance.filter(value => value === true).length;
            const totalMarkedClasses = this.attendance.filter(value => value !== null).length;
            return totalMarkedClasses === 0 ? 0 : attendedClasses / totalMarkedClasses;
        },

        summary() {
            const avgGrade = this.getAverageGrade();
            const avgAttendance = this.getAttendanceRate();
            
            if (avgGrade > 90 && avgAttendance > 0.9) {
                return "Молодець!";
            } else if (avgGrade > 90 || avgAttendance > 0.9) {
                return "Добре, але можна краще";
            } else {
                return "Редиска!";
            }
        }
    };
}

const students = [
    createStudent("Віктор", "Кучеров", 2004, [94, 91, 90, 93]),
    createStudent("Юлія", "Новікова", 2006, [77, 89, 88, 98]),
    createStudent("Ольга", "Доброжан", 2005, [72, 74, 70, 80])
];

function renderStudents() {
    const container = document.getElementById("students");
    container.innerHTML = "";
    students.forEach((student, index) => {
        const studentDiv = document.createElement("div");
        studentDiv.className = "student-container";
        studentDiv.innerHTML = `
            <h2>${student.firstName} ${student.lastName}</h2>
            <p><strong>Вік:</strong> ${student.getAge()}</p>
            <p><strong>Середній бал:</strong> ${student.getAverageGrade().toFixed(2)}</p>
            <p><strong>Відвідуваність:</strong> ${(student.getAttendanceRate() * 100).toFixed(2)}%</p>
            <p><strong>Підсумок:</strong> ${student.summary()}</p>
            <button onclick="markPresent(${index})">Присутній</button>
            <button onclick="markAbsent(${index})">Відсутній</button>
        `;
        container.appendChild(studentDiv);
    });
}

function markPresent(index) {
    students[index].present();
    renderStudents();
}

function markAbsent(index) {
    students[index].absent();
    renderStudents();
}

renderStudents();

