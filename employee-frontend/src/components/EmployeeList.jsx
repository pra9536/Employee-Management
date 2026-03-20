import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import EmployeeService from "../services/EmployeeService";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const pageSize = 5;
    const navigate = useNavigate();

    useEffect(() => {
        loadEmployees();
    }, [currentPage, keyword]);

    const loadEmployees = () => {
        EmployeeService.getAllEmployees(keyword, currentPage, pageSize)
        .then(response => {
            setEmployees(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalElements(response.data.totalElements);
        })
        .catch(error => {
            toast.error('Error loading employees!');
            console.error(error);
        });
    };

    const deleteEmployee = (id) => {
        if(window.confirm('Are you sure you want to delete this employee')){
            EmployeeService.deleteEmployee(id)
            .then(() => {
                toast.success('Employee deleted successfully!');
                loadEmployees();
            })
            .catch(error => {
                toast.error('Error deleting employee!');
                console.error(error);
            });
        }
    };

    const handleSearch = (e) => {
        setKeyword(e.target.value);
        setCurrentPage(0);
    }

    return (
        <div style={{padding: '15px'}}>
            <ToastContainer position="top-right" autoClose={3000}/>
            <h2>Employee Management System</h2>

            <div className="header-row" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>

            <button onClick={() => navigate('/add-employee')}
                style={{
                    padding: '8px 16px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                    Add Employee
                </button>

                <input type="text"
                placeholder="Search by name or department..."
                value={keyword}
                onChange={handleSearch}
                style={{
                    padding: '8px',
                    width: '100%',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                }} />
                </div>

                <p style={{color: '#666'}}>Total Employees: {totalElements}</p>

            <div className="table-container">
                <table style={{width: '100%', borderCollapse: 'collapse'}}>
                    <thead>
                        <tr style={{backgroundColor: '#f2f2f2'}}>
                            <th style={tableHeaderStyle}>ID</th>
                            <th style={tableHeaderStyle}>First Name</th>
                            <th style={tableHeaderStyle}>Last Name</th>
                            <th style={tableHeaderStyle}>Email</th>
                            <th style={tableHeaderStyle}>Department</th>
                            <th style={tableHeaderStyle}>Position</th>
                            <th style={tableHeaderStyle}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {employees.length === 0 ? (
                            <tr>
                                <td colSpan="7" style={{textAlign: 'center', padding: '20px'}}>
                                    No employees found
                                </td>
                            </tr>
                        ) : (
                        employees.map(employee => (
                            <tr key={employee.id}>
                                <td style={tableCellStyle}>{employee.id}</td>
                                <td style={tableCellStyle}>{employee.firstName}</td>
                                <td style={tableCellStyle}>{employee.lastName}</td>
                                <td style={tableCellStyle}>{employee.email}</td>
                                <td style={tableCellStyle}>{employee.department}</td>
                                <td style={tableCellStyle}>{employee.position}</td>
                                <td style={tableCellStyle}>
                                    <div className="actions-buttons">
                                    <button 
                                    onClick={() => navigate(`/edit-employee/${employee.id}`)}
                                    style={{
                                        marginRight: '8px',
                                        padding: '5px 10px',
                                        backgroundColor: '#2196F3',
                                        color: 'white',
                                        border : 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}>
                                        Edit
                                    </button>
                                    <button
                                    onClick={() => deleteEmployee(employee.id)}
                                    style={{
                                        padding: '5px 10px',
                                        backgroundColor: '#f44336',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}>
                                        Delete
                                    </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
                </div>

                <div className="pagination" style={{marginTop: '20px', display: 'flex', gap: '8px', alignItems: 'center'}}>
                    <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                    disabled={currentPage === 0}
                    style={{
                        padding: '6px 12px',
                        backgroundColor: currentPage === 0 ? '#ccc' : '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: currentPage === 0 ? 'not-allowed' : 'pointer'
                    }}>
                        Previous
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                        key={index}
                        onClick={() => setCurrentPage(index)}
                        style={{
                            padding: '6px 12px',
                            backgroundColor: currentPage === index ? '#4CAF50' : '#e0e0e0',
                            color: currentPage === index ? 'white' : 'black',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}>
                            {index + 1}
                        </button>
                    ))}

                    <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
                    disabled={currentPage === totalPages - 1 || totalPages === 0}
                    style={{
                        padding: '6px 12px',
                        backgroundColor: currentPage === totalPages - 1 || totalPages === 0 ? '#ccc' : '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer'
                    }}>
                        Next
                    </button>

                    <span style={{color: '#666'}}>
                        Page {totalPages === 0 ? 0 : currentPage + 1} of {totalPages}
                    </span>
                </div>
        </div>
    );
};

const tableHeaderStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'left'
};

const tableCellStyle = {
    border: '1px solid #ddd',
    padding: '8px'
};

export default EmployeeList;