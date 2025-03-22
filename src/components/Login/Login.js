import React from "react";
import './LoginStyle.css'
import { useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, where, query } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const history = useHistory();
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg,setErrorMsg] = useState('')

    const handleLogin = async (e) => { 
        e.preventDefault();
        const dbRef = collection(db, 'managers_Accounts');
        const q1 = query(dbRef, where('userName', '==', usernameOrEmail), where('password', '==', password));
        const q2 = query(dbRef, where('email', '==', usernameOrEmail), where('password', '==', password));
        
        try {
            const snapshot1 = await getDocs(q1);
            const snapshot2 = await getDocs(q2);

            if (!snapshot1.empty || !snapshot2.empty) {
                console.log('Login is Done..');
                history.push('/SmartSuper-Market');
            } else {
                setErrorMsg('Check Your Username or Password.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return ( 
        <div className="contant">
            <div className="login">
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <div className="inbox-input">
                        <input 
                            type="text" 
                            id="usernameOrEmail" 
                            name="usernameOrEmail" 
                            required 
                            onChange={(e) => setUsernameOrEmail(e.target.value)} 
                        />
                        <label htmlFor="usernameOrEmail">Username or Email</label>
                    </div>
                    <div className="inbox-input">
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            required 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button type="submit">Login</button>
                    {errorMsg && <div className="error">{errorMsg}</div>}
                </form>
            </div>
        </div>
    );
};

export default Login;