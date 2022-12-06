import React, { useContext } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const StudentDashBoard = () => {
    const student=useLoaderData();
    console.log(student);
    const{user}=useContext(AuthContext);
    return (
        <div className="card w-96 bg-base-100 shadow-xl mx-auto">
        <figure className="px-10 pt-10">
          <img src={user?.photoURL} alt="User" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{user?.displayName}</h2>
          <div className="card-actions grid grid-cols-1 gap-4">
            <Link to='/student/viewNotices'>
            <button className=" bg-green-300 p-4 rounded">View All Notices</button>
            </Link>
          </div>
        </div>
      </div>
    );
};

export default StudentDashBoard;