import { useState, useContext } from "react";
import { PasswordInput } from "../../components/index";
import { ForgotPassword } from "../../components/index";
import { AuthContext } from "../../context/AuthContext";
import { renderAlert } from "../../utils";
import { PulseLoader } from "react-spinners";
import axios from "axios";

interface Props {
  setIsLogin: Function;
}

function Login({ setIsLogin }: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordComponent, setPasswordComponent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { login } = useContext(AuthContext);

  async function handleLogin(event: any): Promise<void> {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { message, user } = response.data;

        if (response.status === 200) {
          renderAlert("success", message);
          login(user);

          setEmail("");
          setPassword("");
        }
      }
    } catch (error: any) {
      if (error.response) {
        renderAlert("error", `Error logging in: ${error.response.data.error}`);
      } else renderAlert("error", `Error logging in: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  return !passwordComponent ? (
    <div className='w-full'>
      <form
        onSubmit={(event: any) => handleLogin(event)}
        className='w-[350px] flex flex-col justify-center mx-auto gap-6'>
        <div>
          <h2 className='text-3xl font-bold mb-2'>Login</h2>
          <p className='text-secondary'>Enter your details below to login</p>
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
          {isLoading ? <PulseLoader color='#FFFFFF' size={10} /> : "Login"}
        </button>

        <div className='flex justify-between'>
          <button
            className='underline text-secondary'
            onClick={(event) => {
              event.preventDefault();
              setIsLogin(false);
            }}>
            Don't have an account?
          </button>

          <button
            className='underline text-secondary'
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
