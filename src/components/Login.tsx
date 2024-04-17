import { useState, useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { sendFormData } from "../utils";

function Login({ setIsLogin }: { setIsLogin: Function }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useContext(AuthContext);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await sendFormData({
      endpoint: "/api/login",
      event,
      email,
      password,
      setEmail,
      setPassword,
      login,
    });
  }

  return (
    <div className='w-full'>
      <form
        onSubmit={handleLogin}
        className='w-[350px] flex flex-col justify-center mx-auto gap-6'>
        <div>
          <h2 className='text-3xl font-bold mb-2'>Login</h2>
          <p className='text-accent-grey'>Enter your details below to login</p>
        </div>

        <input
          className='bg-transparent border border-accent-grey rounded-md p-3 placeholder:accent-grey'
          type='email'
          placeholder='Email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <input
          className='bg-transparent border border-accent-grey rounded-md p-3 placeholder:accent-grey'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button className='bg-accent-red font-medium rounded-md p-2.5 shadow-lg transition-transform hover:scale-105'>
          Login
        </button>

        <button className='bg-transparent border border-accent-grey rounded-md p-3 font-medium shadow-lg transition-transform hover:scale-105'>
          Sign in with Google
        </button>

        <div className='flex justify-between'>
          <button
            className='underline'
            onClick={(event) => {
              event.preventDefault();
              setIsLogin(false);
            }}>
            Don't have an account?
          </button>

          <button className='underline'>Forgot Password?</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
