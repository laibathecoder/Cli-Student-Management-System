import inquirer from 'inquirer';

interface Student {
  id: number;
  name: string;
  age: number;
  grade: string;
}

let students: Student[] = [];
let studentId: number = 1;

async function addStudent() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter student name:'
    },
    {
      type: 'number',
      name: 'age',
      message: 'Enter student age:'
    },
    {
      type: 'input',
      name: 'grade',
      message: 'Enter student grade:'
    }
  ]);

  const newStudent: Student = {
    id: studentId++,
    name: answers.name,
    age: answers.age,
    grade: answers.grade
  };

  students.push(newStudent);
  console.log('Student added successfully!\n');
}

function viewStudents() {
  if (students.length === 0) {
    console.log('No students found!\n');
  } else {
    console.log('List of Students:');
    students.forEach((student) => {
      console.log(`ID: ${student.id}, Name: ${student.name}, Age: ${student.age}, Grade: ${student.grade}`);
    });
    console.log('\n');
  }
}

async function deleteStudent() {
  if (students.length === 0) {
    console.log('No students to delete!\n');
    return;
  }

  const { id } = await inquirer.prompt([
    {
      type: 'number',
      name: 'id',
      message: 'Enter student ID to delete:'
    }
  ]);

  const index = students.findIndex(student => student.id === id);

  if (index !== -1) {
    students.splice(index, 1);
    console.log('Student deleted successfully!\n');
  } else {
    console.log('Student not found!\n');
  }
}

async function mainMenu() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'Choose an option:',
      choices: ['Add Student', 'View Students', 'Delete Student', 'Exit']
    }
  ]);

  switch (answers.option) {
    case 'Add Student':
      await addStudent();
      break;
    case 'View Students':
      viewStudents();
      break;
    case 'Delete Student':
      await deleteStudent();
      break;
    case 'Exit':
      console.log('Exiting...');
      return;
  }

  mainMenu(); // Back to menu after an action
}

mainMenu();
