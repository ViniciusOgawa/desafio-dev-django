import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useToast } from "@chakra-ui/react";

const UserContext = createContext({});

export default UserContext;

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const toast = useToast();

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
