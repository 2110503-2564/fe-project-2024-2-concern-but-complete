"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedBack, setFeedBack] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedBack("");
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (response?.error) {
      setFeedBack("Login failed");
    } else {
      setFeedBack("Login successful");
      router.push("/");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-primary p-4 text-bg">
          Login
        </button>
        {feedBack && <p>{feedBack}</p>}
      </div>
    </form>
  );
};

export default LoginPage;
