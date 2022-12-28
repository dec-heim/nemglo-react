import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Footer from "../components/Footer";

import ceem from "../media/ceemLogo.jpeg";
import dgfi from "../media/DGFILogo.gif";
import dgfilogo from '../media/DGFILogo.gif'
import ceemlogo from '../media/UNSWCEEMLogoTransparent.png'
import unswlogo from '../media/unswlogo.jpg'
import unsw from "../media/unswLogo.png";

function LandingPage() {
  return (
    <div className="LandingPage"  >
      <header></header>
      <main>
      <Container>
      <Row className="px-1 my-5">
        <Col sm={6}>
          <Image src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.incimages.com%2Fuploaded_files%2Fimage%2F1920x1080%2Fgetty_586163548_334517.jpg&f=1&nofb=1&ipt=36b3132ee4337311bb90675be76bdb2c638f80245a8f3127060cee8eb5b631f0&ipo=images" fluid rounded className=""/>
        </Col>
        <Col sm={6}>
          <h1 class="font-weigh-line">National Electricity Market <br></br>Green-Energy Load Optimisation</h1>
          <p class="mt-4">NEMGLO, the Australian NEM Green-energy Load Optimisation tool is a mixed-integer linear program (MILP) which allows users to solve counterfactual operating strategies for a hypothetical flexible load participating in the energy spot market.
          Case studies can be constructed using this tool which provides the ability to study techno-economic-environmental considerations of a flexible load such as a hydrogen electrolyser or large C&I consumer, in historic NEM market conditions.<br></br>
          Curious and Interested? Check out the lite online simulator or for extended functionality see the python package!</p>
          <Button variant="outline-primary" href="/simulator">Go to Simulator</Button>
        </Col>
      </Row>
      <Row>
        <Col sm={1}></Col>
        <Col>
        <Card style={{width: "18rem"}}>
          <Card.Img variant="top" src="https://images.unsplash.com/photo-1490775949603-0e355e8e01ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1466&q=80"></Card.Img>
          <Card.Body>
            <Card.Title>Getting Started</Card.Title>
            <Card.Text>A quick start guide, tutorial page and walkthrough of the NEMGLO online Simulator.</Card.Text>
            <Button variant="secondary" disabled={true}>Coming Soon</Button>
          </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card style={{width: "18rem"}}>
          <Card.Img variant="top" src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"></Card.Img>
          <Card.Body>
            <Card.Title>Python Package</Card.Title>
            <Card.Text>Check out the GitHub Repository for advanced use of the tool & full customisability.</Card.Text>
            <a href="https://github.com/dec-heim/NEMGLO" target="_blank">
              <Button variant="primary">GitHub Repo</Button>
            </a>
          </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card style={{width: "18rem"}}>
          <Card.Img variant="top" src="https://images.unsplash.com/photo-1647166545674-ce28ce93bdca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"></Card.Img>
          <Card.Body>
            <Card.Title>Python Documentation</Card.Title>
            <Card.Text>See the readthedocs for NEMGLO python package documentation with examples.</Card.Text>
            <a href="https://nemglo.readthedocs.io/en/latest/" target="_blank">
              <Button variant="primary">Read the Docs</Button>
            </a>
          </Card.Body>
        </Card>
        </Col>
      </Row>
      <Row>
        <Card className="text-center bg-white text-black my-5 py-4">
          <Card.Body>
            <h2 class="font-weigh-line">Acknowledgements</h2>
            <Container>
              <Row>
                <Col sm={4}>
                  <a href="https://www.unsw.edu.au/engineering" target="_blank">
                    <img src={unswlogo} alt="unswlogo" width={180} ></img>
                  </a>
                </Col>
                <Col sm={4}>
                  <br></br>
                  <a href="https://www.ceem.unsw.edu.au/" target="_blank">
                    <img src={ceemlogo} alt="ceemlogo" width={220}></img>
                  </a>
                </Col>
                <Col sm={4}>
                  <br></br>
                  <a href="https://www.dgfi.unsw.edu.au/" target="_blank">
                    <img src={dgfilogo} alt="dgfilogo" width={200}></img>
                  </a>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </Row>
    </Container>
      </main>
      <Footer></Footer>
      {/* <footer class="py-5 my-5 bg-dark" justify="center">
        <Container className="px-4" justify="center">
          <p class="text-center text-white">Copyright &copy; Declan Heim and Jay Anand, 2022</p>
          <div class="text-center">
            <a href="/about">Licence and Disclaimer</a>
          </div>
        </Container>
      </footer> */}
    </div>
  );
}

export default LandingPage;
