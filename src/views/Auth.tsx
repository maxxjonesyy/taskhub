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
        renderAlert(
          "error",
          "Your access token has expired, please login again"
        );
        return;
      }

      navigate("/dashboard");
    } catch (error) {
      localStorage.removeItem("user");
      renderAlert("error", "Error verifying token: Please try again");
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
          {isLogin && !user.token && <Login setIsLogin={setIsLogin} />}
          {!isLogin && !user.token && <Register setIsLogin={setIsLogin} />}
        </>
      )}
    </div>
  );
}

export default Auth;
