import React from 'react';
import { AuthForm } from '../components';

const Login = (): React.ReactElement => {
  return (
    <div className='flex items-center justify-center h-screen bg-fixed bg-center bg-cover bg-hero-pattern '>
      <div className='flex flex-col justify-center px-12 py-10 bg-gray-900 backdrop-blur bg-opacity-70 backdrop-filter'>
        <div className='h-12 font-bold text-center'>
          <h1 className='text-white'>Task</h1>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default Login;
