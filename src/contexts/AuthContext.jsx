import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  isAuth: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isAuth: action.payload,
      };

    default:
      throw new Error("Unknow action");
  }
}

function AuthProvider({ children }) {
  const [{ isAuth }, dispath] = useReducer(reducer, initialState);

  function login(token) {
    dispath({ type: "login", payload: token });
  }

  return (
    <AuthContext.Provider value={{ isAuth, login }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");

  return context;
}

export { AuthProvider, useAuth };
