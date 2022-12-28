import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";

import ceem from "../media/UNSWCEEMLogoTransparent.png";
import dgfi from "../media/DGFILogo.gif";
import unsw from "../media/unswlogo.jpg";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="about text-center" >
      <header></header>
      <main>
        <Container style={{marginTop: 30, }}>
          <Row>
            <h1 class="font-weigh-line">About</h1>
            <p class="mt-1">Nemglo, the NEM Green-energy Load Optimisation tool is an open-source mixed-integer linear program (MILP) which allows users to solve counterfactual operating strategies for a hypothetical flexible load participating in the NEM energy market.
          Case studies can be constructed using this tool which provides the ability to study techno-economic-environmental considerations of a flexible load such as a Hydrogen Electrolyser or large C&I consumer, in a historical period and NEM region.<br></br><br></br>
          </p>
          </Row>
            <br></br>
          <Row>
            <h1 class="font-weigh-line">Disclaimer</h1>
            <a href="https://github.com/dec-heim/NEMGLO/blob/main/LICENSE" target="_blank">
              <p class="mt-1">See the NEMGLO licence here</p>
            </a>
          </Row>
          <br></br>
          <Row>
            <h1 class="font-weigh-line">Distribution Licence</h1>
            <a href="https://github.com/dec-heim/NEMGLO/blob/main/LICENSE" target="_blank">
              <p class="mt-1">See the NEMGLO licence here</p>
            </a>
          </Row>
          <br></br>
          <Row>
            <h1 class="font-weigh-line">Contact</h1>
            <p class="mt-1">
              Prof. Iain MacGill, UNSW CEEM, i.macgill@unsw.edu.au
            </p>
          </Row>
          <br></br>
          <Row>
            <h1 class="font-weigh-line">Citation</h1>
            <p class="mt-1">
              D.Heim, J.Anand, I.MacGill (2022). NEMGLO
              Tool v1.0, UNSW
            </p>
          </Row>
          <br></br>
          <Row>
            <h1 class="font-weigh-line">Development Team</h1>
            <p class="mt-1">
              Declan Heim (Lead Developer) <br />
              Jay Anand (Co Developer) <br />
              Iain MacGill (Project Supervisor) <br />
            </p>
          </Row>
          <div className="text-center">
            <Row
              className="px-4 my-5"
              style={{
                alignItems: "center",
              }}
            >
              <Col sm={4}>
                <Image src={unsw} fluid rounded width="200" />
              </Col>
              <Col sm={4}>
                <Image src={ceem} fluid rounded width="250" />
              </Col>
              <Col sm={4}>
                <Image src={dgfi} fluid rounded width="250" />
              </Col>
            </Row>
          </div>
        </Container>
      </main>
      <Footer></Footer>
    </div>
  );
}
