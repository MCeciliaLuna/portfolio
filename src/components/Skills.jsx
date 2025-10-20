import React, { useMemo } from 'react';
import { Tooltip, Row, Col } from 'antd';
import { 
  FaHtml5, 
  FaCss3Alt, 
  FaJs, 
  FaReact, 
  FaChalkboardTeacher 
} from 'react-icons/fa';
import { 
  SiNextdotjs
} from 'react-icons/si';
import { 
  MdGroup, 
  MdDesignServices,
  MdSpeed
} from 'react-icons/md';
import data from '../db/data.json';
import './Skills.css';

const Skills = () => {
  const { skills } = data;

  const iconMap = useMemo(() => ({
    'FaHtml5': <FaHtml5 />,
    'FaCss3Alt': <FaCss3Alt />,
    'FaJs': <FaJs />,
    'FaReact': <FaReact />,
    'SiNextdotjs': <SiNextdotjs />,
    'MdDesignServices': <MdDesignServices />,
    'MdGroup': <MdGroup />,
    'MdSpeed': <MdSpeed />,
    'FaChalkboardTeacher': <FaChalkboardTeacher />
  }), []);

  const getIcon = (iconName) => {
    return iconMap[iconName] || <div className="default-icon">?</div>;
  };

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        
        <Row gutter={[30, 30]} justify="center">
          {skills.map((skill, index) => (
            <Col key={index} xs={12} sm={8} md={6} lg={6} xl={4}>
              <Tooltip 
                title={skill.tooltip} 
                placement="bottom"
                color="#6f2dbd"
              >
                <div className="skill-item hover-scale">
                  <div className="skill-icon">
                    {getIcon(skill.icon)}
                  </div>
                  <span className="skill-name">{skill.name}</span>
                </div>
              </Tooltip>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default Skills;