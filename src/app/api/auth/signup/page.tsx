'use client'

import { RegisterForm, registerUser } from "@/libs/authService";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUpPage = () => {
  const router = useRouter();

  const [userInput, setUserInput] = useState<RegisterForm>({
    email: "",
    password: "",
    name: "",
    tel: "",
  });

  const [feedBack, setFeedBack] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedBack("");

    const user = await registerUser(userInput);
    if (user) {
        if (user.success === false) {
            setFeedBack(user.msg || "Registration failed");
            return;
        }
      const response = await signIn("credentials", {
        email: userInput.email,
        password: userInput.password,
        redirect: false,
      });
      if (response?.error) {
        setFeedBack("Registration Success, but Login failed");
      } else {
        setFeedBack("Login successful");
      }
      router.push("/");
    } else {
      setFeedBack("Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {feedBack && <p>{feedBack}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={userInput.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="tel"
            placeholder="Phone Number"
            value={userInput.tel}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userInput.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userInput.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          ></button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
