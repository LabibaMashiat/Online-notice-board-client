import React from 'react';
import { useContext } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';

const TeacherDashboard = () => {
    const teacher=useLoaderData();
    console.log(teacher);
    const{user}=useContext(AuthContext);

    return (
        <div className="card w-96 bg-base-100 shadow-xl mx-auto">
  <figure className="px-10 pt-10">
    <img src={user?.photoURL} alt="User" className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{user?.displayName}</h2>
    <div className="card-actions grid grid-cols-1 gap-4">
      <Link to='/teacher/addNotice'>
      <button className=" bg-orange-300 p-4 rounded">Create A Notice</button>
      </Link>
      <Link to='/teacher/viewNotices'>
      <button className=" bg-green-300 p-4 rounded">View My Notices</button>
      </Link>
      <Link to='/teacher/editProfile'>
      <button className=" bg-pink-300 p-4 rounded">Edit Profile</button>
      </Link>
    </div>
  </div>
</div>
    );
};

export default TeacherDashboard;