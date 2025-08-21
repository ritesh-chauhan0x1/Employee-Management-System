import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  total = 0;
  page = 1;
  limit = 10;
  search = '';
  sort = 'name';
  loading = false;
  selectedEmployee: Employee | null = null;
  showModal = false;
  form: FormGroup;
  isEdit = false;

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: [''],
      position: [''],
      department: [''],
      salary: ['']
    });
  }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.loading = true;
    this.employeeService.getEmployees({
      page: this.page,
      limit: this.limit,
      search: this.search,
      sort: this.sort
    }).subscribe(res => {
      this.employees = res.employees;
      this.total = res.total;
      this.loading = false;
    });
  }

  openModal(employee?: Employee) {
    this.showModal = true;
    this.isEdit = !!employee;
    this.selectedEmployee = employee || null;
    this.form.reset(employee || { name: '', position: '', department: '', salary: '' });
  }

  closeModal() {
    this.showModal = false;
    this.selectedEmployee = null;
    this.form.reset();
  }

  submit() {
    if (this.isEdit && this.selectedEmployee) {
      this.employeeService.updateEmployee(this.selectedEmployee._id!, this.form.value).subscribe(() => {
        this.getEmployees();
        this.closeModal();
      });
    } else {
      this.employeeService.addEmployee(this.form.value).subscribe(() => {
        this.getEmployees();
        this.closeModal();
      });
    }
  }

  deleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.getEmployees();
      });
    }
  }

  onSearchChange() {
    this.page = 1;
    this.getEmployees();
  }

  onSortChange(sort: string) {
    this.sort = sort;
    this.getEmployees();
  }

  onPageChange(page: number) {
    this.page = page;
    this.getEmployees();
  }
}
