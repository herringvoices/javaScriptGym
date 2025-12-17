// Handbook entry for JS.AR.ACC (Arrays & Objects · Mutation and the "Wait… Why Did That Change?!" Bug)

/** @type {import('./overview.js').HandbookEntry} */
const entry = {
  id: "JS.AR.ACC-wb",
  standard: "JS.AR.ACC",
  files: [
    {
      path: "/index.html",
      type: "html",
      readOnly: true,
      content:
        "<!doctype html>\n" +
        "<html>\n" +
        "  <head>\n" +
        "    <meta charset=\"utf-8\" />\n" +
        "    <title>Arrays · Array Methods</title>\n" +
        "  </head>\n" +
        "  <body>\n" +
        "    <main>\n" +
        "      <h1>Arrays · Array Methods</h1>\n" +
        "      <div id=\"app\"></div>\n" +
        "    </main>\n" +
        "    <script type=\"module\" src=\"/scripts/main.js\"></script>\n" +
        "  </body>\n" +
        "</html>",
    },
    {
      path: "/scripts/main.js",
      active: true,
      content: /*js*/ `//JS.AR.MTH
// Imports — this gets the data from database.js in the same folder
import { getStudents, getTeachers, getGrades, getFines } from "./database.js";
//Here we fill these variables with our arrays of students, teachers, grades, and fines.
const students = getStudents();
const teachers = getTeachers();
const grades = getGrades();
const fines = getFines();

`,
    },
  {
    path: "/scripts/database.js",
      active: true,
      readOnly: true,
      content: /*js*/ `//JS.AR.MTH Database
const database = {
  students: [
    {
      id: 1,
      firstName: "Edgar",
      lastName: "Gullylog",
      nature: "brave",
      pets: 2,
      homeroomTeacherId: 1,
    },
    {
      id: 2,
      firstName: "Polly",
      lastName: "Frumpleton",
      nature: "smart",
      pets: 0,
      homeroomTeacherId: 2,
    },
    {
      id: 3,
      firstName: "Bram",
      lastName: "Thistlehart",
      nature: "brave",
      pets: 1,
      homeroomTeacherId: 2,
    },
    {
      id: 4,
      firstName: "Nia",
      lastName: "Quillvine",
      nature: "smart",
      pets: 1,
      homeroomTeacherId: 3,
    },
    {
      id: 5,
      firstName: "Jasper",
      lastName: "Mudsnout",
      nature: "sneaky",
      pets: 1,
      homeroomTeacherId: 4,
    },
    {
      id: 6,
      firstName: "Zara",
      lastName: "Nightwhisk",
      nature: "sneaky",
      pets: 0,
      homeroomTeacherId: 1,
    },
    {
      id: 7,
      firstName: "Felix",
      lastName: "Candlecrumb",
      nature: "sneaky",
      pets: 2,
      homeroomTeacherId: 3,
    },
    {
      id: 8,
      firstName: "Opal",
      lastName: "Sprocket",
      nature: "smart",
      pets: 2,
      homeroomTeacherId: 4,
    },
    {
      id: 9,
      firstName: "Gideon",
      lastName: "Wispwhistle",
      nature: "brave",
      pets: 3,
      homeroomTeacherId: 1,
    },
    // Heavysigh (anything not brave/smart/sneaky)
    {
      id: 10,
      firstName: "Margo",
      lastName: "Bristlewick",
      nature: "dreamy",
      pets: 1,
      homeroomTeacherId: 2,
    },
    {
      id: 11,
      firstName: "Theo",
      lastName: "Underfern",
      nature: "anxious",
      pets: 0,
      homeroomTeacherId: 3,
    },
    {
      id: 12,
      firstName: "Luna",
      lastName: "Wobblekin",
      nature: "curious",
      pets: 2,
      homeroomTeacherId: 4,
    },
  ],

  teachers: [
    { id: 1, name: "Prof. Honeypot" },
    { id: 2, name: "Prof. Jellyroll" },
    { id: 3, name: "Prof. Thornbuckle" },
    { id: 4, name: "Prof. Moonledger" },
  ],

  grades: [
  { id: 1, studentId: 1, grade: 1 },
  { id: 2, studentId: 2, grade: 1 },
  { id: 3, studentId: 4, grade: 4 },
  { id: 4, studentId: 3, grade: 2 },
  { id: 5, studentId: 6, grade: 0 },
  { id: 6, studentId: 8, grade: 3 },
  { id: 7, studentId: 5, grade: 2 },
  { id: 8, studentId: 1, grade: 0 },
  { id: 9, studentId: 11, grade: 1 },
  { id: 10, studentId: 9, grade: 2 },
  { id: 11, studentId: 7, grade: 1 },
  { id: 12, studentId: 10, grade: 3 },
  { id: 13, studentId: 2, grade: 1 },
  { id: 14, studentId: 4, grade: 2 },
  { id: 15, studentId: 12, grade: 2 },
  { id: 16, studentId: 6, grade: 1 },
  { id: 17, studentId: 3, grade: 3 },
  { id: 18, studentId: 8, grade: 4 },
  { id: 19, studentId: 5, grade: 3 },
  { id: 20, studentId: 9, grade: 3 },
  { id: 21, studentId: 1, grade: 1 },
  { id: 22, studentId: 11, grade: 0 },
  { id: 23, studentId: 7, grade: 3 },
  { id: 24, studentId: 10, grade: 2 },
  { id: 25, studentId: 2, grade: 1 },
  { id: 26, studentId: 4, grade: 3 },
  { id: 27, studentId: 12, grade: 3 },
  { id: 28, studentId: 6, grade: 1 },
  { id: 29, studentId: 3, grade: 1 },
  { id: 30, studentId: 8, grade: 2 },
  { id: 31, studentId: 5, grade: 2 },
  { id: 32, studentId: 9, grade: 2 },
  { id: 33, studentId: 7, grade: 2 },
  { id: 34, studentId: 10, grade: 1 },
  { id: 35, studentId: 11, grade: 1 },
  { id: 36, studentId: 12, grade: 2 },
],


  fines: [
    { id: 1, studentId: 1, amount: 5, reason: "Unattended cauldron" },
    { id: 2, studentId: 6, amount: 2, reason: "Hallway invisibility" },
    { id: 3, studentId: 8, amount: 7, reason: "Library rune smudging" },
    { id: 4, studentId: 11, amount: 1, reason: "Late broom return" },
  ],
};

// These functions return an array of shallow coppies of each object.
// We export these getter functions here and import them in main.js
export const getStudents = () => database.students.map((s) => ({ ...s }));
export const getTeachers = () => database.teachers.map((t) => ({ ...t }));
export const getGrades = () => database.grades.map((g) => ({ ...g }));
export const getFines = () => database.fines.map((f) => ({ ...f }));


`,
    },
  ],
  entry: "/index.html",
  sandbox: { runtime: "dom" },
  mock: undefined,
  handbookMarkdown: "",
  tags: [],
};

export default entry;
