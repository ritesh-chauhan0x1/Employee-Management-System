import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // Placeholder for chart data
  employeeStats = {
    total: 0,
    active: 0,
    salaryDistribution: []
  };
}
