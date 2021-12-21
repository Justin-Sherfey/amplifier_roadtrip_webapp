import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/imgs/logo.png";

export function NavigationBar(props) {

  if (props.authUser === undefined) {
    return null
  }

  function logout(props) {
    sessionStorage.clear();
    props.setAuthUser(undefined);
  }

  const navColor = { backgroundColor: '#111', background: '#111' };
  const btn = { textAlign: 'center' };

  return (
    <>
      <div className="header" >
        <Navbar style={navColor} variant="dark"  >
          <Container >
            <Navbar.Brand as={Link} to="Home" >
              <img src={logo} height="50px" />
            </Navbar.Brand>
            <Nav className="ms-md-auto" >
              {!!props.authUser === false ? (
                <>
                  <Nav.Link as={Link} to="Login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="Register">
                    Register
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="Account">
                    {props.authUser.username}
                  </Nav.Link>
                  <Nav.Link as={Link} to="Trips">
                    Trips
                  </Nav.Link>
                  <Nav.Link onClick={logout} as={Link} to="Home">
                    Log Out
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Container>
        </Navbar>

      </div>
      <Outlet />

    </>
  );
}

export default NavigationBar;
