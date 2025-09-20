import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaGithub, FaMicrosoft } from 'react-icons/fa';
import loginImage from '../assets/login-image.jpg'; // ✅ Make sure the image exists

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy login validation
    if (email && password) {
      // Save user info in localStorage (optional)
      localStorage.setItem('userEmail', email);

      // Navigate to Dashboard page
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
            backgroundImage: `url(${loginImage})`,
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
            <h2 className="neon-text mb-4 text-center">Login</h2>

            <Form onSubmit={handleLogin}>
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
                Login
              </Button>
            </Form>

            <p className="text-center mb-2 text-white">Or login with</p>
            <Button className="w-100 mb-2 social-btn" style={{ background: '#DB4437', border: 'none' }}>
              <FaGoogle /> &nbsp; Login with Google
            </Button>
            <Button className="w-100 mb-2 social-btn" style={{ background: '#0078D7', border: 'none' }}>
              <FaMicrosoft /> &nbsp; Login with Microsoft
            </Button>
            <Button className="w-100 mb-2 social-btn" style={{ background: '#333', border: 'none' }}>
              <FaGithub /> &nbsp; Login with GitHub
            </Button>

            <p className="mt-3 text-center text-white">
              Don’t have an account?{' '}
              <Button
                variant="link"
                onClick={() => navigate('/signup')}
                style={{ color: '#00FFFF', textDecoration: 'none' }}
              >
                Sign Up
              </Button>
            </p>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}
