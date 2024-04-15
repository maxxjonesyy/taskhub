import { useState } from "react";
import { sendFormData } from "../utils";

function Register({ setIsLogin }: { setIsLogin: Function }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await sendFormData({
      endpoint: "/api/register",
      event,
      email,
      password,
      setEmail,
      setPassword,
    });
  }

  return (
    <div className='w-full'>
      <form
        onSubmit={handleSubmit}
        className='w-[350px] flex flex-col justify-center mx-auto gap-6'>
        <div>
          <h2 className='text-3xl font-bold mb-2'>Register</h2>
          <p className='text-accent-grey'>
            Enter your details below to create an account
          </p>
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
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button className='bg-accent-red font-medium rounded-md p-2.5 shadow-lg transition-transform hover:scale-105'>
          Register
        </button>

        <button
          className='underline'
          onClick={(event) => {
            event.preventDefault();
            setIsLogin(true);
          }}>
          Already have an account?
        </button>
      </form>
    </div>
  );
}

export default Register;
