import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import UserContext from "../../providers/UserContext";
import { perfilSchema } from "./schema";
import InputMask from "react-input-mask";

const FormPerfil = () => {
  const { updateUser, loadingAttUser, user } = useContext(UserContext);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const userData = {
    ...user,
    date_of_birth: formatDate(user?.date_of_birth),
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(perfilSchema),
    defaultValues: userData,
  });

  useEffect(() => {
    if (user) {
      for (const [key, value] of Object.entries(userData)) {
        setValue(key, value);
      }
    }
  }, [userData, setValue]);

  const submit = (data) => {
    updateUser(data);
  };

  return (
    <Flex
      h={"100%"}
      w={"100%"}
      flexDir={"column"}
      justifyContent={"center"}
      gap={"20px"}
    >
      <form onSubmit={handleSubmit(submit)}>
        <Flex
          justifyContent={"space-between"}
          flexDirection={"column"}
          gap={"10px"}
          w={"100%"}
        >
          <FormControl isInvalid={errors.username ? true : false}>
            <FormLabel
              fontSize={"lg"}
              fontWeight={"medium"}
              color={"black.900"}
            >
              Nome de usuário
            </FormLabel>
            <Input
              placeholder="Digite seu nome de usuário..."
              h={"30px"}
              w={"100%"}
              fontSize={"md"}
              fontWeight={"medium"}
              {...register("username")}
            />
            <FormErrorMessage fontSize={"lg"}>
              {errors.username?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.email ? true : false}>
            <FormLabel
              fontSize={"lg"}
              fontWeight={"medium"}
              color={"black.900"}
            >
              Email
            </FormLabel>
            <Input
              placeholder="Digite seu email..."
              h={"30px"}
              w={"100%"}
              fontSize={"md"}
              fontWeight={"medium"}
              {...register("email")}
            />
            <FormErrorMessage fontSize={"lg"}>
              {errors.email?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.first_name ? true : false}>
            <FormLabel
              fontSize={"lg"}
              fontWeight={"medium"}
              color={"black.900"}
            >
              Primeiro nome
            </FormLabel>
            <Input
              placeholder="Digite seu primeiro nome..."
              h={"30px"}
              w={"100%"}
              fontSize={"md"}
              fontWeight={"medium"}
              {...register("first_name")}
            />
            <FormErrorMessage fontSize={"lg"}>
              {errors.first_name?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.last_name ? true : false}>
            <FormLabel
              fontSize={"lg"}
              fontWeight={"medium"}
              color={"black.900"}
            >
              Sobrenome
            </FormLabel>
            <Input
              placeholder="Digite seu sobrenome..."
              h={"30px"}
              w={"100%"}
              fontSize={"md"}
              fontWeight={"medium"}
              {...register("last_name")}
            />
            <FormErrorMessage fontSize={"lg"}>
              {errors.last_name?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.date_of_birth}>
            <FormLabel
              fontSize={"lg"}
              fontWeight={"medium"}
              color={"black.900"}
            >
              Data de Aniversário
            </FormLabel>

            <Input
              as={InputMask}
              mask="99/99/9999"
              placeholder="DD/MM/AAAA"
              h={"30px"}
              w={"100%"}
              fontSize={"md"}
              fontWeight={"medium"}
              {...register("date_of_birth")}
            />

            <FormErrorMessage fontSize={"lg"}>
              {errors.date_of_birth?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password ? true : false}>
            <FormLabel
              fontSize={"lg"}
              fontWeight={"medium"}
              color={"black.900"}
            >
              Senha
            </FormLabel>
            <Input
              placeholder="Digite uma nova senha..."
              type="password"
              h={"30px"}
              w={"100%"}
              fontSize={"md"}
              fontWeight={"medium"}
              {...register("password")}
            />
            <FormErrorMessage fontSize={"lg"}>
              {errors.password?.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>

        <Button
          type="submit"
          h={"50px"}
          w={"100%"}
          fontSize={"md"}
          border={"1px solid"}
          marginTop={"20px"}
          disabled={loadingAttUser}
        >
          {loadingAttUser ? "Salvando..." : "Salvar"}
        </Button>
      </form>
    </Flex>
  );
};

export { FormPerfil };
