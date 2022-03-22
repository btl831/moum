import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import styles from '../App.module.css'

export default function Header() {
    return(
        <div className={styles.sticky}>
        <Container>
            <Navbar bg="dark" variant="dark" style={{ height:"62px" }}>
                <Navbar.Brand href="/" >
                <img
                    alt="MOUM"
                    src="/logo.png"
                    height="50px"
                    className="d-inline-block align-top"
                />
                </Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="/chart">TOP 100</Nav.Link>
                <Nav.Link href="/write">Write</Nav.Link>
                </Nav>

                <Button className='primary' href={"/login"}>로그인</Button>
            </Navbar>
        </Container>
        </div>
    )
}

