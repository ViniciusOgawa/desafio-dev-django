import { createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

const UserContext = createContext({});

export default UserContext;

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const [user, setUser] = useState([]);
  const [loadingAttUser, setLoadingAttUser] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");

    if (!token) {
      window.localStorage.clear();
      if (location.pathname !== "/login" && location.pathname !== "/register") {
        navigate("/login");
      }
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await api.get("/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);

        if (location.pathname === "/login") {
          navigate("/home");
        }
      } catch (err) {
        window.localStorage.clear();
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate, location]);

  const updateUser = async (userData) => {
    const token = localStorage.getItem("@TOKEN");

    for (const key in userData) {
      if (userData[key] === "") {
        delete userData[key];
      }
    }

    try {
      setLoadingAttUser(true);
      const response = await api.patch(`/api/users/${user.id}/`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);

      toast({
        title: "Conta atualizada com sucesso!",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar!",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    } finally {
      setLoadingAttUser(false);
    }
  };

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
        loadingAttUser,
        updateUser,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
