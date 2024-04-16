import { useState } from "react";
import { Login, Register } from "../components/index";

function Auth() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div className='h-screen flex flex-col gap-10 items-center justify-center lg:flex-row lg:justify-between'>
      <div className='bg-transparent flex-col text-center gap-5 p-5 lg:flex lg:h-full lg:w-2/3 lg:justify-center lg:bg-background-dark'>
        <h1 className='text-6xl font-bold text-accent-red mb-3'>Taskhub</h1>
        <p className='text-base lg:text-lg'>
          Simplifying task management, one click at a time.
        </p>
      </div>

      {isLogin ? (
        <Login setIsLogin={setIsLogin} />
      ) : (
        <Register setIsLogin={setIsLogin} />
      )}
    </div>
  );
}

export default Auth;
