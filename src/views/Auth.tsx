import { useState } from "react";
import { Login, Register } from "../components/index";

function Auth() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div className='min-h-screen max-w-[600px] mx-auto flex flex-col justify-center py-5 bg-gradient-to-b from-background-primary via-background-secondary to-background-primary'>
      <img
        className='mx-auto mb-20'
        width={300}
        src='src/assets/logo.svg'
        alt='Taskhub logo'
      />

      {isLogin ? (
        <Login setIsLogin={setIsLogin} />
      ) : (
        <Register setIsLogin={setIsLogin} />
      )}
    </div>
  );
}

export default Auth;
