export const useAuthToken = () => {
  const token = localStorage.getItem("token");
  const setToken = (newToken) => {
    localStorage.setItem("token", newToken);
  };
  const removeToken = () => {
    localStorage.removeItem("token");
  };
  return { token, setToken, removeToken };
};

export const useUser = () => {
  const { token, setToken, removeToken } = useAuthToken();
  const user = useState("user", () => null);
  const isAuthenticated = computed(() => !!token);
  //   const login = async (email, password) => {
  //     const response = await fetch("http://localhost:3000/auth/login", {
  //       method: "POST",
  //       body: JSON.stringify({ email, password }),
  //     });
  //     const data = await response.json();
  //   };
  return { user, isAuthenticated };
};
