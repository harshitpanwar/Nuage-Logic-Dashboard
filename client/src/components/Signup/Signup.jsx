import React, { useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { LOGIN_QUERY } from '../../graphql/queries/login';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SIGNUP_MUTATION } from '../../graphql/mutations/signup';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

//   const [loginUser, { loading, error, data }] = useLazyQuery(LOGIN_QUERY, {
//     onCompleted: (data) => {
//       if (data && data.login) {
//         login({
//           userId: data.login.userId,
//           token: data.login.token
//         });
//         navigate('/companies');
//       }
//     },
//     onError: (error) => {
//       console.error("Login error", error);
//     },
//   });
    const [signupUser, { loading, error}] = useMutation(SIGNUP_MUTATION, {
    onCompleted: (data) => {
        if (data && data.createUser) {
            
            navigate('/login');
        }
    },
        onError: (error) => {
    }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        signupUser({
            variables: {
                userInput: {
                    email,
                    password
                }
            }
        });
    };

    return (
        <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email:
                </label>
                <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password:
                </label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
                />
            </div>
            <div>
                <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                Sign Up
                </button>
            </div>
            </form>
            <p className="mt-4 text-center"> Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a></p>
            {loading && <p className="mt-4 text-center">Loading...</p>}
            {error && <p className="mt-4 text-center text-red-500">Error: {error.message}</p>}
        </div>
        </div>
    );
};

export default Signup;
