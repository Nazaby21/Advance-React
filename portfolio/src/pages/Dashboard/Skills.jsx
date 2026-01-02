import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  message,
  Typography,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";

const { Title } = Typography;

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  const [form] = Form.useForm();

  // ================= FETCH SKILLS =================
  const fetchSkills = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "skills"));
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSkills(list);
    } catch (err) {
      message.error("Failed to load skills");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // ================= ADD / UPDATE =================
  const handleSubmit = async (values) => {
    try {
      if (editingSkill) {
        await updateDoc(doc(db, "skills", editingSkill.id), values);
        message.success("Skill updated");
      } else {
        await addDoc(collection(db, "skills"), values);
        message.success("Skill added");
      }
      setOpen(false);
      setEditingSkill(null);
      form.resetFields();
      fetchSkills();
    } catch (err) {
      message.error("Something went wrong");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "skills", id));
    message.success("Skill deleted");
    fetchSkills();
  };

  // ================= TABLE =================
  const columns = [
    {
      title: "Skill",
      dataIndex: "skill_name",
    },
    {
      title: "Experience",
      dataIndex: "experience",
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingSkill(record);
              form.setFieldsValue(record);
              setOpen(true);
            }}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Card style={{ borderRadius: 12 }}>
      <Space
        style={{ width: "100%", justifyContent: "space-between" }}
        align="center"
      >
        <Title level={4}>Skills</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingSkill(null);
            form.resetFields();
            setOpen(true);
          }}
        >
          Add Skill
        </Button>
      </Space>

      <Table
        style={{ marginTop: 20 }}
        columns={columns}
        dataSource={skills}
        rowKey="id"
        loading={loading}
      />

      {/* MODAL */}
      <Modal
        title={editingSkill ? "Edit Skill" : "Add Skill"}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Skill Name"
            name="skill_name"
            rules={[{ required: true, message: "Enter skill name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Experience"
            name="experience"
            rules={[{ required: true, message: "Enter experience" }]}
          >
            <Input placeholder="e.g. 2 years" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            {editingSkill ? "Update Skill" : "Add Skill"}
          </Button>
        </Form>
      </Modal>
    </Card>
  );
};

export default Skills;
