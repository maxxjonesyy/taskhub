import { useState } from "react";
import { Login, Register } from "../components/index";

function Auth() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div className='min-h-screen max-w-[600px] mx-auto grid py-5 bg-gradient-to-b from-background-primary via-background-secondary to-background-primary'>
      <img
        className='mx-auto mb-16'
        width={350}
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
