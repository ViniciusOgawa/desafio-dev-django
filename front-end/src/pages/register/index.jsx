import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import UserContext from "../../providers/UserContext";
import { registerSchema } from "./schema";
import InputMask from "react-input-mask";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Register = () => {
  const { userRegister, loadingRegister } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(registerSchema),
  });

  const submit = (data) => {
    userRegister(data);
    reset();
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
        w={"580px"}
        borderRadius={"10"}
        padding={"30px"}
        flexDirection={"column"}
        alignItems={"center"}
        boxShadow={"rgba(255, 255, 255, 0.56) 0px 22px 70px 4px"}
      >
        <Flex
          h={"100%"}
          w={"100%"}
          flexDir={"column"}
          justifyContent={"center"}
          gap={"20px"}
        >
          <Text fontSize={"2xl"} fontWeight={"medium"} color={"black.900"}>
            Cadastro
          </Text>
          <form onSubmit={handleSubmit(submit)}>
            <Flex
              justifyContent={"space-between"}
              flexDirection={"column"}
              gap={"10px"}
              w={"100%"}
            >
              <FormControl
                isRequired
                isInvalid={errors.username ? true : false}
              >
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

              <FormControl isRequired isInvalid={errors.email ? true : false}>
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

              <FormControl
                isRequired
                isInvalid={errors.first_name ? true : false}
              >
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

              <FormControl
                isRequired
                isInvalid={errors.last_name ? true : false}
              >
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

              <FormControl isRequired isInvalid={!!errors.date_of_birth}>
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

              <FormControl
                isRequired
                isInvalid={errors.password ? true : false}
              >
                <FormLabel
                  fontSize={"lg"}
                  fontWeight={"medium"}
                  color={"black.900"}
                >
                  Senha
                </FormLabel>
                <Input
                  placeholder="Digite sua senha..."
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
              disabled={loadingRegister}
            >
              {loadingRegister ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </form>
          <Flex gap={"10px"}>
            <Text fontSize={"md"}>Já possui conta?</Text>
            <ChakraLink
              as={RouterLink}
              to="/login"
              textDecoration="underline"
              fontSize={"md"}
            >
              Entre
            </ChakraLink>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export { Register };
