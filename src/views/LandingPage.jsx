import { Button, Card, Col, Container, Grid, Image, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

function LandingPage() {
  return (
    <div className="LandingPage">
      <header>
      </header>
      <main>
      <Container>
      <Row className="px-4 my-5">
        <Col sm={7}>
          <Image src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.incimages.com%2Fuploaded_files%2Fimage%2F1920x1080%2Fgetty_586163548_334517.jpg&f=1&nofb=1&ipt=36b3132ee4337311bb90675be76bdb2c638f80245a8f3127060cee8eb5b631f0&ipo=images" fluid rounded className=""/>
        </Col>
        <Col sm={5}>
          <h1 class="font-weigh-line">Tagline</h1>
          <p class="mt-4">Non sint consequuntur voluptas sit quia animi omnis placeat. Non consequatur est excepturi blanditiis quia. Ut aut nisi et soluta molestias doloribus totam et. Quos aut occaecati voluptatibus dignissimos deserunt totam dicta. Nesciunt excepturi impedit distinctio nesciunt iusto corrupti.</p>
          <Button variant="outline-primary">Call to Action</Button>
        </Col>
      </Row>
      <Row>
        <Card className="text-center bg-secondary text-white my-5 py-4">
          <Card.Body>
              This call to action card is a great place to showcase some important information or display a clever tagline!
          </Card.Body>
        </Card>
      </Row>
      <Row>
        <Col>
        <Card style={{width: "18rem"}}>
          <Card.Img variant="top" src="https://picsum.photos/320/200"></Card.Img>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>Some quick example text to build on the card title and make up the bulk of the cards statement</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card style={{width: "18rem"}}>
          <Card.Img variant="top" src="https://picsum.photos/320/200"></Card.Img>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>Some quick example text to build on the card title and make up the bulk of the cards statement</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card style={{width: "18rem"}}>
          <Card.Img variant="top" src="https://picsum.photos/320/200"></Card.Img>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>Some quick example text to build on the card title and make up the bulk of the cards statement</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
        </Col>
      </Row>
    </Container>
      </main>
      <footer class="py-5 my-5 bg-dark">
        <Container className="px-4"><p class="text-center text-white">Copyright &copy; www.nemglo.com.au 2022</p></Container>
      </footer>
    </div>
  );
}

export default LandingPage;
