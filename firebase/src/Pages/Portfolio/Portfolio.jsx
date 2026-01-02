import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Tag,
  Space,
  Spin,
  Button,
  Modal,
  Divider,
} from "antd";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const { Title, Text } = Typography;

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const projectSnapshot = await getDocs(collection(db, "projects"));
        const skillSnapshot = await getDocs(collection(db, "skills"));

        setProjects(
          projectSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        setSkills(
          skillSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 100,
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        margin: "auto",
        maxWidth: 1300,
        padding: "20px",
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          textAlign: "center",
          padding: "120px 10px",
          background: "linear-gradient(130deg, #4A78FF, #6e8efb)",
          color: "#fff",
          borderRadius: 20,
          marginBottom: 60,
        }}
      >
        <Title style={{ color: "#fff", fontSize: "3rem" }}>
          Hi, I'm a Developer
        </Title>
        <Text style={{ fontSize: 20, color: "#e7e7ff" }}>
          I design and build modern web apps using React, Firebase, and more.
        </Text>

        <Space size="large" style={{ marginTop: 30 }}>
          <Button
            type="primary"
            size="large"
            style={{
              background: "#fff",
              color: "#4A78FF",
              borderColor: "transparent",
              fontWeight: 600,
              borderRadius: 8,
              padding: "0 30px",
            }}
            href="#projects"
          >
            View Projects
          </Button>
          <Button
            size="large"
            style={{
              borderRadius: 8,
              borderColor: "#fff",
              color: "#fff",
              borderWidth: 2,
            }}
            href="#skills"
          >
            My Skills
          </Button>
        </Space>
      </section>

      {/* Skills Section */}
      <section id="skills" style={{ marginBottom: 60 }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 30 }}>
          Skills
        </Title>
        <Row justify="center" gutter={[16, 16]}>
          {skills.map((skill) => (
            <Col xs={12} sm={8} md={6} key={skill.id}>
              <Tag
                color="cyan"
                style={{
                  fontSize: 16,
                  padding: "10px 18px",
                  borderRadius: 10,
                  display: "block",
                  textAlign: "center",
                  transition: "transform 0.3s",
                }}
              >
                {skill.skill_name} ({skill.experience})
              </Tag>
            </Col>
          ))}
        </Row>
      </section>

      <Divider />

      {/* Projects Section */}
      <section id="projects" style={{ marginBottom: 60 }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 30 }}>
          Projects
        </Title>
        <Row gutter={[32, 32]}>
          {projects.map((project) => (
            <Col xs={24} sm={12} md={8} key={project.id}>
              <Card
                hoverable
                onClick={() => setSelectedProject(project)}
                cover={
                  project.project_image && (
                    <div
                      style={{
                        overflow: "hidden",
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                      }}
                    >
                      <img
                        src={project.project_image}
                        alt={project.project_name}
                        style={{
                          width: "100%",
                          height: 240,
                          objectFit: "cover",
                          transform: "scale(1)",
                          transition: "transform 0.3s ease-in-out",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.transform = "scale(1.08)")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      />
                    </div>
                  )
                }
                style={{
                  borderRadius: 16,
                  boxShadow: "0 15px 30px rgba(0,0,0,0.135)",
                  cursor: "pointer",
                  transition: "transform 0.3s",
                }}
                bodyStyle={{ padding: 18 }}
              >
                <Title level={4}>{project.project_name}</Title>
                <Text ellipsis={{ tooltip: project.project_description }}>
                  {project.project_description}
                </Text>
                <Button
                  type="link"
                  style={{ padding: 0, marginTop: 10, fontWeight: 600 }}
                  onClick={() => setSelectedProject(project)}
                >
                  View Details →
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Project Detail Modal */}
      <Modal
        open={!!selectedProject}
        footer={null}
        onCancel={() => setSelectedProject(null)}
        width={800}
        bodyStyle={{ borderRadius: 12 }}
      >
        {selectedProject && (
          <>
            <Title>{selectedProject.project_name}</Title>
            <img
              src={selectedProject.project_image}
              alt={selectedProject.project_name}
              style={{
                width: "100%",
                maxHeight: 450,
                objectFit: "cover",
                borderRadius: 12,
                marginBottom: 20,
              }}
            />
            <Text style={{ fontSize: 16 }}>
              {selectedProject.project_description}
            </Text>
          </>
        )}
      </Modal>

      {/* Footer / CTA */}
      <section
        style={{
          textAlign: "center",
          padding: "40px 0",
          background: "#f7f7f7",
          borderRadius: 12,
          marginTop: 50,
        }}
      >
        <Title level={3}>Ready to work with me?</Title>
        <Text>Let’s connect and bring your ideas to life.</Text>
        <div style={{ marginTop: 15 }}>
          <Button
            type="primary"
            size="large"
            href="mailto:your.email@example.com"
            style={{ borderRadius: 10 }}
          >
            Contact Me
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
