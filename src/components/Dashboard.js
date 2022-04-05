import React, {useState, useEffect} from 'react'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import env from "react-dotenv";

const Dashboard = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        refreshToken();
        getUsers();
    }, [])

    const refreshToken = async () => {
        try {
            const response  = await axios.get(env.API_URL+'/api/users/token');
            setToken(response.data.token);
            const decode = jwt_decode(response.data.token);
            setName(decode.name);
            setExpire(decode.exp);
            
        } catch (error) {
            if(error.response){
                navigate('/');
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if(expire * 1000 < currentDate.getTime()){
            const response = await axios.get(env.API_URL+'/api/users/token');
            config.headers.Authorization = `Bearer ${response.data.token}`;
            setToken(response.data.token);
            const decode = jwt_decode(response.data.token);
            setName(decode.name);
            setExpire(decode.exp);
        }
        return config
    }, (error) => {
        return Promise.reject(error)
    });

    const getUsers = async () => {
        const response  = await axiosJWT.get(env.API_URL+'/api/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(response.data);
    }

    return (
        <div className="container mt-5">
            <h1> Wellcome back: {name}</h1>
            <button onClick={getUsers} className="button is-info">
                Get Users
            </button>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    { users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    )) }
                    
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard