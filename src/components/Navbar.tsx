import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [modal, setModal] = useState<string>("");
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const nav = document.querySelector("nav");

    function handleOutsideClick(event: any) {
      if (!nav?.contains(event.target)) setModal("");
    }
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <nav className='mx-auto w-full p-5 border-b-2 border-background-accent'>
      <ul className='flex items-center justify-center md:justify-start gap-8 font-bold p-2'>
        <li className='mt-2'>
          <img
            className='max-w-[125px] md:max-w-[300px]'
            width={200}
            src='src/assets/logo.svg'
            alt='taskhub logo'
          />
        </li>
        <li
          onClick={() => setModal(modal === "settings" ? "" : "settings")}
          className='relative inline-flex gap-2 hover:cursor-pointer'>
          <img src='src/assets/icons/settings.svg' alt='toggle settings menu' />
          <span>Settings</span>
        </li>
        <li
          onClick={() => setModal(modal === "projects" ? "" : "projects")}
          className='inline-flex gap-2 hover:cursor-pointer'>
          <img src='src/assets/icons/projects.svg' alt='toggle projects menu' />
          <span>Projects</span>
        </li>
      </ul>

      {modal === "settings" && (
        <aside className='absolute mt-5 p-5 w-[325px] rounded-md bg-background-secondary shadow-xl'>
          <p className='text-secondary'>
            Logged in as {""}
            <span className='font-bold text-primary'>{user.username}</span>
          </p>
          <button
            className='mt-5 w-full bg-transparent border border-secondary rounded-md p-2 font-medium shadow-lg transition-transform hover:scale-105'
            onClick={logout}>
            Delete account
          </button>
          <button
            className='mt-5 w-full bg-transparent border border-secondary rounded-md p-2 font-medium shadow-lg transition-transform hover:scale-105'
            onClick={logout}>
            Logout
          </button>
        </aside>
      )}

      {modal === "projects" && (
        <aside className='absolute mt-5 p-5 w-[325px] rounded-md bg-background-secondary shadow-xl'>
          <p className='text-secondary'>Coming soon</p>
        </aside>
      )}
    </nav>
  );
}

export default Navbar;
