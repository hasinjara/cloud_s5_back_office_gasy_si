import React from 'react';
import PropTypes from 'prop-types';
import './css/inputPlus.css';


const InputPlus = ({ label, name, placeholder, type }) => {
    return (
        <div>
            <label style={{ color: 'grey' }}>{label}</label>
            <input name={name} placeholder={placeholder} type={type} style={{ border: '1px solid silver' }} />
            <br/>
        </div>
    );
};

// Définition des types attendus pour les propriétés du composant
InputPlus.propTypes = {
    label: PropTypes.string.isRequired,
    name : PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default InputPlus;