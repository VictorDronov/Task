import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Realm from 'realm-web';
import { realmApp } from '../../lib/realm';

interface LoginForm {
  email: string;
  password: string;
}

const SignInForm = (): React.ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: { email: '', password: '' },
  });
  const [error, setCustomError] = useState('');
  const [signUp, setSignUp] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      if (signUp) {
        await realmApp.emailPasswordAuth.registerUser(
          data.email,
          data.password
        );

        const credentials = Realm.Credentials.emailPassword(
          data.email,
          data.password
        );

        const user: Realm.User = await realmApp.logIn(credentials);

        console.log(user);
      } else {
        const credentials = Realm.Credentials.emailPassword(
          data.email,
          data.password
        );

        const user: Realm.User = await realmApp.logIn(credentials);
      }
    } catch (err) {
      console.log(err);
    }

    // async function loginEmailPassword(email: string, password: string) {
    //   const credentials = Realm.Credentials.emailPassword(email, password);
    //   try {
    //     const user: Realm.User = await app.logIn(credentials);
    //     // `App.currentUser` updates to match the logged in user
    //     console.log(user);
    //     return user;
    //   } catch (err) {
    //     console.error("Failed to log in", err);
    //   }
    // }
    // loginEmailPassword(data.email, data.password).then((user) => {
    //   if (user) {
    //     localStorage.setItem("Token", `${Math.random()}`);
    //     router.push("/");
    //   } else {
    //     setCustomError("Invalid email or password.");
    //   }
    // });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className='h-3 '>
          {error && <p className='text-red-600'>{error}</p>}
        </p>
        <label className='flex flex-col'>
          Email: &nbsp;
          <input
            type='email'
            {...register('email', {
              required: 'Please enter your email.',
            })}
          />
          <p className='h-3'>
            {errors.email && (
              <p className='text-red-600'>{errors.email.message}</p>
            )}
          </p>
        </label>
        <label className='flex flex-col'>
          Password: &nbsp;
          <input
            type='password'
            {...register('password', {
              required: 'Please enter your password.',
            })}
          />
          <p className='h-3'>
            {errors.password && (
              <p className='text-red-600'>{errors.password.message}</p>
            )}
          </p>
        </label>
        {signUp && (
          <label className='flex flex-col'>
            Confirm Password:
            <input />
            <p className='h-3'>
              {errors.password && (
                <p className='text-red-600'>{errors.password.message}</p>
              )}
            </p>
          </label>
        )}
        {/* className="pb-1 leading-loose button" */}
        <button type='submit'>{!signUp ? 'Sign In' : 'Sign Up'}</button>
        {!signUp ? (
          <p className='mt-4 font-bold'>
            Don&apos;t have an account? &nbsp;
            <a
              className='cursor-pointer text-brand-secondary'
              onClick={() => setSignUp(true)}
            >
              Sign Up
            </a>
          </p>
        ) : (
          <p className='mt-4 font-bold'>
            Already have an account? &nbsp;
            <a
              className='cursor-pointer text-brand-secondary'
              onClick={() => setSignUp(false)}
            >
              Sign In
            </a>
          </p>
        )}
      </form>
    </>
  );
};

export default SignInForm;
