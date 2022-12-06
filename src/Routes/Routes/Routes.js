import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import Student from "../../layout/Student";
import Teacher from "../../layout/Teacher";
import TeacherDashboardLayout from "../../layout/TeacherDashboardLayout";
import Home from "../../Page/Home/Home";
import StudentDashBoard from "../../Page/Student/StudentDashBoard/StudentDashBoard";
import StudentLogin from "../../Page/Student/StudentLogin/StudentLogin";
import StudentSignUp from "../../Page/Student/StudentSignUp/StudentSignUp";
import ViewAllNotices from "../../Page/Student/ViewAllNotices/ViewAllNotices";
import CreateNotice from "../../Page/Teacher/CreateNotice/CreateNotice";
import TeacherDashboard from "../../Page/Teacher/TeacherDashboard/TeacherDashboard/TeacherDashboard";
import TeacherEditProfile from "../../Page/Teacher/TeacherEditProfile/TeacherEditProfile";
import TeacherLogin from "../../Page/Teacher/TeacherLogin/TeacherLogin";
import TeacherSignUp from "../../Page/Teacher/TeacherSignUp/TeacherSignUp";
import ViewMyNotices from "../../Page/Teacher/ViewMyNotices/ViewMyNotices";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router=createBrowserRouter([
    {
       path: '/',
       element:<Main></Main>,
       children:[
       {
        path:'/',
        element:<Home></Home>,
       },
       {
        path:'/student',
        element:<Student></Student>,
        children:[
          {
            path:'/student/login',
            element:<StudentLogin></StudentLogin>
          },
          {
            path:'/student/signUp',
            element:<StudentSignUp></StudentSignUp>
        },
        {
          path:'/student/dashboard/:email',
          element:<PrivateRoute><StudentDashBoard></StudentDashBoard></PrivateRoute>,
          loader:({params})=>fetch(`https://online-noticeboard-server.vercel.app/${params.email}`),
      },
      {
        path:'/student/viewNotices',
        element:<PrivateRoute><ViewAllNotices></ViewAllNotices></PrivateRoute>,
       
    },
        ]
       },
      
    {
        path:'/teacher',
        element:<Teacher></Teacher>,
        children:[
            {
              path:'/teacher/login',
              element:<TeacherLogin></TeacherLogin>
            },
            {
                path:'/teacher/signUp',
                element:<TeacherSignUp></TeacherSignUp>
            },
            {
                path:'/teacher/dashboard/:email',
                element:<PrivateRoute><TeacherDashboard></TeacherDashboard></PrivateRoute>,
                loader:({params})=>fetch(`https://online-noticeboard-server.vercel.app/${params.email}`),
            },
            {
                path:'/teacher/addNotice',
                element:<PrivateRoute><CreateNotice></CreateNotice></PrivateRoute>,
               
            },
            {
                path:'/teacher/viewNotices',
                element:<PrivateRoute><ViewMyNotices></ViewMyNotices></PrivateRoute>,
               
            },
            {
                path:'/teacher/editProfile',
                element:<TeacherEditProfile></TeacherEditProfile>,
               
            },
          ]
    }
      
       ]
    }
]);
export default router;