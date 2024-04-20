import { useState, useContext } from "react";
import axios from "axios";

import { ForgotPassword } from "./index";
import { AuthContext } from "../context/AuthContext";
import { renderAlert } from "../utils";

function Login({ setIsLogin }: { setIsLogin: Function }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordComponent, setPasswordComponent] = useState<boolean>(false);
  const { login } = useContext(AuthContext);

  async function handleLogin(event: any): Promise<void> {
    event.preventDefault();

    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { message, data } = response.data;

        if (response.status === 200) {
          const token = data;
          renderAlert("success", message);
          if (login) login(token);

          setEmail("");
          setPassword("");
        }
      }
    } catch (error: any) {
      renderAlert("error", error.response.data.error);
    }
  }

  return !passwordComponent ? (
    <div className='w-full'>
      <form
        onSubmit={(event: any) => handleLogin(event)}
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

          <button
            className='underline'
            onClick={() => setPasswordComponent(true)}>
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  ) : (
    <ForgotPassword />
  );
}

export default Login;
