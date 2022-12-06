import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const StudentSignUp = () => {
    const { createUser, updateUser } = useContext(AuthContext);
    const imgHostKey = process.env.REACT_APP_imgbb_key;
    const { register, formState: { errors }, handleSubmit,
      } = useForm();
      const [signUpError, setSignUpError] = useState("");
      const handleSignUp=data=>{

        setSignUpError("");
        console.log(data.image[0]);
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
    .then((res) => res.json())
    .then(imgData=>{
        if(imgData.success){
            createUser(data.email, data.password)
            .then((result) => {
              toast("Student Created Successfully");
              const user = result.user;
              console.log(user);
              const updateInfo = {
                displayName: data.name,
                photoURL : imgData.data.url
              };
              updateUser(updateInfo)
                .then((res) => {
                saveStudent(data.name,data.roll,data.session,data.section,data.email,data.phone,imgData.data.url,data.department)
                })
                .catch((err) => console.log(err));
            })
            .catch((er) => {
              console.error(er);
              setSignUpError(er.message);
            });
        }
    })
      
      }
      const saveStudent=(name,roll,session,section,email,phone,photo,department)=>{
            const student={
               name,roll,section,session,department,email,phone,photo
            }
            fetch("https://online-noticeboard-server.vercel.app/students", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(student),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("savedStudent", data);
        
      });
      }
    return (
        <div className="flex justify-center items-center p-7">
        <div>
          <h2 className="text-center">Sign Up</h2>
          <form onSubmit={handleSubmit(handleSignUp)}>
            {/* Name */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                {...register("name",{ required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-600">{errors.name?.message}</p>
              )}
            </div>
            {/* Roll  */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Your Roll</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                {...register("roll",{ required: "Roll is required" })}
              />
              {errors.roll && (
                <p className="text-red-600">{errors.roll?.message}</p>
              )}
            </div>
            {/* Session  */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Session</span>
              </label>
              <select className="select select-bordered w-full max-w-xs" {...register("session",{ required: "Session is required" })}>
  <option disabled>Please Select Your Session</option>
  <option>16</option>
  <option>17</option>
  <option>18</option>
  <option>19</option>
  <option>20</option>
  <option>21</option>
             </select>
              {errors.session && (
                <p className="text-red-600">{errors.session?.message}</p>
              )}
            </div>
            {/* Section  */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Section</span>
              </label>
              <select className="select select-bordered w-full max-w-xs" {...register("section",{ required: "Section is required" })}>
  <option disabled>Please Select Your Section</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
             </select>
              {errors.section && (
                <p className="text-red-600">{errors.section?.message}</p>
              )}
            </div>
            {/* Department  */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Department</span>
              </label>
              <select className="select select-bordered w-full max-w-xs" {...register("department",{ required: "Department is required" })}>
  <option disabled>Please Select Your Depertment</option>
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
              {errors.department && (
                <p className="text-red-600">{errors.department?.message}</p>
              )}
            </div>
            {/* Phone  */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Contact</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                {...register("phone", { required: "Contact Number is required" })}
              />
              {errors.phone && (
                <p className="text-red-600">{errors.phone?.message}</p>
              )}
            </div>
            {/* Email  */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full max-w-xs"
                {...register("email", { required: "Email address is required" })}
              />
              {errors.email && (
                <p className="text-red-600">{errors.email?.message}</p>
              )}
            </div>
            {/* password  */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered w-full max-w-xs"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be 8 characters",
                  },
                  //   pattern:{value:/(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}/, message:"password must be strong"}
                })}
              />
              {errors.password && (
                <p className="text-red-600">{errors.password?.message}</p>
              )}
            </div>
            {/* photo  */}
            <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Your Photo</span>
          </label>
          <input
            type="file"
            className="input input-bordered w-full max-w-xs"
            {...register("image",{ required: "Your photo is required" })}
          />
          {errors.image && (
                <p className="text-red-600">{errors.image?.message}</p>
              )}
        </div>
  
            <input
              className="btn btn-accent w-full my-5"
              type="submit"
              value="SIGNUP"
            />
            {signUpError && <p className="text-red-600">{signUpError}</p>}
          </form>
          <p className="mt-4">
            Alraedy have an account? 
             <Link className="text-primary ms-2" to="/student/login">
                SignIn
             </Link>
          </p>
          <div className="divider">OR</div>
          <button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
        </div>
      </div>
    );
};

export default StudentSignUp;