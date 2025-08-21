// Employee Controller
const Employee = require('../models/Employee');

// Get all employees with search, sort, pagination, and advanced filters
exports.getEmployees = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', sort = 'name', role, status, salaryMin, salaryMax } = req.query;
    let query = search ? { name: { $regex: search, $options: 'i' } } : {};
    if (role) query.role = role;
    if (status) query.isActive = status === 'active';
    if (salaryMin || salaryMax) {
      query.salary = {};
      if (salaryMin) query.salary.$gte = Number(salaryMin);
      if (salaryMax) query.salary.$lte = Number(salaryMax);
    }
    const employees = await Employee.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Employee.countDocuments(query);
    res.json({ employees, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single employee
exports.getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create employee with file upload
exports.createEmployee = async (req, res) => {
  try {
    const { name, position, department, salary } = req.body;
    if (!name || !position || !department || salary == null) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const employee = new Employee({
      name,
      position,
      department,
      salary,
      profilePic: req.file ? req.file.filename : undefined
    });
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update employee with file upload
exports.updateEmployee = async (req, res) => {
  try {
    const { name, position, department, salary } = req.body;
    const update = { name, position, department, salary };
    if (req.file) update.profilePic = req.file.filename;
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true, runValidators: true }
    );
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Export employees as CSV
exports.exportCSV = async (req, res) => {
  try {
    const employees = await Employee.find();
    const fields = ['name', 'position', 'department', 'salary'];
    const csv = [fields.join(',')].concat(
      employees.map(e => fields.map(f => e[f]).join(','))
    ).join('\n');
    res.header('Content-Type', 'text/csv');
    res.attachment('employees.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Export employees as Excel (simple CSV for demo)
exports.exportExcel = async (req, res) => {
  return exports.exportCSV(req, res);
};

// Export employees as PDF (simple text for demo)
exports.exportPDF = async (req, res) => {
  try {
    const employees = await Employee.find();
    let pdfText = 'Employees\n\n';
    employees.forEach(e => {
      pdfText += `${e.name} | ${e.position} | ${e.department} | ${e.salary}\n`;
    });
    res.header('Content-Type', 'application/pdf');
    res.attachment('employees.pdf');
    res.send(Buffer.from(pdfText));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
