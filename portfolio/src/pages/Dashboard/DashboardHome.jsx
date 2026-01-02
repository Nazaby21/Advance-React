import React, { useEffect, useState } from "react";
import { Card, Col, Row, Typography, Space } from "antd";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { RocketOutlined, CodeOutlined, MessageOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const cardStyle = {
  borderRadius: 16,
  padding: "24px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  transition: "transform 0.3s",
  cursor: "pointer",
  background: "#fff",
};

const iconStyle = {
  fontSize: 36,
  color: "#6e8efb",
};

const DashboardHome = () => {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const p = await getDocs(collection(db, "projects"));
      const s = await getDocs(collection(db, "skills"));
      setProjects(p.docs);
      setSkills(s.docs);
    };
    fetchData();
  }, []);

  const cards = [
    {
      title: "Projects",
      value: projects.length,
      subtitle: "Total portfolio projects",
      icon: <RocketOutlined style={iconStyle} />,
      color: "#6e8efb",
    },
    {
      title: "Skills",
      value: skills.length,
      subtitle: "Total skills listed",
      icon: <CodeOutlined style={iconStyle} />,
      color: "#f093fb",
    },
    {
      title: "Messages",
      value: 5,
      subtitle: "Unread contacts",
      icon: <MessageOutlined style={iconStyle} />,
      color: "#f6d365",
    },
  ];

  return (
    <div style={{ padding: 24, minHeight: "100vh", background: "#f0f2f5" }}>
      <Title level={2} style={{ marginBottom: 32 }}>
        Welcome Back, Admin!
      </Title>
      <Row gutter={[24, 24]}>
        {cards.map((card) => (
          <Col xs={24} md={8} key={card.title}>
            <Card
              hoverable
              style={{
                ...cardStyle,
                borderLeft: `5px solid ${card.color}`,
              }}
              bodyStyle={{ padding: 24 }}
            >
              <Space align="center" style={{ width: "100%", justifyContent: "space-between" }}>
                <div>
                  <Title level={5} style={{ marginBottom: 8 }}>
                    {card.title}
                  </Title>
                  <Title level={2}>{card.value}</Title>
                  <Text type="secondary">{card.subtitle}</Text>
                </div>
                {card.icon}
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DashboardHome;
