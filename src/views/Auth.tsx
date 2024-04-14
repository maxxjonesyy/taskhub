import { useState } from "react";
import { Login, Register } from "../components/index";

function Auth() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div className='h-screen flex items-center justify-between'>
      <div className='hidden w-2/3 h-full lg:flex flex-col justify-center items-center text-center gap-5 p-5 bg-background-dark'>
        <h1 className='text-6xl font-bold text-accent-red'>Taskhub</h1>
        <p className='text-lg font-medium'>
          Where chaos meets order and productivity thrives.
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
