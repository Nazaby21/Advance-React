import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Table,
  Modal,
  Form,
  Input,
  Space,
  message,
  Image,
} from "antd";
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
  const [previewUrl, setPreviewUrl] = useState("");

  // Fetch projects from Firestore
  const fetchProjects = async () => {
    const snap = await getDocs(collection(db, "projects"));
    setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle form submit
  const handleSubmit = async (values) => {
    try {
      if (!values.project_image) {
        message.error("Please enter an image URL");
        return;
      }

      const projectData = {
        project_name: values.project_name,
        project_description: values.project_description,
        project_image: values.project_image,
      };

      if (editing) {
        const docRef = doc(db, "projects", editing.id);
        await updateDoc(docRef, projectData);
        message.success("Project updated successfully!");
      } else {
        await addDoc(collection(db, "projects"), projectData);
        message.success("Project added successfully!");
      }

      form.resetFields();
      setPreviewUrl("");
      setEditing(null);
      setOpen(false);
      fetchProjects();
    } catch (err) {
      console.error(err);
      message.error("Error saving project");
    }
  };

  const columns = [
    { title: "Name", dataIndex: "project_name" },
    { title: "Description", dataIndex: "project_description" },
    {
      title: "Image",
      dataIndex: "project_image",
      render: (url) =>
        url ? <Image src={url} alt="project" width={100} /> : "No Image",
    },
    {
      title: "Actions",
      render: (_, r) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditing(r);
              form.setFieldsValue(r);
              setPreviewUrl(r.project_image || "");
              setOpen(true);
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={async () => {
              await deleteDoc(doc(db, "projects", r.id));
              message.success("Project deleted");
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
      extra={
        <Button
          type="primary"
          onClick={() => {
            setEditing(null);
            form.resetFields();
            setPreviewUrl("");
            setOpen(true);
          }}
        >
          Add Project
        </Button>
      }
    >
      <Table dataSource={projects} columns={columns} rowKey="id" />

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        title={editing ? "Edit Project" : "Add Project"}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="project_name"
            label="Project Name"
            rules={[{ required: true, message: "Please enter project name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="project_description"
            label="Project Description"
            rules={[{ required: true, message: "Please enter project description" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name="project_image"
            label="Image URL"
            rules={[{ required: true, message: "Please enter image URL" }]}
          >
            <Input
              placeholder="https://example.com/image.jpg"
              onChange={(e) => setPreviewUrl(e.target.value)}
            />
          </Form.Item>

          {previewUrl && (
            <div style={{ marginBottom: 10 }}>
              <strong>Preview:</strong>
              <br />
              <Image src={previewUrl} alt="preview" width={200} />
            </div>
          )}

          <Button type="primary" htmlType="submit" block>
            {editing ? "Update Project" : "Add Project"}
          </Button>
        </Form>
      </Modal>
    </Card>
  );
};

export default Projects;
