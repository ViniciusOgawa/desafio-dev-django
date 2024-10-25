import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useToast } from "@chakra-ui/react";

const UserContext = createContext({});

export default UserContext;

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const toast = useToast();

  const [loadingLogin, setLoadingLogin] = useState(false);

  const userLogin = async (formData) => {
    try {
      setLoadingLogin(true);
      const response = await api.post("/api/login/", formData);
      window.localStorage.clear();
      window.localStorage.setItem("@TOKEN", response.data.access);
      toast({
        title: "Login efetuado com sucesso!",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/home");
    } catch (error) {
      toast({
        title: "Senha ou email incorretos!",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    } finally {
      setLoadingLogin(false);
    }
  };

  const [loadingRegister, setLoadingRegister] = useState(false);

  const userRegister = async (formData) => {
    try {
      setLoadingRegister(true);
      await api.post("/api/users/", formData);
      toast({
        title: "Cadastro efetuado com sucesso!",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Email ou nome de usuário já cadastrado!",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    } finally {
      setLoadingRegister(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userRegister,
        loadingRegister,
        loadingLogin,
        userLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
