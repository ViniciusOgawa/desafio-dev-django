import { Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import UserContext from "../../providers/UserContext";

const CardEducation = ({ education }) => {
  const { setIsOpenModalAttEducation, retriveEducation, deleteEducation } =
    useContext(UserContext);

  const handleAttEducation = () => {
    setIsOpenModalAttEducation(true);
    retriveEducation(education.id);
  };

  const handleDeleteEducation = () => {
    deleteEducation(education.id);
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
          <Text>Instituição:</Text>
          <Text>{education.institution}</Text>
        </Flex>
        <Flex justifyContent={"space-between"} w={"100%"} maxW={"400px"}>
          <Text>Curso:</Text>
          <Text>{education.course}</Text>
        </Flex>
        <Flex justifyContent={"space-between"} w={"100%"} maxW={"400px"}>
          <Text>Período:</Text>
          <Text>{education.period}</Text>
        </Flex>
        <Flex justifyContent={"space-between"} w={"100%"} maxW={"400px"}>
          <Text>Em andamento?</Text>
          {education.ongoing ? <Text>Sim</Text> : <Text>Não</Text>}
        </Flex>
      </Flex>
      <Flex gap={"10px"}>
        <IconButton
          icon={<EditIcon />}
          aria-label="Atualizar"
          onClick={() => handleAttEducation()}
          size="sm"
        />

        <IconButton
          icon={<DeleteIcon />}
          aria-label="Excluir"
          onClick={() => handleDeleteEducation()}
          size="sm"
        />
      </Flex>
    </Flex>
  );
};

export { CardEducation };
