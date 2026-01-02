import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Avatar,
  Space,
  Tag,
  Card,
  Spin,
  Image,
  Divider,
  Empty,
} from "antd";
import { MailOutlined } from "@ant-design/icons";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const { Title, Text, Paragraph } = Typography;

// Style for profile card and project cards
const neonCard = {
  background: "#1b1b38",
  border: "1px solid rgba(139,92,246,0.4)",
  borderRadius: 20,
  boxShadow: "0 8px 24px rgba(139,92,246,0.5)",
  transition: "all 0.3s ease",
};

const Portfolio = () => {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const profileSnap = await getDoc(doc(db, "profile", "main"));
        if (profileSnap.exists()) setProfile(profileSnap.data());

        const skillsSnap = await getDocs(collection(db, "skills"));
        setSkills(skillsSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

        const projectSnap = await getDocs(collection(db, "projects"));
        setProjects(projectSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: 150 }}>
        <Spin size="large" />
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0f0f14 0%, #1b0f36 50%, #1e1b4b 100%)",
        padding: "80px 24px",
      }}
    >
      <Row gutter={[48, 48]} style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* PROFILE */}
        <Col xs={24} md={8}>
          <Card style={neonCard} bodyStyle={{ padding: 36 }}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Avatar
                size={140}
                src={profile?.avatar}
                style={{
                  border: "3px solid #8b5cf6",
                  boxShadow: "0 0 20px #8b5cf6",
                  transition: "all 0.3s ease",
                }}
              />

              <div>
                <Title level={2} style={{ color: "#fff", marginBottom: 0 }}>
                  {profile?.name || "Your Name"}
                </Title>
                <Text style={{ color: "#a78bfa", fontSize: 16 }}>
                  {profile?.role || "Your Role"}
                </Text>
              </div>

              <Paragraph style={{ color: "#d4d4d8", lineHeight: 1.8 }}>
                {profile?.bio}
              </Paragraph>

              <Space>
                <MailOutlined style={{ color: "#8b5cf6" }} />
                <Text style={{ color: "#e5e7eb" }}>{profile?.email}</Text>
              </Space>
            </Space>
          </Card>
        </Col>

        {/* CONTENT */}
        <Col xs={24} md={16}>
          {/* SKILLS */}
          <section>
            <Title level={3} style={{ color: "#fff" }}>
              Skills
            </Title>

            {skills.length === 0 ? (
              <Empty description="No skills yet" />
            ) : (
              <Space wrap size={[12, 16]}>
                {skills.map((skill) => (
                  <Tag
                    key={skill.id}
                    style={{
                      background: "#1e0f36",
                      border: "1px solid #8b5cf6",
                      color: "#fff",
                      padding: "8px 16px",
                      borderRadius: 16,
                      fontSize: 14,
                      boxShadow: "0 4px 10px rgba(139,92,246,0.4)",
                    }}
                  >
                    {skill.skill_name} · {skill.experience}
                  </Tag>
                ))}
              </Space>
            )}
          </section>

          <Divider style={{ borderColor: "rgba(255,255,255,0.15)" }} />

          {/* PROJECTS */}
          <section>
            <Title level={3} style={{ color: "#fff", marginBottom: 28 }}>
              Selected Projects
            </Title>

            {projects.length === 0 ? (
              <Empty description="No projects yet" />
            ) : (
              <Row gutter={[28, 28]}>
                {projects.map((project) => (
                  <Col xs={24} sm={12} key={project.id}>
                    <Card
                      hoverable
                      style={{
                        ...neonCard,
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                      }}
                      bodyStyle={{ padding: 16, flexGrow: 1 }}
                      cover={
                        project.project_image && (
                          <div
                            style={{
                              width: "100%",
                              height: 180,
                              overflow: "hidden",
                              borderRadius: 12,
                              marginBottom: 16,
                            }}
                          >
                            <Image
                              src={project.project_image}
                              preview={false}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                transition: "transform 0.3s ease",
                              }}
                            />
                          </div>
                        )
                      }
                    >
                      <Title level={5} style={{ color: "#fff", marginBottom: 8 }}>
                        {project.project_name}
                      </Title>
                      <Paragraph style={{ color: "#ccc" }} ellipsis={{ rows: 3 }}>
                        {project.project_description}
                      </Paragraph>

                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        {project.tags?.map((tag, idx) => (
                          <Tag
                            key={idx}
                            color="purple"
                            style={{
                              borderRadius: 6,
                              fontWeight: 500,
                              boxShadow: "0 2px 6px rgba(139,92,246,0.5)",
                            }}
                          >
                            {tag}
                          </Tag>
                        ))}
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </section>
        </Col>
      </Row>
    </div>
  );
};

export default Portfolio;
