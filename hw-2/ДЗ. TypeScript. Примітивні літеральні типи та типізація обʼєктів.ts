type Lecturer = {
  name: string;
  surname: string;
  position: string;
  company: string;
  experience: number;
  courses: string[];
  contacts: string[];
};

class School {
  // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods

  _areas: string[] = [];
  _lecturers: Lecturer[] = []; // Name, surname, position, company, experience, courses, contacts

  get areas(): string[] {
    return this._areas;
  }

  get lecturers(): Lecturer[] {
    return this._lecturers;
  }

  addArea(area: string): void {
    this._areas.push(area);
  }

  removeArea(area: string): void {
    this._areas = this._areas.filter(a => a !== area);
  }

  addLecturer(lecturer: Lecturer): void {
    this._lecturers.push(lecturer);
  }

  removeLecturer(lecturer: Lecturer): void {
    this._lecturers = this._lecturers.filter(l => l !== lecturer);
  }
}

class Area {
  // implement getters for fields and 'add/remove level' methods
  _levels: string[] = [];
  _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  get levels(): string[] {
    return this._levels;
  }

  addLevel(level: string): void {
    this._levels.push(level);
  }

  removeLevel(level: string): void {
    this._levels = this.levels.filter(a => a !== level);
  }
}

class Level {
  // implement getters for fields and 'add/remove group' methods

  _groups: any[] = [];
  _name: string;
  _description: string;

  constructor(name: string, description: string, groups: any[]) {
    this._name = name;
    this._groups = groups;
    this._description = description;
  }

  get description(): string {
    return this._description;
  }

  get groups(): any[] {
    return this._groups;
  }

  get name(): string {
    return this._name;
  }

  addGroup(group: any): void {
    this._groups.push(group);
  }

  removeGroup(group: any): void {
    this._groups = this.groups.filter(a => a !== group);
  }
}

class Group {
  // implement getters for fields and 'add/remove student' and 'set status' methods

  _area: string;
  _status: string;
  _directionName: string;
  _levelName: string;
  _students: Student[] = []; // Modify the array so that it has a valid toSorted method*

  constructor(directionName: string, levelName: string, area: string, status: string, students: Student[] ) {
    this._directionName = directionName;
    this._levelName = levelName;
    this._area = area;
    this._status = status;
    this._students = students;
  }

  get area(): string {
    return this._area;
  }

  get status(): string {
    return this._status;
  }

  set status(status: string) {
    this._status = status;
  }

  get students(): any[] {
    return this._students;
  }

  get directionName(): string {
    return this._directionName;
  }

  get levelName(): string {
    return this._levelName;
  }

  addStudent(student: Student): void {
    this._students.push(student);
  }

  removeStudent(student: Student): void {
    this._students = this.students.filter(a => a !== student);
  }

  showPerformance() {
    const sortedStudents = this._students.toSorted((a, b) => b.getPerformanceRating() - a.getPerformanceRating());
    return sortedStudents;
  }
}

type Student = {
  _firstName: string;
  _lastName: string;
  _birthYear: string;
  _grades: string[];
  _visits: number[];
};

class Student {
  // implement 'set grade' and 'set visit' methods

  _firstName: string;
  _lastName: string;
  _birthYear: number;
  _grades: any[] = []; // workName: mark
  _visits: any[] = []; // lesson: present

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  get fullName() {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(' ');
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  set grades(value: any) {
    this._grades = value;
  }

  set visits(value: any) {
    this._visits = value;
  }

  getPerformanceRating() {
    const gradeValues = Object.values(this._grades);

    if (!gradeValues.length) return 0;

    const averageGrade = gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
    const attendancePercentage = (this._visits.filter(present => present).length / this._visits.length) * 100;

    return (averageGrade + attendancePercentage) / 2;
  }
}