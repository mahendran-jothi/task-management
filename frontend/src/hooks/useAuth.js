import { useContext } from "react";
import AuthContext from "@/features/auth/AuthContext";

const useAuth = () => useContext(AuthContext);

export default useAuth;
