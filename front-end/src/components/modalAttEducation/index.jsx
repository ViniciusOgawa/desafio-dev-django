import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { educationSchema } from "./schema";
import UserContext from "../../providers/UserContext";
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

const ModalAttEducation = () => {
  const {
    setIsOpenModalAttEducation,
    IsOpenModalAttEducation,
    updateEducation,
    fetchUserData,
    userRetriveEducation,
  } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(educationSchema),
  });

  const ongoingValue = watch("ongoing");

  useEffect(() => {
    if (userRetriveEducation) {
      Object.keys(userRetriveEducation).forEach((key) => {
        if (key === "ongoing") {
          setValue(key, userRetriveEducation[key] ? "true" : "false");
        } else {
          setValue(key, userRetriveEducation[key], { shouldValidate: true });
        }
      });
    }
  }, [userRetriveEducation, setValue]);

  const handleClose = () => {
    setIsOpenModalAttEducation(false);
  };

  const submit = (data) => {
    const formattedData = {
      ...data,
      ongoing: data.ongoing === "true",
    };
    updateEducation(userRetriveEducation.id, formattedData);
    fetchUserData();
    setIsOpenModalAttEducation(false);
  };

  return (
    <Modal isOpen={IsOpenModalAttEducation} onClose={handleClose} isCentered>
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
        <ModalHeader fontSize={"xl"}>Editar ensino</ModalHeader>
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
                placeholder="Digite o nome da instituição..."
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
                placeholder="Digite o período..."
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
                <RadioGroup
                  value={ongoingValue} // Monitorando o valor
                  onChange={(value) => setValue("ongoing", value)} // Atualizando o valor
                >
                  <Radio value="true" marginRight={"30px"}>
                    Sim
                  </Radio>
                  <Radio value="false">Não</Radio>
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
            >
              Editar
            </Button>
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  );
};

export { ModalAttEducation };
