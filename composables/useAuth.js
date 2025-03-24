export const useAuthToken = () => {
  const token = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const setToken = (newToken) => {
    localStorage.setItem("accessToken", newToken);
  };
  const setRefreshToken = (newRefreshToken) => {
    localStorage.setItem("refreshToken", newRefreshToken);
  };
  const removeToken = () => {
    localStorage.removeItem("accessToken");
  };
  const removeRefreshToken = () => {
    localStorage.removeItem("refreshToken");
  };
  return { token, refreshToken, setToken, setRefreshToken, removeToken, removeRefreshToken };
};

export const useLogout = () => {
  const { removeToken, removeRefreshToken } = useAuthToken();
  const logout = () => {
    removeToken();
    removeRefreshToken();
    window.location.reload();
  };
  return { logout };
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

export const loginWithEmail = async (email, password) => {
  const { setToken, setRefreshToken } = useAuthToken();
  const response = await $fetch("/api/auth/login", {
    method: "POST",
    body: { email, password },
  });
  setToken(response.accessToken);
  setRefreshToken(response.refreshToken);
  return response;
};

export const registerWithEmail = async (username, email, password) => {
  const { setToken, setRefreshToken } = useAuthToken();
  const response = await $fetch("/api/auth/register", {
    method: "POST",
    body: { username, email, password },
  });
  setToken(response.accessToken);
  setRefreshToken(response.refreshToken);
  return response;
};
