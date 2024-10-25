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
import { loginSchema } from "./schema";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Login = () => {
  const { userLogin, loadingLogin } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(loginSchema),
  });

  const submit = (data) => {
    userLogin(data);
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
            Login
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
              disabled={loadingLogin}
            >
              {loadingLogin ? "Entrando..." : "Entrar"}
            </Button>
          </form>
          <Flex gap={"10px"}>
            <Text fontSize={"md"}>Não possui conta?</Text>
            <ChakraLink
              as={RouterLink}
              to="/register"
              textDecoration="underline"
              fontSize={"md"}
            >
              Cadastre-se
            </ChakraLink>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export { Login };
