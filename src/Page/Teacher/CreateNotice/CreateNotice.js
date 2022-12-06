import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const CreateNotice = () => {
    const{user}=useContext(AuthContext);
    const navigate=useNavigate();
    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm();
      const handleAddNotice=data=>{
           console.log(data);
           const notice={
            title: data.topic,
            date: data.date,
            department:data.department,
            session:data.session,
            section:data.section,
            teacher_email:user?.email,
            teacher_name:user?.displayName,
            message:data.textNotice,
            file:data.fileNotice
           }
           fetch("https://online-noticeboard-server.vercel.app/notices", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              
            },
            body: JSON.stringify(notice),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              toast.success(`notice successfully added`);
              navigate('/teacher/viewNotices');
            });
        }
   
    return (
        <div className=" p-7 w-1/2 mx-auto">
        <form onSubmit={handleSubmit(handleAddNotice)}>
            {/* Topic */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Topic</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              {...register("topic")}
            />
          </div>
          {/* date  */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Published Date</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full max-w-xs"
              {...register("date")}
            />
          </div>
          {/* department  */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Department</span>
            </label>
            <select
              {...register("department")}
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled >
               Select Department
              </option>
              <option>To All</option>
              <option>EEE</option>
              <option>CSE</option>
              <option>CE</option>
              <option>ME</option>
              <option>ECE</option>
              <option>ETE</option>
              <option>MTE</option>
              <option>GCE</option>
              <option>CFPE</option>
              <option>BECM</option>
              <option>URP</option>
              <option>ARCH</option>
              
            </select>
          </div>
          {/* Session  */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Session</span>
            </label>
            <select
              {...register("session")}
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled >
               Select Session
              </option>
              <option>To All</option>
              <option>16</option>
              <option>17</option>
              <option>18</option>
              <option>19</option>
              <option>20</option>
              <option>21</option>
              
            </select>
          </div>
          {/* section  */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Section</span>
            </label>
            <select
              {...register("section")}
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled >
               Select Section
              </option>
              <option>To All</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
              
            </select>
          </div>
          {/*text notice  */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Notice</span>
            </label>
            <textarea className="textarea w-full max-w-xs" placeholder="Type" {...register("textNotice")}></textarea>
          </div>
          {/*file notice  */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Add File</span>
            </label>
            <input
              type="file"
              className="input input-bordered w-full max-w-xs"
              {...register("fileNotice")}
            />
          </div>
  
          <input
            className="btn btn-accent w-auto my-5"
            type="submit"
            value="Create Notice"
          />
        </form>
      </div>
    );
};

export default CreateNotice;