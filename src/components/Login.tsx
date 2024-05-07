import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const style = {
    outerScreen: 'mx-auto bg-gradient-to-r from-purple-500 to-indigo-600 h-screen flex flex-cols justify-center items-center',
    box: 'w-[387px] h-[457px] shadow-xl bg-white rounded-md mx-auto',
    formContainer: 'p-8',
    input: 'w-full mb-4 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500',
    button: 'w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600',
};

const Login: React.FC<{ setToken: (token: string) => void }> = ({ setToken }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (username.length === 0) {
            alert("Username cannot be blank!");
        } else if (password.length === 0) {
            alert("Password cannot be blank!");
        } else {
            // Send data to backend
            const userData = {
                username: username,
                password: password
            };
            fetch('http://127.0.0.1:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
                .then(resp => resp.json())
                .then(data => {
                    console.log(data);
                    if (data.token) {
                        alert("User logged in successfully"); // Show successful login alert
                        navigate('/todo');
                    } else {
                        alert("Login failed"); // Show login failed alert
                    }
                })
                .catch(error => {
                    console.error('Error sending data to backend:', error);
                });
        }
    };
    return (
        <div className="w-full mt-8">
            <div className={style.outerScreen}>
                <div className={style.box}>
                    <div className={style.formContainer}>
                        <div className='flex flex-col justify-center items-center text-center mb-4'>
                            <h1 className='text-black font-bold text-3xl mb-3'>T O D O</h1>
                            <p className='mb-7 text-xs text-indigo-700'>Your perfect task manager! </p>
                            <h2 className="text-lg font-semibold mb-4 text-purple-400">Login</h2>
                        </div>
                        <form onSubmit={submit}>
                            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className={style.input} required />
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={style.input} required />
                            <button type="submit" className={style.button}>Login</button>
                        </form>
                        <hr className="my-4" />
                        <p className='text-xs text-gray-500 flex justify-center '>Create an account | <Link to="/signup"><span className='font-bold text-purple-900'>Signup</span></Link></p>
                        <p className='text-xs text-gray-700 flex justify-center underline mt-4'><Link to='/todo'>checkout Task Page</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
