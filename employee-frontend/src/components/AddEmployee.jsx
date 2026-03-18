import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeService from '../services/EmployeeService';

const AddEmployee = () => {
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: '',
        department: '',
        position: '',
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};
        if (!employee.firstName.trim())
            newErrors.firstName = 'First name is required';
        if (!employee.lastName.trim())
            newErrors.lastName = 'Last name is required';
        if (!employee.email.trim())
            newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee.email))
            newErrors.email = 'Invalid email format';
        if (!employee.department.trim())
            newErrors.department = 'Department is required';
        if (!employee.position.trim())
            newErrors.position = 'Position is required';
        return newErrors;

    }

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value});
        if(errors[e.target.name]){
            setErrors({...errors, [e.target.name]: ''});
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0){
            setErrors(validationErrors);
            toast.error('Please fix the errors!');
            return;
        }
        EmployeeService.createEmployee(employee)
        .then(() => {
            toast.success('Employee added successfully!');
            setTimeout(() => navigate('/'), 1500);
        })
        .catch(error => {
            if(error.response && error.response.status === 500){
                toast.error('Email already exists!');
            } else {
                toast.error('Error creating employee!');
            }
            console.error(error);
        });
    };

    return (
        <div style={{padding: '20px', maxWidth: '500px', margin: '0 auto'}}>
            <ToastContainer position='top-right' autoClose={3000}/>
            <h2>Add New Employee</h2>
            <form onSubmit={handleSubmit}>

                <div style={formGroupStyle}>
                    <label>First Name:</label>
                    <input type="text"
                    name="firstName"
                    value={employee.firstName}
                    onChange={handleChange}
                    style={inputStyle} />
                    {errors.firstName &&
                    <span style={errorStyle}>{errors.firstName}</span>}
                </div>

                <div style={formGroupStyle}>
                    <label>Last Name:</label>
                    <input type="text"
                    name="lastName" 
                    value={employee.lastName}
                    onChange={handleChange}
                    style={inputStyle}/>
                    {errors.lastName &&
                    <span style={errorStyle}>{errors.lastName}</span>}
                </div>

                <div style={formGroupStyle}>
                    <label>Email:</label>
                    <input type="email"
                    name="email"
                    value={employee.email}
                    onChange={handleChange}
                    style={inputStyle} />
                    {errors.email &&
                    <span style={errorStyle}>{errors.email}</span>}
                </div>

                <div style={formGroupStyle}>
                    <label>Department:</label>
                    <input type="text"
                    name="department"
                    value={employee.department}
                    onChange={handleChange}
                    style={inputStyle} />
                    {errors.department &&
                    <span style={errorStyle}>{errors.department}</span>}
                </div>

                <div style={formGroupStyle}>
                    <label>Position:</label>
                    <input type="text"
                    name="position"
                    value={employee.position}
                    onChange={handleChange}
                    style={inputStyle} />
                    {errors.position &&
                    <span style={errorStyle}>{errors.position}</span>}
                </div>

                <button type="submit" style={submitButtonStyle}>
                    Save Employee
                </button>

                <button 
                type="button"
                onClick={() => navigate('/')}
                style={cancelButtonStyle}>
                    Cancel
                </button>
            </form>
        </div>
    );
};


const formGroupStyle = {
    marginBottom : '15px'
};

const inputStyle = {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    boxSizing: 'border-box'
};

const errorStyle = {
    color: 'red',
    fontSize: '12px',
    marginTop: '4px',
    display: 'block'
};

const submitButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px'
};


const cancelButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
};

export default AddEmployee;