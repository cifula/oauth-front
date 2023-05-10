import axios from 'axios';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useSearchParams } from 'react-router-dom';

const OAuth2Register = () => {
    const [ passwords, setPasswords ] = useState({password: "", checkPassword: ""});
    const oauth2Register = useMutation(async (registerData) => {
        const option = {
            header: {
                registerToken: `Bearer ${registerToken}`
            }
        }
        return await axios.post("http://localhost:8080/auth/oauth2/register", registerData, option);
    });
    const [ searchParams, setSearchParams ] = useSearchParams();

    const registerToken = searchParams.get("registerToken");
    const email = searchParams.get("email");
    const name = searchParams.get("name");

    const passwordInputChangeHandle = (e) => {
        const { name, value } = e.target;
        setPasswords({...setPasswords, [name]: value})
    }

    const oauth2RegisterSubmitHandle = () => {
        oauth2Register.mutate({
            email,
            name,
            ...passwords
        });
    }

    return (
        <div>
            <input type="text" name='' value={email} disabled="true"/>
            <input type="text" name='' value={name} disabled="true"/>
            <input type="password" name='password' placeholder='비밀번호'
                onChange={passwordInputChangeHandle}/>
            <input type="password" name='checkPassword' placeholder='비밀번호확인'
                onChange={passwordInputChangeHandle}/>
            <button onClick={oauth2RegisterSubmitHandle}></button>
        </div>
    );
};

export default OAuth2Register;