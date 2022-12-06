import React from 'react';
import { Outlet } from 'react-router-dom';
import StudentNavbar from '../Page/Student/StudentNavbar/StudentNavbar';

const Student = () => {
    return (
        <div>
            <StudentNavbar></StudentNavbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Student;