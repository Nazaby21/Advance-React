import React, { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Card, Input, Button, Typography, Space, message } from "antd";

const { Title } = Typography;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      message.error("Please enter email and password");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in:", userCredential.user);
      message.success("Login successful!");
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f0f2f5",
      }}
    >
      <Card style={{ width: 350, padding: 24, borderRadius: 12 }}>
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          Admin Login
        </Title>
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="large"
          />
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="large"
          />
          <Button type="primary" block size="large" onClick={handleLogin}>
            Login
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default Login;
