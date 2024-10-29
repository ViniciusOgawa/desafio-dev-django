import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Flex,
  RadioGroup,
  Radio,
  ModalContent,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import { set, useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { educationSchema } from "./schema";

import UserContext from "../../providers/UserContext";

const ModalCreateEducation = () => {
  const {
    setIsOpenModalEducation,
    IsOpenModalEducation,
    createEducation,
    loadingRegisterEducation,
  } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(educationSchema),
  });

  const handleClose = () => {
    setIsOpenModalEducation(false);
  };

  const submit = (data) => {
    createEducation(data);
    setIsOpenModalEducation(false);
  };

  return (
    <Modal isOpen={IsOpenModalEducation} onClose={handleClose} isCentered>
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
        <ModalHeader fontSize={"xl"}>Adicionar ensino</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(submit)}>
          <ModalBody flexDirection={"column"} gap={"20px"} w={"100%"}>
            <FormControl
              isRequired
              isInvalid={errors.institution ? true : false}
              mb={4}
            >
              <FormLabel
                fontSize={"lg"}
                fontWeight={"medium"}
                color={"black.900"}
              >
                Instituição
              </FormLabel>
              <Input
                placeholder="Digite o nome da instiuição..."
                h={"30px"}
                w={"100%"}
                fontSize={"md"}
                fontWeight={"medium"}
                {...register("institution")}
              />
              <FormErrorMessage fontSize={"lg"}>
                {errors.institution?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isRequired
              isInvalid={errors.course ? true : false}
              mb={4}
            >
              <FormLabel
                fontSize={"lg"}
                fontWeight={"medium"}
                color={"black.900"}
              >
                Curso
              </FormLabel>
              <Input
                placeholder="Digite o nome do curso..."
                h={"30px"}
                w={"100%"}
                fontSize={"md"}
                fontWeight={"medium"}
                {...register("course")}
              />
              <FormErrorMessage fontSize={"lg"}>
                {errors.course?.message}
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
                placeholder="Digite sua rua..."
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
              isInvalid={errors.ongoing ? true : false}
              mb={4}
            >
              <FormLabel
                fontSize={"lg"}
                fontWeight={"medium"}
                color={"black.900"}
              >
                Em andamento?
              </FormLabel>
              <Flex w={"100%"}>
                <RadioGroup w={"100%"}>
                  <Radio
                    value="true"
                    {...register("ongoing")}
                    marginRight={"30px"}
                  >
                    Sim
                  </Radio>
                  <Radio value="false" {...register("ongoing")}>
                    Não
                  </Radio>
                </RadioGroup>
              </Flex>
              <FormErrorMessage fontSize={"lg"}>
                {errors.ongoing?.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              h={"50px"}
              w={"100%"}
              fontSize={"md"}
              border={"1px solid"}
              marginTop={"20px"}
              disabled={loadingRegisterEducation}
            >
              {loadingRegisterEducation ? "Adicionando..." : "Adcionar"}
            </Button>
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  );
};

export { ModalCreateEducation };
