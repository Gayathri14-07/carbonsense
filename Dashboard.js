// Dashboard.js
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { FaRobot, FaCoins } from "react-icons/fa";

export default function Dashboard() {
  const [activities, setActivities] = useState([]);
  const [totalCO2, setTotalCO2] = useState(0);
  const [carbonCoins, setCarbonCoins] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [floatingCoins, setFloatingCoins] = useState([]);

  const activityTypes = ["AI", "Streaming", "Browsing", "Storage", "Crypto", "SmartCity"];

  // Live demo activity generator
  useEffect(() => {
    const interval = setInterval(() => {
      const randomType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
      const randomCO2 = Math.random() * 0.05; // small random CO2 emission
      const newActivity = {
        activityType: randomType,
        description: `Demo ${randomType} activity`,
        co2EmittedKg: randomCO2,
        timestamp: Date.now()
      };

      setActivities((prev) => [...prev, newActivity]);
      setTotalCO2((prev) => prev + randomCO2);

      const coinsAdded = Math.max(1, Math.floor(randomCO2 * 100));
      setCarbonCoins((prev) => prev + coinsAdded);

      setFloatingCoins((prev) => [...prev, ...Array(coinsAdded).fill(0)]);

      setChartData((prev) => [
        ...prev.slice(-19),
        { time: new Date(newActivity.timestamp).toLocaleTimeString(), CO2: newActivity.co2EmittedKg }
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, [activityTypes]);

  return (
    <Container className="min-vh-100 bg-dark text-light py-4 position-relative">
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
              setFloatingCoins((prev) => prev.filter((_, i) => i !== index))
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
            <FaCoins size={40} className="mb-2 animate-spin" />
            <h5 className="neon-text">CarbonCoins</h5>
            <p>{carbonCoins}</p>
          </Card>
        </Col>
      </Row>

      {/* CO₂ Chart */}
      <Row className="mb-4">
        <Col>
          <Card className="neon-card p-3">
            <h5 className="neon-text mb-3">Live CO₂ Emissions (kg)</h5>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid stroke="#00FFFF" strokeDasharray="5 5" />
                <XAxis dataKey="time" stroke="#00FFFF" />
                <YAxis stroke="#00FFFF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111",
                    border: "1px solid #00FFFF",
                    color: "#00FFFF"
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="CO2"
                  stroke="#FF00FF"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Activities Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        <Table striped bordered hover variant="dark" className="neon-card">
          <thead>
            <tr>
              <th>Type</th>
              <th>Description</th>
              <th>CO₂ (kg)</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((act, idx) => (
              <tr key={idx}>
                <td>{act.activityType}</td>
                <td>{act.description}</td>
                <td>{act.co2EmittedKg.toFixed(5)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </motion.div>
    </Container>
  );
}
