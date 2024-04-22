import { useState } from "react";
import axios from "axios";
import { renderAlert } from "../utils";
import { PulseLoader } from "react-spinners";
import { PasswordInput } from "../components/index";

function Register({ setIsLogin }: { setIsLogin: Function }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleRegister(event: any): Promise<void> {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("/auth/register", {
        email,
        password,
      });

      if (response.status === 200) {
        const { message } = response.data;

        if (message) {
          renderAlert("success", message);
        }

        setEmail("");
        setPassword("");
      }
    } catch (error: any) {
      renderAlert("error", error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='w-full'>
      <form
        onSubmit={handleRegister}
        className='w-[350px] flex flex-col justify-center mx-auto gap-6'>
        <div>
          <h2 className='text-3xl font-bold mb-2'>Register</h2>
          <p className='text-secondary'>
            Enter your details below to create an account
          </p>
        </div>

        <input
          className='bg-transparent border border-secondary rounded-md p-3 placeholder:secondary'
          type='email'
          placeholder='Email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <PasswordInput
          password={password}
          setPassword={setPassword}
          placeholder='Password'
        />

        <button className='bg-accent font-medium rounded-md p-2.5 shadow-lg transition-transform hover:scale-105'>
          {isLoading ? <PulseLoader color='#FFFFFF' size={10} /> : "Register"}
        </button>

        <button
          className='underline text-secondary'
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
