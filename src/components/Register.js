import { useState } from "react"
import React from 'react'
import axios from "axios";
import env from "react-dotenv";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [messages, setMessages] = useState([]);

    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();
        try {
            await axios.post(env.API_URL+'/api/users/register', {
                name,
                email,
                password,
                confirmPassword
            });
            navigate('/');
        } catch (error) {
            if(error.response){
                setMessages(error.response.data.message);
            }
        }
    }
    
    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
        <div className="hero-body">
            <div className="container">
            <div className="columns is-centered">
                <div className="column is-4-desktop">
                    <form onSubmit={register} className='box'>
                        <div class='list is-hoverable'>
                            <ul>
                            {    
                                messages.map((message, index) => (
                                    <div class='list-item has-background-danger has-text-black py-2 my-2 box'>
                                        <li>{message}</li>
                                    </div>
                                ))
                            }
                            </ul>
                        </div>
                        <div className="field mt-5">
                            <label className="label">Name</label>
                            <div className="controls">
                                <input type="text" className="input" placeholder='Name'
                                value={name} onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field mt-5">
                            <label className="label">Email</label>
                            <div className="controls">
                                <input type="text" className="input" placeholder='Username'
                                value={email} onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field mt-5">
                            <label className="label">Password</label>
                            <div className="controls">
                                <input type="password" className="input" placeholder='*******'
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field mt-5">
                            <label className="label">Confirm Password</label>
                            <div className="controls">
                                <input type="password" className="input" placeholder='*******'
                                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field mt-5">
                            <button className="button is-success is-fullwidth">Register</button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </div>
        </section>
    )
}

export default Register