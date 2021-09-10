import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { CreateTaskForm, Tasks } from '../components';

const Home: NextPage = () => {
  const [isSignedIn, setSignedIn] = useState(false);
  const router = useRouter();

  return (
    <div>
      <>
        {/* <button>Log Out</button> */}
        <div className='flex flex-col justify-center text-center'>
          <h1 className='mt-3 font-extrabold'>Task</h1>
          <CreateTaskForm />
          <h2 className='mt-6 mb-6 font-semibold'>Your Tasks</h2>
          <Tasks />
        </div>
      </>
    </div>
  );
};

export default Home;
