import {
  AuthenticationApi,
  CategoryApi,
  Configuration,
  StatisticsApi,
  SubscriptionApi,
  UserApi,
} from "@/api";
import { useMemo } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const useApi = () => {
  const authHeader = useAuthHeader();
  const config = useMemo(() => {
    const configuration = new Configuration();
    //configuration.basePath = "https://submate-production.up.railway.app/api/v1";
    if (authHeader)
      configuration.accessToken = authHeader.replace("Bearer ", "");
    return configuration;
  }, [authHeader]);

  const subscriptionApi = useMemo(() => new SubscriptionApi(config), [config]);
  const categoryApi = useMemo(() => new CategoryApi(config), [config]);
  const authApi = useMemo(() => new AuthenticationApi(config), [config]);
  const userApi = useMemo(() => new UserApi(config), [config]);
  const statisticsApi = useMemo(() => new StatisticsApi(config), [config]);

  return {
    authApi,
    subscriptionApi,
    categoryApi,
    userApi,
    statisticsApi,
  };
};

export default useApi;
