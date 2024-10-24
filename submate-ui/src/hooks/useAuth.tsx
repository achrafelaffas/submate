import { Configuration } from "@/api";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const useAuth = () => {
  const acccessToken = useAuthHeader();
  const config = new Configuration();
  config.accessToken = acccessToken ? acccessToken.replace("Bearer ", "") : "";
  return config;
};

export default useAuth;