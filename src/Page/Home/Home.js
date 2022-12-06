import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 items-center justify-items-center  gap-6 mt-10'>
           <Link to='/teacher/login'>
           <div className="card md:w-96 md:h-60 w-80 h-40 bg-orange-400 shadow-xl">
  <div className="card-body">
    <h2 className="card-title text-white font-bold text-xl md:text-3xl lg:text-5xl m-auto">Teacher</h2>
  </div>
</div>
</Link>

<Link to='/student/login'>
<div className="card md:w-96 md:h-60 w-80 h-40 bg-amber-500 shadow-xl">
  <div className="card-body">
    <h2 className="card-title  text-white font-bold text-xl md:text-3xl lg:text-5xl m-auto">Student</h2>
  </div>
</div>
</Link>
        </div>
    );
};

export default Home;