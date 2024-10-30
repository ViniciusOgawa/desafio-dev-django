import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { experienceSchema } from "./schema";
import UserContext from "../../providers/UserContext";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  ModalContent,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  Textarea,
} from "@chakra-ui/react";

const ModalAttExperience = () => {
  const {
    setIsOpenModalAttExperience,
    IsOpenModalAttExperience,
    updateExperience,
    fetchUserData,
    userRetriveExperience,
  } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(experienceSchema),
  });

  useEffect(() => {
    if (userRetriveExperience) {
      Object.keys(userRetriveExperience).forEach((key) => {
        setValue(key, userRetriveExperience[key], { shouldValidate: true });
      });
    }
  }, [userRetriveExperience, setValue]);

  const handleClose = () => {
    setIsOpenModalAttExperience(false);
  };

  const submit = (data) => {
    updateExperience(userRetriveExperience.id, data);
    fetchUserData();
    setIsOpenModalAttExperience(false);
  };

  return (
    <Modal isOpen={IsOpenModalAttExperience} onClose={handleClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bgColor={"white.50"}
        minW="550px"
        minH="100px"
        justifyContent={"center"}
        gap={"20px"}
        padding={"30px"}
        boxShadow={"rgba(255, 255, 255, 0.56) 0px 22px 70px 4px"}
      >
        <ModalHeader fontSize={"xl"}>Editar experiência</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(submit)}>
          <ModalBody flexDirection={"column"} gap={"20px"} w={"100%"}>
            <FormControl
              isRequired
              isInvalid={errors.role ? true : false}
              mb={4}
            >
              <FormLabel
                fontSize={"lg"}
                fontWeight={"medium"}
                color={"black.900"}
              >
                Cargo
              </FormLabel>
              <Input
                placeholder="Digite o nome do cargo..."
                h={"30px"}
                w={"100%"}
                fontSize={"md"}
                fontWeight={"medium"}
                {...register("role")}
              />
              <FormErrorMessage fontSize={"lg"}>
                {errors.role?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isRequired
              isInvalid={errors.company ? true : false}
              mb={4}
            >
              <FormLabel
                fontSize={"lg"}
                fontWeight={"medium"}
                color={"black.900"}
              >
                Empresa
              </FormLabel>
              <Input
                placeholder="Digite o nome da empresa..."
                h={"30px"}
                w={"100%"}
                fontSize={"md"}
                fontWeight={"medium"}
                {...register("company")}
              />
              <FormErrorMessage fontSize={"lg"}>
                {errors.company?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isRequired
              isInvalid={errors.period ? true : false}
              mb={4}
            >
              <FormLabel
                fontSize={"lg"}
                fontWeight={"medium"}
                color={"black.900"}
              >
                Período
              </FormLabel>
              <Input
                placeholder="Digite o periodo que ficou na empresa..."
                h={"30px"}
                w={"100%"}
                fontSize={"md"}
                fontWeight={"medium"}
                {...register("period")}
              />
              <FormErrorMessage fontSize={"lg"}>
                {errors.period?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isRequired
              isInvalid={errors.description ? true : false}
              mb={4}
            >
              <FormLabel
                fontSize={"lg"}
                fontWeight={"medium"}
                color={"black.900"}
              >
                Descrição
              </FormLabel>
              <Textarea
                placeholder="Descreva como foi esse cargo..."
                h={"100px"}
                w={"100%"}
                resize="none"
                fontSize={"md"}
                fontWeight={"medium"}
                {...register("description")}
              />
              <FormErrorMessage fontSize={"lg"}>
                {errors.description?.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              h={"50px"}
              w={"100%"}
              fontSize={"md"}
              border={"1px solid"}
              marginTop={"20px"}
            >
              Salvar
            </Button>
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  );
};

export { ModalAttExperience };
