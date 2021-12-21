import homeWelcome from "../assets/imgs/homeWelcome.png";
import newAdventure from "../assets/imgs/newAdventure.png";
import car from "../assets/videos/cars.mp4";
import { Container, Row } from "react-bootstrap";
import "../assets/css/buttons.css";

export function Home() {
  return (
    <Container className="text-center">
      <video autoPlay muted loop id="myVideo">
        <source src={car} type="video/mp4" />
      </video>
      <div className="size" >test</div>
      <div className="overlay">
        <div className="swipe">
          <img src={homeWelcome} height="300px" />
          <br />
          <br />
          <a href={"/register"}>
            <img className="zoom" src={newAdventure} height="70px" />
          </a>
        </div>
      </div>
    </Container>
  );
}

export default Home;
