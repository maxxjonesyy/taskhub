import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    function handleOutsideClick(event: any) {
      const target = event.target as HTMLElement;
      const nav = document.querySelector("nav");
      const settings = document.getElementById("settings");

      if (!nav?.contains(target)) settings?.classList.add("hidden");
    }
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  });

  return (
    <nav className="lg:min-h-screen min-w-[250px] bg-background-secondary lg:bg-gradient-to-t lg:from-background-primary lg:to-background-secondary">
      <div
        onClick={() =>
          document.getElementById("settings")?.classList.toggle("hidden")
        }
        className="relative flex justify-start lg:justify-between transition-colors rounded-md m-2 hover:cursor-pointer hover:bg-background-accent"
      >
        <h1 className="font-bold text-lg p-2">{user.username}</h1>
        <img
          className="p-2"
          src="./src/assets/icons/settings.svg"
          alt="settings icon"
        />

        <aside
          id="settings"
          className="hidden absolute min-w-[250px] left-0 -bottom-32 cursor-default bg-background-accent shadow-lg rounded-md"
        >
          <div className="text-center p-3">
            <p className="font-light text-primary">{user.email}</p>
            <button
              onClick={logout}
              className="w-full mt-5 p-2 bg-background-secondary font-semibold rounded-md"
            >
              Logout
            </button>
          </div>
        </aside>
      </div>
    </nav>
  );
}

export default Navbar;
