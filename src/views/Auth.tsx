import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Login, Register } from "../views/index";
import { auth, renderAlert } from "../utils";
import { logo } from "../assets/index";
import { PulseLoader } from "react-spinners";

function Auth() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const user = auth.getUser();

  async function initiateAuthFlow() {
    if (!user.token) return;

    try {
      setIsLoading(true);
      const isVerified = await auth.verifyToken();

      if (!isVerified) {
        return renderAlert(
          "error",
          "Your access token has expired, please login again"
        );
      }

      navigate("/dashboard");
    } catch (error) {
      renderAlert("error", "Server error: Failed to verify token");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    initiateAuthFlow();
  }, [isAuthenticated]);

  return (
    <div className='min-h-screen max-w-[600px] mx-auto flex flex-col justify-center py-5 bg-gradient-to-b from-background-primary via-background-secondary to-background-primary'>
      <img
        className='mx-auto mb-20'
        width={300}
        src={logo}
        alt='Taskhub logo'
      />

      {isLoading ? (
        <div className='mx-auto'>
          <PulseLoader size={12} color='#ffffff' />
        </div>
      ) : (
        <>
          {user.token && (
            <div className='w-1/2 mx-auto'>
              <h2 className='text-primary'>
                Welcome back{" "}
                <span className='font-bold text-accent'>{user.username}</span>
              </h2>
              <button
                onClick={() => navigate("/dashboard")}
                className='mt-5 bg-accent font-medium rounded-md p-2 shadow-lg transition-transform hover:scale-105 w-full'>
                Proceed to Dashboard
              </button>
            </div>
          )}

          {isLogin && !user.token && <Login setIsLogin={setIsLogin} />}
          {!isLogin && !user.token && <Register setIsLogin={setIsLogin} />}
        </>
      )}
    </div>
  );
}

export default Auth;
