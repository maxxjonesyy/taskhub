function getToken() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return `Bearer ${user.token}`;
}

export default getToken;
