import { Route, Redirect } from "wouter";
import  useAuthStore from "../store/AuthStore";

const StartPage = () => {
  const token = useAuthStore(s => s.token);

  return token
    ? <Redirect to="/TodoList" />
    : <Redirect to="/Login" />;
};

export default StartPage;