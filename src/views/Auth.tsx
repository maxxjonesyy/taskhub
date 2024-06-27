import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Login, Register } from "../components/index";
import { auth } from "../utils";
import { logo } from "../assets/index";

function Auth() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    auth.verifyToken().then((isVerified) => {
      isVerified ? navigate("/dashboard") : navigate("/");
    });
  }, [isAuthenticated]);

  return (
    <div className='min-h-screen max-w-[600px] mx-auto flex flex-col justify-center py-5 bg-gradient-to-b from-background-primary via-background-secondary to-background-primary'>
      <img
        className='mx-auto mb-20'
        width={300}
        src={logo}
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
