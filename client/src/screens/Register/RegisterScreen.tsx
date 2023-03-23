import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm";
import { CREATE_USER } from "../../services/user.mutation";

function Register() {
  const [form, setForm] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [register, { loading, error }] = useMutation(CREATE_USER, {
    onCompleted(data) {
      console.log("DATA", data);
      navigate("/auth/login");
    },
  });

  useEffect(() => {
    console.log("FORM", form);
  }, [form]);

  const handleSubmit = (e: any) => {
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
    });
  };

  return (
    <div>
      <RegisterForm setForm={setForm} handleSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
