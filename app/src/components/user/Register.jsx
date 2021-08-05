import React,{ useRef,useState} from 'react'
import axios from 'axios'

import  './register.css'
import {Cancel} from '@material-ui/icons'

const Register = ({ setShowRegister }) => {
    const [success , setSuccess] =useState(null)
    const [error , setError] = useState(null)
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();


    const handleSubmit = async(e)=>{
        e.preventDefault()
        const newUser = {
            username : nameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value
        }
        try {
           axios.post('/register',newUser);
           setSuccess(true)
        } catch (error) {
            setError(true)
        }
       
        setTimeout(() => {
            setShowRegister(false)
        }, 2000);
        
    }

    return (
    <div className="bg">
        <div className="registerContainer">
            <div className="logo">
                <img src="/images/logo.png" alt="logo"  />
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" ref={nameRef}/>
                <input type="email" placeholder="Email" ref={emailRef} />
                <input type="password" placeholder="Password"  ref={passwordRef}/>
                <button type="submit">Register</button>
                {success && (<span className="success">Success, you can login</span>) }
                {error && (<span className="error">Something went wrong</span>)}
            </form>
            <Cancel
                className="registerCancel"
                onClick={() => setShowRegister(false)}
            />

        </div>
        
    </div>
    )
}

export default Register
