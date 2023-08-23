import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm";
import { CREATE_USER } from "../../services/user.mutation";

function Register() {
  const [form, setForm] = useState<RegisterForm>({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
  });

  const navigate = useNavigate();
  const [register, { loading, error }] = useMutation(CREATE_USER, {
    onCompleted(data) {
      navigate("/");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register({
      variables: {
        createUserInput: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
        },
      },
    }).catch((error) => console.log(error));
  };

  return (
    <div>
      <RegisterForm setForm={setForm} handleSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
