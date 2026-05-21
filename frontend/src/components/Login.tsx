import {useState} from 'react';

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');   
    
    const handlechange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

    return(
        <div className="login-container">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={handlechange}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlechange}
            />
            <button onClick={handleSubmit}>Login</button>
        </div>
    )

}

export default Login;