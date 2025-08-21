// API tests for Employee endpoints using supertest and jest
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const employeeRoutes = require('../routes/employeeRoutes');
const Employee = require('../models/Employee');

const app = express();
app.use(express.json());
app.use('/api/employees', employeeRoutes);

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/ems_test', { useNewUrlParser: true, useUnifiedTopology: true });
  await Employee.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Employee API', () => {
  let empId;
  it('should create an employee', async () => {
    const res = await request(app).post('/api/employees').send({
      name: 'Test User', position: 'QA', department: 'Testing', salary: 50000
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Test User');
    empId = res.body._id;
  });

  it('should get all employees', async () => {
    const res = await request(app).get('/api/employees');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.employees)).toBe(true);
  });

  it('should update an employee', async () => {
    const res = await request(app).put(`/api/employees/${empId}`).send({
      name: 'Test User Updated', position: 'QA', department: 'Testing', salary: 55000
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Test User Updated');
  });

  it('should delete an employee', async () => {
    const res = await request(app).delete(`/api/employees/${empId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Employee deleted');
  });
});
