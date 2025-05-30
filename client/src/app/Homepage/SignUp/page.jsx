"use client"
import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Page = () => {
    const { register, handleSubmit, setError, clearErrors, formState: { errors, isSubmitting } } = useForm();
    const router = useRouter();
        
    const [Client, setClient] = useState(0); 
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useEffect(() => {
        setClient(1);
    }, []);

    const togglePasswordVisibility = () => {   
        setIsPasswordVisible(!isPasswordVisible); 
    };

    const onSubmit = async (data) => {
         try {
             let response;
                let result;
                console.log(data);
        if (data.userOption === "patient") {
             response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/patient/signup`, data); 
             result = response.data;

             if (response.status === 201) {
                alert("Signed up Successfully");
                localStorage.setItem('token', result.token);
                localStorage.setItem('user', JSON.stringify(result.user));
                router.push('./SignIn');
            }
        }
        else if (data.userOption === "doctor") {
             response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctor/signup`, data); 
             result = response.data;

             if (response.status === 201) {
                alert("Signed up Successfully");
                localStorage.setItem('token', result.token);
                localStorage.setItem('user', JSON.stringify(result.user));
                router.push('./SignIn');
            }
        }
        else {
                    alert('Select appropriate Option');
                    return;
                }  
                console.log(result);   
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setError("existUser ", { message: error.response.data.error });
            } else {
                console.error(error);
                alert('An unexpected error occurred');
            }
        }
    }

    return (
        <div className="bg-[#FAF6E9] bg-cover bg-no-repeat h-screen flex justify-center items-center">
            <div className="w-full h-auto bg-[#FFFDF6] max-w-72 sm:max-w-sm py-6 sm:py-12 sm:px-6 mx-auto border rounded-lg shadow-lg">
                <div className="container flex items-baseline justify-center h-auto px-6 mx-auto">
                    <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
                        
                        <div className="flex items-center justify-center mt-6">
                            <a href="./SignIn" className="w-1/3 pb-2 text-black font-medium text-center capitalize border-b">
                                sign in
                            </a>
                            
                            <a href="./SignUp" className="w-1/3 pb-2 text-black font-medium text-center capitalize border-b-4 border-[#A0C878]">
                                sign up
                            </a>
                        </div>
                         
                        {errors.existUser  && <p className="text-sm mt-2 text-center text-red-400">{errors.existUser .message}</p>}

                        <div className="mt-4">
                            <select {...register("userOption", { required: "Please select an option" })}
                                className="block w-full px-4 py-2 border border-black rounded-lg bg-transparent focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 text-gray-800">
                                <option value="">Sign up as a</option>
                                <option value="patient">Patient</option>
                                <option value="doctor">Doctor</option>
                            </select>
                        </div>

                        <div className="mt-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-800">Username</label>
                            <input type="text" {...register("username", { required: 'Username is required' })} onChange={() => clearErrors('existUser ')}
                                className="block w-full text-gray-800 px-4 py-2 border border-black bg-transparent rounded-lg focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>
                        {errors.username && <p className="text-sm text-red-400">{errors.username.message}</p>}

                        <div className="mt-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm text-gray-800 font-medium">Password</label>
                                <span className="text-xs text-gray-800 font-medium  hover:underline" onClick={togglePasswordVisibility}>
                {isPasswordVisible?(<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"  fill="none">
    <path d="M19.439 15.439C20.3636 14.5212 21.0775 13.6091 21.544 12.955C21.848 12.5287 22 12.3155 22 12C22 11.6845 21.848 11.4713 21.544 11.045C20.1779 9.12944 16.6892 5 12 5C11.0922 5 10.2294 5.15476 9.41827 5.41827M6.74742 6.74742C4.73118 8.1072 3.24215 9.94266 2.45604 11.045C2.15201 11.4713 2 11.6845 2 12C2 12.3155 2.15201 12.5287 2.45604 12.955C3.8221 14.8706 7.31078 19 12 19C13.9908 19 15.7651 18.2557 17.2526 17.2526" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M9.85786 10C9.32783 10.53 9 11.2623 9 12.0711C9 13.6887 10.3113 15 11.9289 15C12.7377 15 13.47 14.6722 14 14.1421" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" />
    <path d="M3 3L21 21" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>) :
(<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"  fill="none">
    <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="currentColor" strokeWidth="1.5" />
</svg> )}
                 </span>
                            </div>

                            <input type={isPasswordVisible ? 'text' : 'password'} {...register("password", { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters long' } })} onChange={() => clearErrors('existUser ')}
                                className="block w-full border-black text-gray-800 px-4 py-2 bg-transparent border rounded-lg focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>
                        {errors.password && <p className="text-sm text-red-400">{errors.password.message}</p>}

                        <div className="mt-4">
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-800">Gender</label>
                            <select {...register("gender", { required: 'Gender is required' })}
                                className="block w-full px-4 py-2 border border-black rounded-lg bg-transparent focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 text-gray-800">
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        {errors.gender && <p className="text-sm text-red-400">{errors.gender.message}</p>}

                        <div className="mt-4">
                            <label htmlFor="age" className="block text-sm  font-medium text-gray-800">Age</label>
                            <input type="number" {...register("age", { min: { value: 1, message: 'Age must be at least 1' } })} onChange={() => clearErrors('existUser ')}
                                className="block w-full px-4 text-gray-800 py-2 border border-black bg-transparent rounded-lg focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>
                        {errors.age && <p className="text-sm text-red-400">{errors.age.message}</p>}

                        <div className="mt-8">
                            <button disabled={isSubmitting} className="w-full bg-[#A0C878] px-6 py-2.5 text-sm text-gray-800 font-medium tracking-wide hover:text-gray-800 capitalize transition-colors duration-300 transform border rounded-lg hover:bg-[#d0ebb5]  focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Page
