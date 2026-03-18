import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/employees';


const EmployeeService = {

    // Get all Employees
     getAllEmployees: (keyword = '', page = 0, size = 5) => {
        return axios.get(`${API_BASE_URL}?keyword=${keyword}&page=${page}&size=${size}`);
     },

     // Get Employee by ID
     getEmployeeById: (id) => {
        return axios.get(`${API_BASE_URL}/${id}`);
     },

     // Create new Employee
     createEmployee: (employee) => {
        return axios.post(API_BASE_URL, employee);
     },

     // Update Employee
     updateEmployee: (id, employee) => {
        return axios.put(`${API_BASE_URL}/${id}`, employee);
     },

     // Delete Employees
     deleteEmployee: (id) => {
        return axios.delete(`${API_BASE_URL}/${id}`);
    }
}

export default EmployeeService;