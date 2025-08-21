// Employee Routes
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const upload = require('../middleware/upload');

// Advanced filters: /api/employees?role=...&status=...&salaryMin=...&salaryMax=...
router.get('/', employeeController.getEmployees);
router.get('/:id', employeeController.getEmployee);
router.post('/', upload.single('profilePic'), employeeController.createEmployee);
router.put('/:id', upload.single('profilePic'), employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

// Export endpoints
router.get('/export/csv', employeeController.exportCSV);
router.get('/export/excel', employeeController.exportExcel);
router.get('/export/pdf', employeeController.exportPDF);

module.exports = router;
