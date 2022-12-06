import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import {FaTrash} from 'react-icons/fa';
import ConfirmationModal from '../../ConfirmationModal/ConfirmationModal';
import toast from 'react-hot-toast';

const ViewMyNotices = () => {
    const closeModal = () => {
        setDeletingNotice(null);
      };
      const [deletingNotice, setDeletingNotice] = useState(null);
    const { user } = useContext(AuthContext);
    const { data: notices = [] } = useQuery({
        queryKey: ["notices", user?.email],
        queryFn: async () => {
          const res = await fetch(`https://online-noticeboard-server.vercel.app/notices?email=${user?.email}`);
          const data = await res.json();
          return data;
        },
      });
      console.log(notices);
      const handleDeleteNotice=(notice)=>{
        fetch(
            `https://online-noticeboard-server.vercel.app/notices/${notice._id}`,
            {
              method: "DELETE",
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.deletedCount > 0) {
                toast.success("notice deleted successfully");
              }
            });
      }
    return (
        <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Date</th>
              <th>Session</th>
              <th>Department</th>
              <th>Section</th>
              <th>Notice</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
                notices.map((notice,i)=><tr key={notice._id}>
                <th>{i+1}</th>
                <td>{notice.title}</td>
                <td>{notice.date}</td>
                <td>{notice.session}</td>
                <td>{notice.department}</td>
                <td>{notice.section}</td>
                <td>{notice.message}</td>
                <td><label
                    onClick={() => setDeletingNotice(notice)}
                    htmlFor="confirmation-modal"
                    className="w-6 h-6"
                  >
                    <FaTrash  className="w-6 h-6"/>
                  </label></td>
              </tr>)
            }
          </tbody>
        </table>
        {
            deletingNotice &&
            <ConfirmationModal
          title={`Are you sure you want to delete?`}
          successAction={handleDeleteNotice}
          successButtonName="Delete"
          modalData={deletingNotice}
          closeModal={closeModal}
        ></ConfirmationModal>
        }
      </div>
    );
};

export default ViewMyNotices;