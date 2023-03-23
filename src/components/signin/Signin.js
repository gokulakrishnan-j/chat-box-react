import React from 'react'
import {useFormik} from 'formik';
import * as yup from 'yup';
import { API } from '../../global/Connect';
import { useNavigate } from 'react-router-dom';
import './Signin.css'

 /* login component */

  /* validating with formik and yup.js */
const formValidationSchema = yup.object({
    username:yup
    .string()
    .required("Why not fill this username"),
  
    password:yup
    .string()
    .min(8,"your password must be more then 7 characters")
    .max(15,"your password must less then 16 characters")
    .required("Why not fill this password"),

  })

function Signin() {

    const navigate = useNavigate()
       
        
    const {handleSubmit,handleBlur,handleChange,touched,errors}=useFormik({
      initialValues:{
        username:"",
        password:"",
      },
      validationSchema : formValidationSchema,
   /* onSubmit will return a object  */
      onSubmit:(values)=>{
        
        loginUser(values)
      }
      
    })


    const loginUser = (data)=>{
       /* posting login details */
        fetch(`${API}/user/login`,{
          method:"POST",
          body:JSON.stringify(data),
          headers:{"Content-Type":"application/json"}
        })
         /* condition rendering- if ok is true it will navigate to listofgroup or if ok is false it will show alert box message */
        .then((login)=>login.ok ? navigate(`/user/${data.username}`) : alert("wrong username or password"))
        
      } 


  return (
    <div className='signup'>
         {/* onSubmit attribute will handle submit */}
         <form onSubmit={handleSubmit}>
          <div>
      <label htmlFor='Username'>Username</label>
      </div>
        <input id='Username' 
       /* name attribute is use to identifi what input is it */
        name='username' 
         /* onChange attribute will handle changes */
        onChange={handleChange}
         /* onBlur attributre will return boolean value when we touch a input box it will become return true  */
        onBlur={handleBlur}
         /* type attribute is use to tell what kind of type. */
        type="text"
         /* placeholder attribute  */
        placeholder='Username'
        className='inputForSignupAndSignin'/>
        {/* condition rendering - validating if touched.username and errors.username become true it will show error validation */}
<div className='notFillError'>{touched.username && errors.username ? errors.username:null}</div>

       <div> <label htmlFor='password'>Password</label></div>
        <input id='password' 
        name='password' 
        onChange={handleChange}
        onBlur={handleBlur}
        type="password"
        placeholder='password'
        className='inputForSignupAndSignin'/>
<div className='notFillError'>{touched.password && errors.password ? errors.password:null} </div>

        <button type='submit' className='siginButton' >Login</button>
        </form>

{/* if we not sign up it will navigate to signup component */}
        <p >Don't have an account?<span className='notHavingAcc' onClick={()=>navigate('/user/signup')}>Signup</span></p>
    </div>
  )
}

export default Signin