import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";

import ceem from "../media/ceemLogo.jpeg";
import dgfi from "../media/DGFILogo.gif";
import unsw from "../media/unswLogo.png";

export default function About() {
  return (
    <div className="about text-center" >
      <header></header>
      <main>
        <Container style={{marginTop: 30, }}>
          <Row>
            <h1 class="font-weigh-line">About</h1>
            <p class="mt-1">Nemglo is an open source tool...</p>
          </Row>
            <br></br>
          <Row>
            <h1 class="font-weigh-line">Disclaimer</h1>
            <p class="mt-1">This tool is not liable for...</p>
          </Row>
          <br></br>
          <Row>
            <h1 class="font-weigh-line">Distribution Licence</h1>
            <p class="mt-1">This tool is not liable for...</p>
          </Row>
          <br></br>
          <Row>
            <h1 class="font-weigh-line">Contact</h1>
            <p class="mt-1">
              Prof. Ian MacGill, UNSW CEEM, i.macgill@unsw.edu.au
            </p>
          </Row>
          <br></br>
          <Row>
            <h1 class="font-weigh-line">Citation</h1>
            <p class="mt-1">
              D.Heim, J.Sheppard, J.Anand, I.MacGill, R.Daiyan (2022). NEMGLO
              Tool v1.0, UNSW
            </p>
          </Row>
          <br></br>
          <Row>
            <h1 class="font-weigh-line">Development Team</h1>
            <p class="mt-1">
              Declan Heim (Lead Developer) <br />
              Jack Sheppard (Co Developer) <br />
              Jay Anand (Co Developer) <br />
              Ian MacGill (Project Supervisor) <br />
              Rahman Daiyan (Project Supervisor) <br />
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
                <Image src={unsw} fluid rounded width="250" />
              </Col>
              <Col sm={4}>
                <Image src={dgfi} fluid rounded width="250" />
              </Col>
              <Col sm={4}>
                <Image src={ceem} fluid rounded width="250" />
              </Col>
            </Row>
          </div>
        </Container>
      </main>
      <footer class="py-5 my-5 bg-dark">
        <Container className="px-4">
          <p class="text-center text-white">
            Copyright &copy; www.nemglo.com.au 2022
          </p>
        </Container>
      </footer>
    </div>
  );
}
