import axios from "axios";
import renderAlert from "../renderAlert";
import { SendFormArgs } from "../../types/types";

const sendFormData = async ({
  event,
  endpoint,
  email,
  password,
  setEmail,
  setPassword,
  login,
}: SendFormArgs): Promise<void> => {
  event.preventDefault();

  try {
    const response = await axios.post(endpoint, {
      email,
      password,
    });

    if (response.status === 200) {
      const { message, data } = response.data;

      if (message) {
        renderAlert("success", message);
      }

      if (data) {
        const token = data;
        if (login) login(token);
      }

      setEmail("");
      setPassword("");
    }
  } catch (error: any) {
    renderAlert("error", error.response.data.error);
  }
};

export default sendFormData;
