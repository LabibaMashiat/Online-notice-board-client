import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const StudentNavbar = () => {
    const{user,logOut}=useContext(AuthContext);
    const navigate=useNavigate();
     const handleLogOut=()=>{
         logOut()
         .then(()=>{
           navigate('/')
         })
         .catch(er=>console.error(er));
     }
    return (
        <div className="navbar bg-orange-900">
         <div className="navbar-start">
          {/* <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Item 1</a></li>
              <li tabIndex={0}>
                <a className="justify-between">
                  Parent
                  <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
                </a>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </li>
              <li><a>Item 3</a></li>
            </ul>
          </div> */}
        </div> 
        <div className="">
          <ul className="menu menu-horizontal p-0">
           {
              user?.email &&
             <div className='flex justify-items-end'>
              <li>
               <Link to={`/student/dashboard/${user?.email}`}><button className='bg-yellow-200 p-3 rounded'>Dasboard</button></Link>
              </li>
               <li><button onClick={handleLogOut} className='bg-red-200 h-10 mt-5 rounded'>LogOut</button></li>
             
             </div>
           }
          </ul>
        </div>
      </div>
    );
};

export default StudentNavbar;