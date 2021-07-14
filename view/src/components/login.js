import React, { useState } from "react";
import axios from 'axios'
import { setUserSession } from '../Utils/Common'

export default function Login(props){
        
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
        const useremail = useFormInput('');
        const password = useFormInput('');
        const [error, setError] = useState(null);

        const handleLogin = () => {
            setError(null);
            setLoading(true);
            axios.post('https://habit-builder-api.herokuapp.com/api/v1/login', { email: useremail.value, password: password.value }).then(response => {
              setLoading(false);
              setUserSession(response.data.token, response.data.user);
              props.history.push('/home');
            }).catch(error => {
              setLoading(false);
              setError("Something went wrong. Please try again later.");
            });
          }
        return (
            <>
            <form>

                <h3>Log in</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" {...useremail} autoComplete="new-password" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" {...password} autoComplete="new-password"/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br /> 
                <button type="submit" className="btn btn-dark btn-lg btn-block" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading}>Sign in</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
            </>
        );
    }
    