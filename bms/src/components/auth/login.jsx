import React, { useState } from 'react';
import './login.css'; // Assuming you move your CSS into App.css
import { useNavigate } from 'react-router-dom';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('black');
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:8080/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        });
    
        const data = await response.json();
        if (data.success) {
            setMessage(data.message);
            setMessageColor('green');
            console.log("yes");
            navigate('/home');
        } else {
            setMessage(data.message);
            setMessageColor('red');
            console.log("no");
            alert("incorrect details");
        }
    };
    
    return (
        <div className="App">
            <div style={{ textAlign: 'center' }}>
                <h1>Kongu Engineering College</h1>
                <h2>Bus Tracking System</h2>
                <h3>Login Form</h3>
            </div>
            <div id="message" style={{ color: messageColor, textAlign: 'center', fontWeight: 'bold', marginTop: '20px' }}>
                {message}
            </div>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '20px auto', background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                <button
                    type="submit"
                    style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', marginTop: '20px', cursor: 'pointer' }}
                >
                    Login / Signup
                </button>
            </form>
        </div>
    );
}

export default Login;