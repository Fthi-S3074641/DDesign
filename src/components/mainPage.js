import * as React from "react";
import "./mainPage.css";
import logo from "./logo.svg";
import App from "../App";
import PropTypes from "prop-types";
import p5 from "p5";
import sketch from "../sketches/sketch.js";
import { VoteClicked } from "../App";

import {
  Button,
  Container,
  Row,
  Label,
  FormGroup,
  Col,
  CardImg,
  CardBody
} from "reactstrap";


export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    // Obj = new App();
  }

  static propTypes = {
    p5Props: PropTypes.object.isRequired,
    getValue: PropTypes.func.isRequired,
    onReady: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.canvas = new p5(sketch, "app1");
    this.canvas = new p5(sketch, "app2");
    this.canvas = new p5(sketch, "app3");
    this.canvas = new p5(sketch, "app4");
    
  }

  componentWillReceiveProps(nextProps) {
    this.canvas.pushProps({
      ...this.props.p5Props,
      getValue: this.props.getValue
    });
  }

  shouldComponentUpdate() {
    // just in case :)
    return false;
  }

  componentWillUnmount() {
    this.canvas.remove();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Decentralized Design</h1>
        </header>

        <Container className="App-Pack">
          <Row className="App-row">
            <Col sm="6" className="App-choices">
              <CardBody className="App-choices-body">
                <CardImg className="imgFlower" id="app1" />

                <FormGroup row className="App-last">
                  {/* onClick={(e) => .VoteClicked(1, e)} */}
                  <Button
                    color="primary"
                    sm={10}
                    onClick={e => this.props.VoteClicked(1, e)}
                  >
                    {" "}
                    Vote{" "}
                  </Button>
                  <Label for="exampleEmail" sm={4}>
                    Total count: {this.count}
                  </Label>
                </FormGroup>
              </CardBody>
            </Col>
            <Col sm="6" className="App-choices">
              <CardBody className="App-choices-body">
                <CardImg className="imgFlower" id="app2" />
                <FormGroup row className="App-last">
                  <Button color="primary" sm={10}>
                    {" "}
                    Vote{" "}
                  </Button>
                  <Label for="exampleEmail" sm={4}>
                    Total count: 0
                  </Label>
                </FormGroup>
              </CardBody>
            </Col>
          </Row>

          <Row className="App-row">
            <Col sm="6" className="App-choices">
              <CardBody>
                <CardImg className="imgFlower" id="app3" />
                <FormGroup row className="App-last">
                  <Button color="primary" sm={10}>
                    {" "}
                    Vote{" "}
                  </Button>
                  <Label for="exampleEmail" sm={4}>
                    Total count: 0
                  </Label>
                </FormGroup>
              </CardBody>
            </Col>
            <Col sm="6" className="App-choices">
              <CardBody className="App-choices-body">
                <CardImg className="imgFlower" id="app4" />
                <FormGroup row className="App-last">
                  <Button color="primary" sm={10}>
                    {" "}
                    Vote{" "}
                  </Button>
                  <Label for="exampleEmail" sm={4}>
                    Total count: 0
                  </Label>
                </FormGroup>
              </CardBody>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
