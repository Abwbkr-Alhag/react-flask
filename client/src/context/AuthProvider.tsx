import { createContext, useReducer } from "react";

export enum AuthActionKind {
    LOGIN = "Login",
    REGISTER = "Register",
    LOGOUT = "Logout",
}

interface AuthAction {
    type: AuthActionKind,
    payload: auth,
}

interface authContextInterface {
    auth: auth,
    setAuth: React.Dispatch<AuthAction>
}

export interface auth {
    id: string,
    user: Boolean,
    isAdmin: Boolean,
    email: string,
}

interface Props {
    children: React.ReactNode;
}

const AuthContext = createContext<authContextInterface>({} as authContextInterface);

const AuthReducer = (_:auth, action:AuthAction) => {
    const { type, payload } = action;
    switch (type) {
      case AuthActionKind.REGISTER:
        localStorage.setItem("currentUser", JSON.stringify({
            id: payload.id,
            user: true,
            isAdmin: payload.isAdmin,
            email: payload.email
        }));
        return {
            id: payload.id,
            user: true,
            isAdmin: payload.isAdmin,
            email: payload.email
        };
      case AuthActionKind.LOGIN:
        localStorage.setItem("currentUser", JSON.stringify({
            id: payload.id,
            user: true,
            isAdmin: payload.isAdmin,
            email: payload.email
        }));
        return {
            id: payload.id,
            user: true,
            isAdmin: payload.isAdmin,
            email: payload.email
        };
      case AuthActionKind.LOGOUT:
        localStorage.setItem("currentUser", JSON.stringify({
            id: "",
            user: false,
            isAdmin: false,
            email: ""
        }))
        return {
            id: "",
            user: false,
            isAdmin: false,
            email: ""
        } as auth;
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
};


export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [auth, setAuth] = useReducer(AuthReducer, 
        localStorage.getItem("currentUser")
        ? (JSON.parse(localStorage.getItem("currentUser")!) as auth)
        : {} as auth)


    return (
        <AuthContext.Provider value={{  auth, setAuth   }}>
            { children }
        </AuthContext.Provider>
    )
}


export default AuthContext;