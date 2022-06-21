import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const inputStyle = {
    width: '250px',
    border: '1px solid #DCDCDC',
    borderRadius: 4,
    height: 35,
    marginBottom: 16

}

const Signup = () => {

    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [disableButton, setDisableButton] = useState(false);
    let { firstName, lastName, email, password } = formData;

    const history = useHistory();

    const onTextChange = e => {
        let formDataCopy = { ...formData };
        formDataCopy[e.target.name] = e.target.value;
        setFormData(formDataCopy);
    }

    const onFormSubmit = async e => {
        setDisableButton(true);
        e.preventDefault();
        await axios.post('/api/account/signup', formData);
        setDisableButton(false)
        history.push('/');
    }

    return (
        <div style={{ border: '1px solid #DCDCDC', padding: 16, width: 'fit-content', marginLeft: 425, marginTop: 86 }}>
            <div style={{ fontWeight: 'bold', marginBottom: 16 }}>Create Account</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <input style={inputStyle} type="text" name="firstName" placeholder="First Name" value={firstName} onChange={onTextChange} />
                <input style={inputStyle} onChange={onTextChange} type="text" name="lastName" placeholder="Last Name" value={lastName} />
                <input style={inputStyle} onChange={onTextChange} type="text" name="email" placeholder="Email" value={email} />
                <input style={inputStyle} onChange={onTextChange} type="password" name="password" placeholder="Password" value={password} />
                <button disabled={disableButton} onClick={(e) => onFormSubmit(e)} className="btn btn-primary">Signup</button>
            </div>
        </div>
    )
}
export default Signup;