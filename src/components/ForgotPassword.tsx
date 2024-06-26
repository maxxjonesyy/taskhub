import { useEffect, useState } from "react";
import { renderAlert } from "../utils";
import { PulseLoader } from "react-spinners";
import { PasswordInput } from "../components/index";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [verifiedEmail, setVerifiedEmail] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [code, setCode] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [sentEmail, setSentEmail] = useState<boolean>(false);

  async function verifyEmailExists(email: string): Promise<number> {
    const response = await axios.post("/auth/verify-email", {
      email,
    });
    return response.status;
  }

  const handleResetCode = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("/auth/send-reset-code", {
        email,
      });

      if (response.status === 200) {
        renderAlert("success", response.data.message);
        setSentEmail(true);
        setVerifiedEmail(false);
      }
    } catch (error: any) {
      renderAlert("error", error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);

    const convertedCode = Number(code);

    if (isNaN(convertedCode)) {
      renderAlert("error", "Code must be a number");
      return;
    }

    try {
      const response = await axios.post("/auth/reset-password", {
        code: convertedCode,
        password: newPassword,
      });

      if (response.status === 200) {
        renderAlert("success", "Your new password has been set");
        setCode("");
        setNewPassword("");
      } else renderAlert("error", response.data.message);
    } catch (error) {
      renderAlert(
        "error",
        "An error occurred while resetting your password, try something stronger"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!email) return;

    const timer = setTimeout(async () => {
      try {
        const status = await verifyEmailExists(email);
        status === 200 ? setVerifiedEmail(true) : setVerifiedEmail(false);
      } catch (error) {
        if (error) setVerifiedEmail(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [email]);

  return (
    <div className='w-full'>
      <form className='w-[350px] flex flex-col justify-center mx-auto gap-6'>
        <h2 className='text-3xl font-bold mb-2'>Reset Password</h2>

        {!sentEmail && (
          <input
            className='bg-transparent border border-secondary rounded-md p-3 placeholder:secondary'
            type='email'
            placeholder='Email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        )}

        {sentEmail && (
          <div>
            <input
              className='w-full mb-6 bg-transparent border border-secondary rounded-md p-3 placeholder:secondary'
              type='string'
              placeholder='Code'
              value={code}
              onChange={(event) => setCode(event.target.value)}
              maxLength={4}
              required
            />

            <PasswordInput
              password={newPassword}
              setPassword={setNewPassword}
              placeholder='New password'
            />

            <button
              onClick={(event) => resetPassword(event)}
              className='w-full mt-6 bg-accent font-medium rounded-md p-2.5 shadow-lg transition-transform hover:scale-10'>
              {isLoading ? (
                <PulseLoader color='#FFFFFF' size={10} />
              ) : (
                "Save new password"
              )}
            </button>
          </div>
        )}

        {verifiedEmail && !sentEmail && (
          <button
            onClick={(event) => handleResetCode(event)}
            className='bg-accent font-medium rounded-md p-2.5 shadow-lg transition-transform hover:scale-10'>
            {isLoading ? (
              <PulseLoader color='#FFFFFF' size={10} />
            ) : (
              "Recover password"
            )}
          </button>
        )}

        <button
          onClick={() => window.location.reload()}
          className='bg-transparent border border-secondary rounded-md p-3 font-medium shadow-lg transition-transform hover:scale-105'>
          Back to Login
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
