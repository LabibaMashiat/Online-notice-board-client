import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const ViewAllNotices = () => {
    const{user}=useContext(AuthContext);
    const { data: student=[], refetch } = useQuery({
        queryKey: ["students",user?.email],
        queryFn: async () => {
          const res = await fetch(
            `https://online-noticeboard-server.vercel.app/students?email=${user?.email}`
          );
          const data = await res.json();
          return data;
        },
      });
      const stud=student[0];
      console.log(stud);
     
      const { data: notices=[] } = useQuery({
        queryKey: ["notices",stud?.session],
        queryFn: async () => {
          const res = await fetch(
            `https://online-noticeboard-server.vercel.app/allNotices?session=${stud?.session}&section=${stud?.section}&department=${stud?.department}`
          );
          const data = await res.json();
          return data;
        },
      });
      console.log(notices)

    return (
        <div className='grid grid-cols-1 my-5'>
           {
            notices.reverse().map(notice=><div key={notice._id} className="card w-full mx-auto bg-orange-200 my-6">
            <div className="card-body">
              <h2 className="card-title">{notice?.title}</h2>
              <p>{notice?.message}</p>
              <div className="">
                <p>Sent By:</p>
                <h1>{notice?.teacher_name}</h1>
                <h1> {notice?.teacher_email}</h1>
                <small>Posted  Date: {notice?.date}</small>
              </div>
            </div>
          </div>)
           }
        </div>
    );
};

export default ViewAllNotices;