import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

function NotFound() {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-black text-white">
      <h1 className="neon-text mb-4">404</h1>
      <h3 className="neon-text mb-4">Page Not Found</h3>
      <Link to="/login">
        <Button className="btn btn-primary glow">Go to Login</Button>
      </Link>
    </Container>
  );
}

export default NotFound;
