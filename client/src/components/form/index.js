import './styles.css';
import React, { useState, useContext, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { config } from '../../App';


const schema = yup.object().shape({
    name: yup.string().min(3, 'Name must be at least 5 characters').required('Name is required'),
    description: yup.string().min(10, 'Description must be at least 10 characters').required('Content is required'),
    size: yup.string().min(5, "Size must be at least 5 characters").required('Size is required')
});

const Form = ({ setProperty }) => {


    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(schema)
    });

    // const id = uuidv4();

    const saveData = async (data) => {
        try {
            const response = await axios.post(`${config.baseUrl}/user/create`, data);
            console.log(response);
            toast.success('New property added successfully!');
        }
        catch (err) {
            console.log(err);
            toast.error('Property creation failed');
        }
    }

    const submitForm = (data) => {
        // toast.success('New property added successfully!');
        console.log(data)
        setProperty((prevProperty) => (
            [
                ...prevProperty,
                {
                    ...data,
                    // id,
                }
            ]
        ))

        saveData({...data})
    }

    
    return (
        <div className="form-container">
            <div className="form">
                <div className="form-header">
                    <h2>Add New Property</h2>
                </div>
                <form className="form-body" onSubmit={handleSubmit(submitForm)}>
                    {/* <input
                        type="text"
                        value={id}
                        disabled
                    /> */}
                    <input 
                        placeholder='Enter property name..'
                        {...register("name")}
                    />
                    {errors.name && <p className="error">{errors.name.message}</p>}
                    <input
                        placeholder='Enter description..'
                        {...register("description")}
                    />
                    {errors.description && <p className="error">{errors.description.message}</p>}
                    <input
                        placeholder='Enter size..'
                        {...register("size")}
                    />
                    {errors.size && <p className="error">{errors.size.message}</p>}
                    
                    <div className="form-footer">
                        <input
                            className='submit-btn'
                            type="submit"
                            placeholder='Add'
                        />
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Form;