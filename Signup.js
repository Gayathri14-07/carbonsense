import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaGithub, FaMicrosoft } from 'react-icons/fa';


export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (email && password) {
      // Dummy signup logic
      localStorage.setItem('userEmail', email);
      navigate('/dashboard');
    } else {
      alert('Please enter email and password');
    }
  };

  return (
    <Container fluid className="login-signup-page">
      <Row className="min-vh-100">
        {/* Left image section */}
        <Col
          md={6}
          className="d-none d-md-block p-0"
          style={{
            
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh'
          }}
        ></Col>

        {/* Right form section */}
        <Col md={6} className="d-flex justify-content-center align-items-center bg-black">
          <motion.div
            className="form-card p-4"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            style={{ width: '100%', maxWidth: '400px' }}
          >
            <h2 className="neon-text mb-4 text-center">Sign Up</h2>

            <Form onSubmit={handleSignup}>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-dark text-white border-0 border-bottom border-primary placeholder-white"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-dark text-white border-0 border-bottom border-primary placeholder-white"
                  required
                />
              </Form.Group>

              <Button
                type="submit"
                className="w-100 py-2 neon-btn mb-3"
                style={{
                  background: 'linear-gradient(90deg, #00FFFF, #FF00FF)',
                  border: 'none',
                  fontWeight: 'bold',
                  color: '#111'
                }}
              >
                Sign Up
              </Button>
            </Form>

            <p className="text-center mb-2 text-white">Or sign up with</p>
            <Button className="w-100 mb-2 social-btn" style={{ background: '#DB4437', border: 'none' }}>
              <FaGoogle /> &nbsp; Google
            </Button>
            <Button className="w-100 mb-2 social-btn" style={{ background: '#0078D7', border: 'none' }}>
              <FaMicrosoft /> &nbsp; Microsoft
            </Button>
            <Button className="w-100 mb-2 social-btn" style={{ background: '#333', border: 'none' }}>
              <FaGithub /> &nbsp; GitHub
            </Button>

            <p className="mt-3 text-center text-white">
              Already have an account?{' '}
              <Button
                variant="link"
                onClick={() => navigate('/login')}
                style={{ color: '#00FFFF', textDecoration: 'none' }}
              >
                Login
              </Button>
            </p>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}