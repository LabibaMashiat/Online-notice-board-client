import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { FaGoogle} from 'react-icons/fa';

const TeacherLogin = () => {
    const navigate=useNavigate();
    const{signIn,providerLogin}= useContext(AuthContext);
    const[loginError,setLoginError]=useState('');
    const { register,formState :{errors}, handleSubmit } = useForm();
    const createProvider= new GoogleAuthProvider()
    const handleLogin=data=>{
        setLoginError('');
        signIn(data.email,data.password)
        .then(result=>{
            const user=result.user;
            console.log(user);
            navigate(`/teacher/dashboard/${user?.email}`);
            
        })
        .catch(er=>{
            console.error(er);
            setLoginError(er.message)
    
        })
      }
      const handleGoogleSubmit=()=>{
        providerLogin(createProvider)
        .then(result=>{
            const user=result.user;
        })
        .catch(err=>console.error(err));
    }
    return (
        <div className="h-[800px] flex justify-center items-center px-7">
        <div>
          <h2 className="text-center">Login</h2>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email"  className="input input-bordered w-full max-w-xs" {...register("email",{required:'Email address is required'})} />
              {errors.email && <p className="text-red-600">{errors.email?.message}</p>}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password"  className="input input-bordered w-full max-w-xs" {...register("password",{
                  required:'Password is required',
                  // minLength:{value:6, message:'Password must be 6 characters'}
          })} />
              {errors.password && <p className="text-red-600">{errors.password?.message}</p>}
              <label className="label">
                <span className="label-text">Forget Password?</span>
              </label>
            </div>
  
            
            <input className="btn btn-accent w-full" type="submit" value='LOGIN' />
            {loginError && <p className='text-red-600'>{loginError}</p>}
          </form>
          <p className="mt-4">Don't have an account yet?<Link className="text-secondary" to='/teacher/signUp'>Create New Account</Link></p>
          <div className="divider">OR</div>
          <button onClick={handleGoogleSubmit} className="btn btn-outline w-full"><FaGoogle className='mr-4 w-6 h-12'></FaGoogle>CONTINUE WITH GOOGLE</button>
        </div>
      </div>
    );
};

export default TeacherLogin;