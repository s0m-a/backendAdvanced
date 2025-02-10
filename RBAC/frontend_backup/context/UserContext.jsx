import { createContext, useContext, useReducer, useEffect } from "react";
import axiosInstance from '@/lib/axios';
import { toast } from "react-hot-toast";

const UserContext = createContext();

const initialState = {
  user:null,
  loading: false,
  checkingAuth: true,
};

// reducer function,reducer is like a worker that listens for commands (actions) and updates the state.
// ...state copies the old state 
function userReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_CHECKING_AUTH":
      return { ...state, checkingAuth: action.payload };
    default:
      return state;
  }
}

export function UserProvider({ children }) {
  /**
   * state → Holds the current user info.
    dispatch → Used to send actions (commands) to update state.
   */
  const [state, dispatch] = useReducer(userReducer, initialState);

  const signup = async (data) => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const res = await axiosInstance.post("/auth/register", data);
      dispatch({ type: "SET_USER", payload: res.data });
    } catch (error) {
      throw error;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const login = async (data) => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const res = await axiosInstance.post("/auth/login", data);
      dispatch({ type: "SET_USER", payload: res.data });
    } catch (error) {
      throw error; 
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      dispatch({ type: "SET_USER", payload: null });
      dispatch({ type: "SET_CHECKING_AUTH", payload: false }); // ✅ Prevent infinite loop
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred during logout");
    }
  };

  const checkAuth = async () => {
    dispatch({ type: "SET_CHECKING_AUTH", payload: true });
    try {
      const res = await axiosInstance.get("/auth/profile");
      dispatch({ type: "SET_USER", payload: res.data });
    } catch (error) {
      console.error(error.message);
      dispatch({ type: "SET_USER", payload: null });
    } finally {
      dispatch({ type: "SET_CHECKING_AUTH", payload: false });
    }
  };

  const refreshToken = async () => {
    dispatch({ type: "SET_CHECKING_AUTH", payload: true });
    try {
      const res = await axiosInstance.post("/auth/refresh");
      return res.data;
    } catch (error) {
      dispatch({ type: "SET_USER", payload: null });
      throw error;
    } finally {
      dispatch({ type: "SET_CHECKING_AUTH", payload: false });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);


  return (
    <UserContext.Provider value={{ ...state, signup, login, logout, checkAuth, refreshToken,dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

// // Axios interceptor for token refresh
// let refreshPromise = null;

// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         if (refreshPromise) {
//           await refreshPromise;
//           return axios(originalRequest);
//         }

//         refreshPromise = refreshToken();
//         await refreshPromise;
//         refreshPromise = null;

//         return axios(originalRequest);
//       } catch (refreshError) {
//         logout();
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
//);
