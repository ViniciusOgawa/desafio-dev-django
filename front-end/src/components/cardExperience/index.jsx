import { Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import UserContext from "../../providers/UserContext";

const CardExperience = ({ experience }) => {
  const { setIsOpenModalAttExperience, retriveExperience, deleteExperience } =
    useContext(UserContext);

  const handleAttExperience = () => {
    setIsOpenModalAttExperience(true);
    retriveExperience(experience.id);
  };

  const handleDeleteExperience = () => {
    deleteExperience(experience.id);
  };

  return (
    <Flex
      border={"1px solid"}
      borderRadius={"5px"}
      alignItems={"center"}
      justifyContent={"space-between"}
      flexDir={"row"}
      padding={"20px"}
      w={"100%"}
    >
      <Flex flexDir={"column"} gap={"5px"} w={"75%"}>
        <Flex justifyContent={"space-between"} w={"100%"} maxW={"400px"}>
          <Text>Cargo:</Text>
          <Text>{experience.role}</Text>
        </Flex>
        <Flex justifyContent={"space-between"} w={"100%"} maxW={"400px"}>
          <Text>Empresa:</Text>
          <Text>{experience.company}</Text>
        </Flex>
        <Flex justifyContent={"space-between"} w={"100%"} maxW={"400px"}>
          <Text>Período:</Text>
          <Text>{experience.period}</Text>
        </Flex>
        <Flex justifyContent={"space-between"} w={"100%"} maxW={"400px"}>
          <Text>Descrição:</Text>
          <Text>
            {experience.description.length > 20
              ? `${experience.description.substring(0, 20)}...`
              : experience.description}
          </Text>
        </Flex>
      </Flex>
      <Flex gap={"10px"}>
        <IconButton
          icon={<EditIcon />}
          aria-label="Atualizar"
          onClick={() => handleAttExperience()}
          size="sm"
        />

        <IconButton
          icon={<DeleteIcon />}
          aria-label="Excluir"
          onClick={() => handleDeleteExperience()}
          size="sm"
        />
      </Flex>
    </Flex>
  );
};

export { CardExperience };
