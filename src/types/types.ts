export type SendFormArgs = {
  event: React.FormEvent<HTMLFormElement>;
  endpoint: string;
  email: string;
  password: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};
