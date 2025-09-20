import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Row, Col, Card, Table, Tabs, Tab } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { FaRobot, FaBolt, FaCoins } from "react-icons/fa";
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase"; // Your Firestore DB

export default function Dashboard() {
  const [activities, setActivities] = useState([]);
  const [totalCO2, setTotalCO2] = useState(0);
  const [carbonCoins, setCarbonCoins] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [floatingCoins, setFloatingCoins] = useState([]);
  const [activeTab, setActiveTab] = useState("AI");

  useEffect(() => {
    // Listen to all activities in real-time, latest 100
    const q = query(collection(db, "aiUsage"), orderBy("timestamp", "desc"), limit(100));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data());

      setActivities(data);

      // Total CO2
      const total = data.reduce((sum, item) => sum + (item.estimated_kg || 0), 0);
      setTotalCO2(total);

      // CarbonCoins
      const coins = data.reduce((sum, item) => sum + Math.max(1, Math.floor((item.estimated_kg || 0) * 100)), 0);
      setCarbonCoins(coins);

      // Floating coins effect
      setFloatingCoins(prev => [...prev, ...Array(Math.min(5, data.length)).fill(0)]);

      // Chart data for active tab
      const chartPoints = data
        .filter(item => item.activityType === activeTab)
        .slice(-20)
        .map(item => ({
          time: new Date(item.timestamp?.seconds * 1000 || Date.now()).toLocaleTimeString(),
          CO2: item.estimated_kg || 0
        }));
      setChartData(chartPoints);
    });

    return () => unsubscribe();
  }, [activeTab]);

  return (
    <Container fluid className="min-vh-100 bg-dark text-light py-4 position-relative">
      {/* Floating Coins Animation */}
      <AnimatePresence>
        {floatingCoins.map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 1, y: 0, x: Math.random() * 100 - 50 }}
            animate={{ y: -150, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              position: "absolute",
              bottom: 100,
              left: "50%",
              fontSize: 20,
              color: "#00FFFF",
              pointerEvents: "none",
              zIndex: 999
            }}
            onAnimationComplete={() =>
              setFloatingCoins(prev => prev.filter((_, i) => i !== index))
            }
          >
            💰
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Dashboard Title */}
      <motion.h1
        className="text-center mb-4 neon-text"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Digital Carbon Dashboard
      </motion.h1>

      {/* Top Cards */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center p-3 neon-card mb-3">
            <FaRobot size={40} className="mb-2 animate-bounce" />
            <h5 className="neon-text">Total CO₂</h5>
            <p>{totalCO2.toFixed(5)} kg</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center p-3 neon-card mb-3">
            <FaBolt size={40} className="mb-2 animate-pulse" />
            <h5 className="neon-text">Total Events</h5>
            <p>{activities.length}</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center p-3 neon-card mb-3 position-relative">
            <FaCoins size={40} className="mb-2 animate-spin" />
            <h5 className="neon-text">CarbonCoins</h5>
            <p>{carbonCoins}</p>
          </Card>
        </Col>
      </Row>

      {/* Tabs for activity types */}
      <Tabs activeKey={activeTab} onSelect={k => setActiveTab(k)} className="mb-3">
        {["AI","Streaming","Browsing","Storage","Crypto","SmartCity"].map(type => (
          <Tab eventKey={type} title={type} key={type}>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Description</th>
                  <th>CO₂ (kg)</th>
                </tr>
              </thead>
              <tbody>
                {activities.filter(a => a.activityType === type).map((a, idx) => (
                  <tr key={idx}>
                    <td>{a.activityType}</td>
                    <td>{a.description}</td>
                    <td>{(a.estimated_kg || 0).toFixed(5)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Chart for this type */}
            <Card className="neon-card p-3 mt-3">
              <h5 className="neon-text mb-3">{type} CO₂ Chart</h5>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid stroke="#00FFFF" strokeDasharray="5 5" />
                  <XAxis dataKey="time" stroke="#00FFFF" />
                  <YAxis stroke="#00FFFF" />
                  <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #00FFFF", color: "#00FFFF" }} />
                  <Line type="monotone" dataKey="CO2" stroke="#FF00FF" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Tab>
        ))}
      </Tabs>
    </Container>
  );
}
