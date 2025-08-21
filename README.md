# Employee Management System (MEAN Stack)

A full-stack CRUD application for managing employee records, built with:
- **Angular** (frontend)
- **Express.js/Node.js** (backend)
- **MongoDB** (database)

## Key Features
- Add new employee records with details (name, role, department, etc.)
- View and search employee information in a structured format
- Update existing employee data seamlessly
- Delete employee records when no longer required
- RESTful API with Express.js & Node.js for smooth client-server communication
- MongoDB integration for secure and flexible data storage
- Responsive Angular frontend with user-friendly UI

## Folder Structure
```
Employee-Management-System/
  backend/
    models/Employee.js
    routes/employeeRoutes.js
    server.js
    package.json
  frontend/
    src/app/employees/
      employees.component.ts
      employees.component.html
      employees.component.scss
    employees.service.ts
    proxy.conf.json
    angular.json
    package.json
```

## Getting Started

### 1. Clone the repository
```sh
git clone https://github.com/ritesh-chauhan0x1/Employee-Management-System.git
cd Employee-Management-System
```

### 2. Backend Setup
```sh
cd backend
npm install
```
- Configure MongoDB connection in `backend/config/default.js` (set `mongoUri`)
- Start backend server:
```sh
node server.js
```

### 3. Frontend Setup
```sh
cd ../frontend
npm install
```
- Start Angular frontend:
```sh
npm start
```
- The Angular app will proxy API requests to the backend using `proxy.conf.json`.

### 4. Usage
- Open your browser at `http://localhost:4200`
- Use the UI to add, view, update, or delete employees
- Sample data is available on first run

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
