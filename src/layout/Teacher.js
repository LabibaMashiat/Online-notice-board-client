import React from 'react';
import { Outlet } from 'react-router-dom';
import TeacherNavbar from '../Page/Teacher/TeacherNavbar/TeacherNavbar';

const Teacher = () => {
    return (
        <div>
            <TeacherNavbar></TeacherNavbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Teacher;