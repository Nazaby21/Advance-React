import React, { useEffect, useState } from "react";
import { Card, Col, Row, Typography } from "antd";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const { Title, Text } = Typography;

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

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} md={8}>
        <Card>
          <Title level={5}>Projects</Title>
          <Title level={2}>{projects.length}</Title>
          <Text type="secondary">Total projects</Text>
        </Card>
      </Col>

      <Col xs={24} md={8}>
        <Card>
          <Title level={5}>Skills</Title>
          <Title level={2}>{skills.length}</Title>
          <Text type="secondary">Total skills</Text>
        </Card>
      </Col>

      <Col xs={24} md={8}>
        <Card>
          <Title level={5}>Messages</Title>
          <Title level={2}>5</Title>
          <Text type="secondary">Unread</Text>
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardHome;
