import { Button, Flex, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { useContext } from "react";
import UserContext from "../../providers/UserContext";
import { CardExperience } from "../cardExperience";
import { ModalCreateExperience } from "../modalCreateExperience";
import { ModalAttExperience } from "../modalAttExperience";

const ContainerExperience = () => {
  const { setIsOpenModalExperience, userExperience } = useContext(UserContext);

  const experienceExists = userExperience.length > 0;
  return (
    <Flex
      h={"100%"}
      w={"100%"}
      flexDir={"column"}
      justifyContent={"center"}
      gap={"20px"}
      alignItems={"center"}
    >
      <ModalCreateExperience />
      <ModalAttExperience />
      {experienceExists ? (
        <UnorderedList
          styleType="none"
          margin={"20px"}
          h={"100%"}
          w={"100%"}
          maxH="400px"
          overflowY="auto"
        >
          {userExperience.map((element) => (
            <ListItem w="100%" key={element.id} marginBottom={"10px"}>
              <CardExperience experience={element} />
            </ListItem>
          ))}
        </UnorderedList>
      ) : (
        <Text fontWeight={"bold"} margin={"20px"}>
          Ainda não foi adicionado nenhum tipo de experiência
        </Text>
      )}
      <Button
        onClick={() => setIsOpenModalExperience(true)}
        h={"50px"}
        w={"100%"}
        fontSize={"md"}
        border={"1px solid"}
        marginTop={"20px"}
      >
        Adicionar
      </Button>
    </Flex>
  );
};

export { ContainerExperience };
