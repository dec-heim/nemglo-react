import { Button, Col, Container, Image, Row } from "react-bootstrap";

import ceem from "../media/ceemLogo.jpeg";
import dgfi from "../media/DGFILogo.gif";
import unsw from "../media/unswLogo.png";

function LandingPage() {
  return (
    <div className="LandingPage"  >
      <header></header>
      <main>
        <Container>
          <Row className="px-4 my-5 align-items-center">
            <Col sm={9}>
              <Image
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.incimages.com%2Fuploaded_files%2Fimage%2F1920x1080%2Fgetty_586163548_334517.jpg&f=1&nofb=1&ipt=36b3132ee4337311bb90675be76bdb2c638f80245a8f3127060cee8eb5b631f0&ipo=images"
                fluid
                rounded
                className=""
              />
            </Col>
            <Col sm={3}>
              <h1 class="font-weigh-line">NEMGLO</h1>
              <p class="mt-4">
                A tool for optimising flexible green loads in the National
                Electricity Market
              </p>
              <Button variant="outline-primary" href="/dashboard">Try now</Button>
            </Col>
          </Row>
          {/* <Row>
            <Card className="text-center bg-secondary text-white my-5 py-4">
              <Card.Body>
                This call to action card is a great place to showcase some
                important information or display a clever tagline!
              </Card.Body>
            </Card>
          </Row> */}
          {/* <Row className="text-center">
            <h1 class="font-weigh-line">Collaborators</h1>
          </Row> */}
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
                <Image src={dgfi} fluid rounded width="200" />
              </Col>
              <Col sm={4}>
                <Image src={ceem} fluid rounded width="200" />
              </Col>
            </Row>
          </div>
        </Container>
      </main>
      <footer class="py-5 my-5 bg-dark" >
      <p class="text-center text-white">
            Copyright &copy; www.nemglo.com.au 2022
          </p>
      </footer>
    </div>
  );
}

export default LandingPage;
