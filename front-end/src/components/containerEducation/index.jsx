import { Button, Flex, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { ModalCreateEducation } from "../modalCreateEducation";
import { useContext } from "react";
import UserContext from "../../providers/UserContext";
import { CardEducation } from "../cardEducation";
import { ModalAttEducation } from "../modalAttEducation";

const ContainerEducation = () => {
  const { setIsOpenModalEducation, userEducation } = useContext(UserContext);
  return (
    <Flex
      h={"100%"}
      w={"100%"}
      flexDir={"column"}
      justifyContent={"center"}
      gap={"20px"}
      alignItems={"center"}
    >
      <ModalCreateEducation />
      <ModalAttEducation />
      {userEducation ? (
        <UnorderedList
          styleType="none"
          margin={"20px"}
          h={"100%"}
          w={"100%"}
          maxH="400px"
          overflowY="auto"
        >
          {userEducation.map((element) => (
            <ListItem w="100%" key={element.id} marginBottom={"10px"}>
              <CardEducation education={element} />
            </ListItem>
          ))}
        </UnorderedList>
      ) : (
        <Text fontWeight={"bold"} margin={"20px"}>
          Ainda não foi adicionado nenhum tipo de ensino !
        </Text>
      )}
      <Button
        onClick={() => setIsOpenModalEducation(true)}
        type="submit"
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

export { ContainerEducation };
