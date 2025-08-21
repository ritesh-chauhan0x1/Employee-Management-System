// Seed sample employees
env = require('dotenv').config();
const mongoose = require('mongoose');
const Employee = require('./models/Employee');

const seedData = [
  { name: 'Alice Smith', position: 'Developer', department: 'IT', salary: 70000 },
  { name: 'Bob Johnson', position: 'Manager', department: 'HR', salary: 80000 },
  { name: 'Carol Lee', position: 'Designer', department: 'Marketing', salary: 65000 }
];

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Employee.deleteMany({});
    await Employee.insertMany(seedData);
    console.log('Database seeded!');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
