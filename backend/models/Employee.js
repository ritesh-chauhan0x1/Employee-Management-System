// Enhanced Mongoose model for Employee
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: String,
  position: String,
  department: String,
  salary: Number,
  profilePic: String,
  isActive: { type: Boolean, default: true },
  role: { type: String, enum: ['Admin', 'HR', 'Employee'], default: 'Employee' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);
