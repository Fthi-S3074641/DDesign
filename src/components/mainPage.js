import * as React from "react";
import "./mainPage.css";
import logo from "./logo.svg";
import App from "../App";
import PropTypes from "prop-types";
import p5 from "p5";
import sketch from "../sketches/sketch.js";
import { VoteClicked, ShowEvolution } from "../App";
import {wrappedSketch} from '../sketch.js'
// import { getCount } from "../App";

import {
  Button,
  Container,
  Row,
  Label,
  FormGroup,
  Col,
  Navbar,
  NavbarBrand,
  NavLink,
  Nav,
  NavItem,
  CardText,
  CardImg,
  CardBody
} from "reactstrap";


export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      features: {
        // eyeSize: 10,
        // eyeWidth: 43,
        // eyeColour: "#bf8040",
    
        // pettalLength: 0,
        // pettalWidth: 0,
        // pettalColour: "#e6ffff",
        // pettalSpacing: 15,
    
        // mouth: false,
    
        // centerColour: "#ffffcc",
        // centerSize: 100
      },
    };
}

  static propTypes = {
    p5Props: PropTypes.object.isRequired,
    getValue: PropTypes.func.isRequired,
    onReady: PropTypes.func.isRequired
  };

  componentDidMount() {
    
    
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

  getEvolutionDetails(event) {
      var a = this.props.ShowEvolution(0);
      var a1 = this.props.ShowEvolution(1);
      var a2 = this.props.ShowEvolution(2);
      var a3 = this.props.ShowEvolution(3);
      console.log(a);

      this.state = {
        features: {
          eyeSize: a1[4].c[0],
          eyeWidth: a1[1].c[0],
          eyeColour: "#bf8040",
      
          pettalLength: a1[3].c[0],
          pettalWidth: a1[2].c[0],
          pettalColour: "#e6ffff", // color not set yety
          
          pettalSpacing: 15,
      
          mouth: a1[0].c[0] == 0,
      
          centerColour: "#ffffcc",
          centerSize: 100
        }
      };

      var sketch1 = wrappedSketch(this.state.features);
      this.canvas = new p5(sketch1, "app1");
      console.log("ftu",a2[0].c[0],a[0].c[0]);
      this.state = {
        features: {
          eyeSize: a2[3].c[0],
          eyeWidth: a2[4].c[0],
          eyeColour: "#bf8040",
      
          pettalLength: a2[1].c[0],
          pettalWidth: a2[2].c[0],
          pettalColour: "#e6ffff", // color not set yety
          
          pettalSpacing: 15,
      
          mouth: a2[0].c[0] == 0,
      
          centerColour: "#ffffcc",
          centerSize: 100
        }
      };
      var sketch3 = wrappedSketch(this.state.features);
      this.canvas = new p5(sketch3, "app2");

      var k = {
        features: {
          eyeSize: a[4].c[0],
          eyeWidth: a[3].c[0],
          eyeColour: "#bf8040",
      
          pettalLength: a[1].c[0],
          pettalWidth: a[1].c[0],
          pettalColour: "#e6ffff", // color not set yety
          
          pettalSpacing: 15,
      
          mouth: a[0].c[0] == 0,
      
          centerColour: "#ffffcc",
          centerSize: 100
        }
      };
      var sketch0 = wrappedSketch(k.features);
      this.canvas = new p5(sketch0, "app3");
      var ff = {
        features: {
          eyeSize: a3[1].c[0],
          eyeWidth: a3[3].c[0],
          eyeColour: "#bf8040",
      
          pettalLength: a3[3].c[0],
          pettalWidth: a3[4].c[0],
          pettalColour: "#e6ffff", // color not set yety
          
          pettalSpacing: 15,
      
          mouth: a3[0].c[0] == 0,
      
          centerColour: "#ffffcc",
          centerSize: 100
        }
      };
      console.log(a1, a2, a3);
      var sketch4 = wrappedSketch(ff.features);
      this.canvas = new p5(sketch4, "app4");

      console.log(a1);
  }

  render() {
    // console.log("hey", this.props.getCount())
    return (
      <div className="App" onLoad={this.getEvolutionDetails.bind(this)}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Decentralized Design</h1>
        </header>


        <div className="updater">
          <Navbar color="faded" light expand="md" >
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="#" className="text-center">Voting in progress</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#" className="text-center">Time: 00:00:00</NavLink>
                </NavItem>
              </Nav>
          </Navbar>
        </div>
        <Container className="App-Pack">
          <Row className="App-row">
            <Col sm="6" className="App-choices">
              <CardBody className="App-choices-body">
                <CardImg className="imgFlower" id="app1" />

                <FormGroup row className="App-last">
                  {/* onClick={(e) => .VoteClicked(1, e)} */}
                  <Button
                    color="primary" sm={10} onClick={e => this.props.VoteClicked(0, e)} >
                    {" "}
                    Vote{" "}
                  </Button>
                  <Label for="exampleEmail" sm={4}>
                    Total count:
                     {/* {this.props.getCount().s} */}
                  </Label>
                </FormGroup>
              </CardBody>
            </Col>
            <Col sm="6" className="App-choices">
              <CardBody className="App-choices-body">
                <CardImg className="imgFlower" id="app2" />
                <FormGroup row className="App-last">
                  <Button color="primary" sm={10} onClick={e => this.props.VoteClicked(1, e)}>
                    {" "}
                    Vote{" "}
                  </Button>
                  <Label for="exampleEmail" sm={4}>
                  Total count: 
                  {/* {this.props.getCount().s} */}
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
                  <Button color="primary" sm={10} onClick={e => this.props.VoteClicked(2, e)} >
                    {" "}
                    Vote{" "}
                  </Button>
                  <Label for="exampleEmail" sm={4}>
                  Total count: 
                  {/* {this.props.getCount().s} */}
                  </Label>
                </FormGroup>
              </CardBody>
            </Col>
            <Col sm="6" className="App-choices">
              <CardBody className="App-choices-body">
                <CardImg className="imgFlower" id="app4" />
                <FormGroup row className="App-last">
                  <Button color="primary" sm={10} onClick={e => this.props.VoteClicked(3, e)} >
                    {" "}
                    Vote{" "}
                  </Button>
                  <Label for="exampleEmail" sm={4}>
                  Total count: 
                  {/* {this.props.getCount().s} */}
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

