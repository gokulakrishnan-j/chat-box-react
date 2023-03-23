import React from 'react'
import {useFormik} from 'formik';
import * as yup from 'yup';
import { API } from '../../global/Connect';
import { useNavigate } from 'react-router-dom';
import './signup.css'


/* signup component */

  /* validating with formik and yup.js  */
  const formValidationSchema = yup.object({
    username:yup
    .string()
    .required("Why not fill this username"),
  
    password:yup
    .string()
    .min(8,"your password must be more then 7 characters")
    .max(15,"your password must less then 16 characters")
    .required("Why not fill this password"),
  
    email:yup
    .string()
    .min(5,"your password must be more then 7 characters")
    .required("Why not fill this email")
  })

function Signup() {

    const navigate = useNavigate()

  
    const {handleSubmit,handleBlur,handleChange,touched,errors}=useFormik({
      initialValues:{
        username:"",
        password:"",
        email:""
      },
      validationSchema : formValidationSchema,
  /* onSubmit will return a object  */
      onSubmit:(values)=>{
        signupUser(values)
        
      }
      
    })
    
   
  /* making API request to post a signup details  */
   const signupUser = (data)=>{
      fetch(`${API}/user/signup`,{
        method:"POST",
        body:JSON.stringify(data),
        headers:{"Content-Type":"application/json"}
      })
      /* navigating to login component */
      .then(()=>navigate("/user/signin"))
    } 

  return (
    <div className='signup'>
        {/* onSubmit attribute will handle submit */}
      <form onSubmit={handleSubmit} className='formForSignup'>
        <div>
          <div>
      <label htmlFor='Username'>Username</label></div>
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
</div>
<div>
       <div> <label htmlFor='password'>Password</label></div>
        <input id='password' 
        name='password' 
        onChange={handleChange}
        onBlur={handleBlur}
        type="password"
        placeholder='password'
        className='inputForSignupAndSignin'/>
<div className='notFillError'>{touched.password && errors.password ? errors.password:null}</div>
</div>
<div>
       <div> <label htmlFor='email'>Email</label></div>
        <input id='email'
        name='email' 
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        placeholder='email' 
        className='inputForSignupAndSignin'/>
<div className='notFillError'>{touched.email && errors.email ? errors.email:null}</div>
</div>
        <button type='submit' className='sigupButton' >Singup</button>
        </form>
        <div>
          <p >Already have an account?  <span className='havingAcc' onClick={()=>navigate('/user/signin')}>Signin</span></p>
        </div>
    </div>
  )
}

export default Signup