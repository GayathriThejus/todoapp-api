import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

const style = {
    outerScreen: 'mx-auto bg-gradient-to-r from-purple-500 to-rose-600 h-screen flex flex-cols justify-center items-center',
    box: 'w-[387px] h-[457px] shadow-xl bg-white rounded-md mx-auto',
    formContainer: 'p-8',
    input: 'w-full mb-4 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500',
    button: 'w-full bg-purple-300 text-white py-2 px-4 rounded-md hover:bg-indigo-600',
};

const Signup = () => {

    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
    });
    
    const handleInputChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    };
    const postData = async (e) => {
            e.preventDefault();
            console.log(userInfo)
        
            const url = 'http://127.0.0.1:8000/signup' 

    
            const response = await fetch(
                url, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin', 
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer', 
                    body: JSON.stringify({
                        "username": userInfo['username'],
                        "password": userInfo['password'],
                        
                    }) 
                });
                const responseData = await response.json();
                console.log(responseData); 
            response.json().then(responseData => {
                if (responseData.status === 'ok') {
                    alert("User signed in successfully")
                } else {
                    console.log(response.status);
                    alert("Failed to add user")
                }
            });
            setUserInfo({
               username:"",
               password:""
            })
        }

 
    return (
        <div className="w-full mt-8"> 
       
            <div className={style.outerScreen}>
                <div className={style.box}>
                    <div className={style.formContainer}>
                        <div className='flex flex-col justify-center items-center text-center mb-4'>
                            <h1 className='text-black font-bold text-3xl mb-3'>T O D O</h1>
                            <p className='mb-7 text-xs text-indigo-700'>Your perfect task manager! </p>
                            <h2 className="text-lg font-semibold mb-4 text-purple-400">Signup</h2>
                        </div>
                        <form onSubmit={postData}>
                        <input type="text" name="username" placeholder="UserName" value={userInfo.username} onChange={handleInputChange} className={style.input} required />
                        <input type="password" name="password" placeholder="Password" value={userInfo.password} onChange={handleInputChange} className={style.input} required />

                            <button type="submit" className={style.button}>Signup</button>
                        </form>
                        <hr className="my-4" />
                        <p className='text-xs text-gray-500 '>Already created an account or <Link to="/">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;