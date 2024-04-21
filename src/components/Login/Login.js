import React from "react";
import './LoginStyle.css'
import { useState } from "react";
import { db } from "../../Config/firebase";
import { collection, getDocs, where, query } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg,setErrorMsg] = useState('')

    const handleLogin = async (e) => { 
        e.preventDefault();
        const dbRef = collection(db, 'managers_Accounts');
        const q = query(dbRef, where('userName', '==', username),
            where('email', '==', email),
            where('password', '==', password));
        try {
            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
                console.log('Login is Done..');
                history.push('/SmartSuper-Market/Home');
            }
            else {
                setUsername('');
                setPassword('');
                setEmail('')
                setErrorMsg('Check Your Username or Password.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };
    

    return ( 
        <div className="contant">
            <div className="login">
            <form  onSubmit={handleLogin}>
            <h1>Login</h1>
                    <div className="inbox-input">
                        <input type="text" id="username" name="username"  required onChange={(e) => setUsername(e.target.value)} />
                        <label htmlFor="username">Username</label>
                        
                    </div>
                    <div className="inbox-input">
                        
                        <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="inbox-input">
                        
                        <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button type="submit">Login</button>
                    {errorMsg &&<div className="error">{errorMsg}</div>}
                </form>
            </div>
        </div>
        
    );
};

export default Login;





