import React, { useState } from "react";
import axios from "axios"

export default function SignUp(props) {
        
    const useFormInput = initialValue => {
        const [value, setValue] = useState(initialValue);
       
        const handleChange = e => {
          setValue(e.target.value);
        }
        return {
          value,
          onChange: handleChange
        }
      }

        const [ loading, setLoading ] = useState(false);
        const name = useFormInput('');
        const email = useFormInput('');
        const contactno = useFormInput('');
        const password = useFormInput('');
        const [error, setError] = useState(null);

        const handleSignup = () => {
            setError(null);
            setLoading(true);
            axios.post('http://localhost:8080/api/v1/register', { name : name.value, email : email.value , phone : contactno.value , password: password.value }).then(response => {
              setLoading(false);
              console.log("executed")
              props.history.push('/sign-in');
            }).catch(error => {
              setLoading(false);
              setError("Something went wrong. Please try again later.");
            });
          }

        return (
            <form>
                <h3>Register</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="First name" {...name} autoComplete="name"/>
                </div>

                

                <div className="form-group">
                    <label>Phoneno</label>
                    <input type="text" className="form-control" placeholder="Phoneno"  {...contactno} autoComplete="Contactno"/>
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email"  {...email} autoComplete="Email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password"  {...password} autoComplete="password" />
                </div>
                 
                {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br /> 
                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick = {handleSignup}>Register</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">log in?</a>
                </p>
            </form>
        );
    }
