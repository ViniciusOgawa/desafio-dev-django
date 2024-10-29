import { useState, useContext } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { FormPerfil } from "../../components/formPerfil";
import { FormContact } from "../../components/formContact";
import UserContext from "../../providers/UserContext";
import { useNavigate } from "react-router-dom";

const Perfil = () => <div>Perfil</div>;
const Contato = () => <div>Contato</div>;
const Educacao = () => <div>Educação</div>;
const Experiencias = () => <div>Experiências</div>;

const Home = () => {
  const [activeComponent, setActiveComponent] = useState("perfil");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const renderComponent = () => {
    switch (activeComponent) {
      case "perfil":
        return <FormPerfil />;
      case "contato":
        return <FormContact />;
      case "educacao":
        return <Educacao />;
      case "experiencias":
        return <Experiencias />;
      default:
        return <Perfil />;
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    setUser([]);
  };

  return (
    <Flex
      bgColor={"black.900"}
      w={"100vw"}
      h={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Flex
        bgColor={"white.50"}
        w={"550px"}
        borderRadius={"10"}
        padding={"30px"}
        flexDirection={"column"}
        alignItems={"center"}
        boxShadow={"rgba(255, 255, 255, 0.56) 0px 22px 70px 4px"}
      >
        <Flex justifyContent={"space-between"} w={"100%"}>
          <Button
            onClick={() => setActiveComponent("perfil")}
            variant="unstyled"
            borderRadius={"0px"}
            borderBottom={
              activeComponent === "perfil" ? "2px solid black" : "none"
            }
          >
            Perfil
          </Button>
          <Button
            onClick={() => setActiveComponent("contato")}
            variant="unstyled"
            borderRadius={"0px"}
            borderBottom={
              activeComponent === "contato" ? "2px solid black" : "none"
            }
          >
            Contato
          </Button>
          <Button
            onClick={() => setActiveComponent("educacao")}
            variant="unstyled"
            borderRadius={"0px"}
            borderBottom={
              activeComponent === "educacao" ? "2px solid black" : "none"
            }
          >
            Educação
          </Button>
          <Button
            onClick={() => setActiveComponent("experiencias")}
            variant="unstyled"
            borderRadius={"0px"}
            borderBottom={
              activeComponent === "experiencias" ? "2px solid black" : "none"
            }
          >
            Experiências
          </Button>
          <Button
            onClick={() => logout()}
            variant="unstyled"
            borderRadius={"0px"}
          >
            Sair
          </Button>
        </Flex>

        <Flex mt={5} w={"100%"} justifyContent={"center"}>
          {renderComponent()}
        </Flex>
      </Flex>
    </Flex>
  );
};

export { Home };
