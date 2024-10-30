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
  const token = localStorage.getItem("@TOKEN");
  const [user, setUser] = useState([]);
  const [userEducation, setUserEducation] = useState([]);
  const [userExperience, setUserExperience] = useState([]);
  const [userRetriveEducation, setUserRetriveEducation] = useState([]);
  const [userRetriveExperience, setUserRetriveExperience] = useState([]);
  const [userContact, setUserContact] = useState([]);
  const [loadingAttUser, setLoadingAttUser] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingRegisterContact, setLoadingRegisterContact] = useState(false);
  const [IsOpenModalEducation, setIsOpenModalEducation] = useState(false);
  const [IsOpenModalAttEducation, setIsOpenModalAttEducation] = useState(false);
  const [loadingRegisterEducation, setLoadingRegisterEducation] =
    useState(false);
  const [IsOpenModalExperience, setIsOpenModalExperience] = useState(false);
  const [IsOpenModalAttExperience, setIsOpenModalAttExperience] =
    useState(false);

  const fetchUserData = async () => {
    try {
      const response = await api.get("/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);

      try {
        const response = await api.get("/api/users/contacts/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserContact(response.data);
      } catch (err) {
        console.error("Erro ao buscar dados de contato", err);
      }

      try {
        const response = await api.get("/api/users/education/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserEducation(response.data);
      } catch (err) {
        console.error("Erro ao buscar dados de ensino", err);
      }

      try {
        const response = await api.get("/api/users/experience/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserExperience(response.data);
      } catch (err) {
        console.error("Erro ao buscar dados de experiencia", err);
      }

      if (location.pathname === "/login") {
        navigate("/home");
      }
    } catch (err) {
      window.localStorage.clear();
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!token) {
      window.localStorage.clear();
      if (location.pathname !== "/login" && location.pathname !== "/register") {
        navigate("/login");
      }
      return;
    }

    fetchUserData();
  }, [navigate, location]);

  const updateUser = async (userData) => {
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

  const createContact = async (formData) => {
    try {
      setLoadingRegisterContact(true);
      await api.post("/api/contacts/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Contato cadastrado com sucesso!",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Erro ao efetuar cadastro de contato!",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    } finally {
      setLoadingRegisterContact(false);
    }
  };

  const updateContact = async (id, contactData) => {
    if (!id) {
      toast({
        title: "Erro ao atualizar contato: ID não encontrado!",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    for (const key in contactData) {
      if (contactData[key] === "") {
        delete contactData[key];
      }
    }

    try {
      setLoadingRegisterContact(true);
      const response = await api.patch(`/api/contacts/${id}/`, contactData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserContact(response.data);

      toast({
        title: "Contato atualizado com sucesso!",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar contato!",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    } finally {
      setLoadingRegisterContact(false);
    }
  };

  const createEducation = async (formData) => {
    try {
      setLoadingRegisterEducation(true);
      await api.post("/api/education/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Ensino cadastrado com sucesso!",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Erro ao efetuar cadastro de ensino!",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    } finally {
      setLoadingRegisterEducation(false);
    }
  };

  const updateEducation = async (id, educationData) => {
    if (!id) {
      toast({
        title: "Erro ao atualizar ensino: ID não encontrado!",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    for (const key in educationData) {
      if (educationData[key] === "") {
        delete educationData[key];
      }
    }

    try {
      const response = await api.patch(`/api/education/${id}/`, educationData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserContact(response.data);

      toast({
        title: "Ensino atualizado com sucesso!",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar ensino!",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    }
  };

  const retriveEducation = async (id) => {
    try {
      const response = await api.get(`/api/education/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserRetriveEducation(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEducation = async (id) => {
    try {
      setLoadingRegisterEducation(true);
      await api.delete(`/api/education/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Ensino deletado com sucesso!",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Erro ao deletar cadastro de ensino!",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    } finally {
      setLoadingRegisterEducation(false);
    }
  };

  const createExperience = async (formData) => {
    try {
      await api.post("/api/experience/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Experiência cadastrada com sucesso!",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Erro ao efetuar cadastro de experiência!",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    }
  };

  const updateExperience = async (id, experienceData) => {
    if (!id) {
      toast({
        title: "Erro ao atualizar experiência: ID não encontrado!",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    for (const key in experienceData) {
      if (experienceData[key] === "") {
        delete experienceData[key];
      }
    }

    try {
      const response = await api.patch(
        `/api/experience/${id}/`,
        experienceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserExperience(response.data);

      toast({
        title: "Experiência atualizada com sucesso!",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar experiência!",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    }
  };

  const retriveExperience = async (id) => {
    try {
      const response = await api.get(`/api/experience/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserRetriveExperience(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExperience = async (id) => {
    try {
      await api.delete(`/api/experience/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Experiência deletada com sucesso!",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Erro ao deletar cadastro de experiência!",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        IsOpenModalExperience,
        setIsOpenModalExperience,
        IsOpenModalAttExperience,
        setIsOpenModalAttExperience,
        userRetriveExperience,
        deleteExperience,
        retriveExperience,
        updateExperience,
        createExperience,
        userExperience,
        setUserExperience,
        deleteEducation,
        userRetriveEducation,
        setUserRetriveEducation,
        retriveEducation,
        updateEducation,
        IsOpenModalAttEducation,
        setIsOpenModalAttEducation,
        createEducation,
        loadingRegisterEducation,
        IsOpenModalEducation,
        setIsOpenModalEducation,
        userEducation,
        fetchUserData,
        userContact,
        updateContact,
        loadingRegisterContact,
        createContact,
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
