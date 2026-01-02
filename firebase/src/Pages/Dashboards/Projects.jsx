import React, { useEffect, useState } from "react";
import { Card, Button, Table, Modal, Form, Input, Space, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();

  const fetchProjects = async () => {
    const snap = await getDocs(collection(db, "projects"));
    setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (values) => {
    if (editing) {
      await updateDoc(doc(db, "projects", editing.id), values);
      message.success("Project updated");
    } else {
      await addDoc(collection(db, "projects"), values);
      message.success("Project added");
    }
    form.resetFields();
    setEditing(null);
    setOpen(false);
    fetchProjects();
  };

  const columns = [
    { title: "Name", dataIndex: "project_name" },
    { title: "Description", dataIndex: "project_description" },
    {
      title: "Actions",
      render: (_, r) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => {
            setEditing(r);
            form.setFieldsValue(r);
            setOpen(true);
          }} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={async () => {
              await deleteDoc(doc(db, "projects", r.id));
              fetchProjects();
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Projects"
      extra={<Button type="primary" onClick={() => setOpen(true)}>Add Project</Button>}
    >
      <Table dataSource={projects} columns={columns} rowKey="id" />

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        title={editing ? "Edit Project" : "Add Project"}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="project_name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="project_description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="project_image" label="Image URL" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Save
          </Button>
        </Form>
      </Modal>
    </Card>
  );
};

export default Projects;
