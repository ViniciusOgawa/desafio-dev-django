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
import { contactSchema } from "./schema";
import InputMask from "react-input-mask";

const FormContact = () => {
  const {
    loadingRegisterContact,
    userContact,
    createContact,
    updateContact,
    fetchUserData,
  } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(contactSchema),
  });

  useEffect(() => {
    if (userContact && userContact.length > 0) {
      const contactData = userContact[0];

      Object.keys(contactData).forEach((key) => {
        if (setValue) {
          setValue(key, contactData[key], { shouldValidate: true });
        }
      });
    }
  }, [userContact, setValue]);

  const submit = (data) => {
    fetchUserData();
    if (userContact && userContact.length > 0) {
      updateContact(userContact[0].id, data);
    } else {
      createContact(data);
    }
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
          <FormControl
            isRequired
            isInvalid={errors.phone_number ? true : false}
          >
            <FormLabel
              fontSize={"lg"}
              fontWeight={"medium"}
              color={"black.900"}
            >
              Número de telefone
            </FormLabel>
            <InputMask
              mask="(99) 99999-9999"
              {...register("phone_number")}
              maskChar={null}
            >
              {(inputProps) => (
                <Input
                  {...inputProps}
                  placeholder="Digite seu número de telefone..."
                  h={"30px"}
                  w={"100%"}
                  fontSize={"md"}
                  fontWeight={"medium"}
                />
              )}
            </InputMask>
            <FormErrorMessage fontSize={"lg"}>
              {errors.phone_number?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={errors.city ? true : false}>
            <FormLabel
              fontSize={"lg"}
              fontWeight={"medium"}
              color={"black.900"}
            >
              Cidade
            </FormLabel>
            <Input
              placeholder="Digite sua cidade..."
              h={"30px"}
              w={"100%"}
              fontSize={"md"}
              fontWeight={"medium"}
              {...register("city")}
            />
            <FormErrorMessage fontSize={"lg"}>
              {errors.city?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={errors.state ? true : false}>
            <FormLabel
              fontSize={"lg"}
              fontWeight={"medium"}
              color={"black.900"}
            >
              Estado
            </FormLabel>
            <Input
              placeholder="Digite seu estado..."
              h={"30px"}
              w={"100%"}
              fontSize={"md"}
              fontWeight={"medium"}
              {...register("state")}
            />
            <FormErrorMessage fontSize={"lg"}>
              {errors.state?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={errors.street ? true : false}>
            <FormLabel
              fontSize={"lg"}
              fontWeight={"medium"}
              color={"black.900"}
            >
              Rua
            </FormLabel>
            <Input
              placeholder="Digite sua rua..."
              h={"30px"}
              w={"100%"}
              fontSize={"md"}
              fontWeight={"medium"}
              {...register("street")}
            />
            <FormErrorMessage fontSize={"lg"}>
              {errors.street?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={errors.number ? true : false}>
            <FormLabel
              fontSize={"lg"}
              fontWeight={"medium"}
              color={"black.900"}
            >
              Número
            </FormLabel>
            <Input
              placeholder="Digite o número do endereço..."
              h={"30px"}
              w={"100%"}
              fontSize={"md"}
              fontWeight={"medium"}
              {...register("number")}
            />
            <FormErrorMessage fontSize={"lg"}>
              {errors.number?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={errors.neighborhood ? true : false}
          >
            <FormLabel
              fontSize={"lg"}
              fontWeight={"medium"}
              color={"black.900"}
            >
              Bairro
            </FormLabel>
            <Input
              placeholder="Digite o número do endereço..."
              h={"30px"}
              w={"100%"}
              fontSize={"md"}
              fontWeight={"medium"}
              {...register("neighborhood")}
            />
            <FormErrorMessage fontSize={"lg"}>
              {errors.neighborhood?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={errors.postal_code ? true : false}>
            <FormLabel
              fontSize={"lg"}
              fontWeight={"medium"}
              color={"black.900"}
            >
              Código Postal
            </FormLabel>
            <InputMask
              mask="99999-999"
              {...register("postal_code")}
              maskChar={null}
            >
              {(inputProps) => (
                <Input
                  {...inputProps}
                  h={"30px"}
                  w={"100%"}
                  fontSize={"md"}
                  fontWeight={"medium"}
                  placeholder="Digite o código postal..."
                />
              )}
            </InputMask>
            <FormErrorMessage fontSize={"lg"}>
              {errors.postal_code?.message}
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
          disabled={loadingRegisterContact}
        >
          {loadingRegisterContact ? "Salvando..." : "Salvar"}
        </Button>
      </form>
    </Flex>
  );
};

export { FormContact };
