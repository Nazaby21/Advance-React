import React, { useEffect } from "react";
import { Card, Form, Input, Button, message } from "antd";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Profile = () => {
  const [form] = Form.useForm();

  // Load existing profile
  useEffect(() => {
    const fetchProfile = async () => {
      const snap = await getDoc(doc(db, "profile", "main"));
      if (snap.exists()) {
        form.setFieldsValue(snap.data());
      }
    };
    fetchProfile();
  }, [form]);

  const onFinish = async (values) => {
    try {
      await setDoc(doc(db, "profile", "main"), values);
      message.success("Profile updated successfully");
    } catch (err) {
      console.error(err);
      message.error("Failed to update profile");
    }
  };

  return (
    <Card title="Personal Information" style={{ maxWidth: 600 }}>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Role / Title"
          name="role"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Bio"
          name="bio"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Avatar Image URL"
          name="avatar"
          rules={[{ required: true }]}
        >
          <Input placeholder="https://image-url.com/photo.jpg" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Save Profile
        </Button>
      </Form>
    </Card>
  );
};

export default Profile;
