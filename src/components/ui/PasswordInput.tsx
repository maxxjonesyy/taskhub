import { useState } from "react";

function PasswordInput({
  password,
  setPassword,
  placeholder,
}: {
  password: string;
  setPassword: Function;
  placeholder: string;
}) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className='relative flex items-center gap-1'>
      <input
        id='password'
        className='w-full bg-transparent border border-secondary rounded-md p-3 placeholder:secondary'
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        minLength={8}
        required
      />

      <img
        onMouseDown={() => setShowPassword(true)}
        onMouseUp={() => setShowPassword(false)}
        className='absolute right-0 p-3 cursor-pointer transition-transform hover:scale-110'
        src='src/assets/icons/show-password.svg'
        alt='reveal password'
      />
    </div>
  );
}

export default PasswordInput;
