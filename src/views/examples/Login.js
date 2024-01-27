import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import axios from 'axios';
import { AuthProvider, useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/css/login.css';
import { TailSpin as Loader } from "react-loader-spinner";
const Login = () => {
  const navigate = useNavigate();
  const { login, url , getidUser} = useAuth();
  const [loading, setLoading] = useState(false);
  const loadStyle = {
      
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // 100% de la hauteur de la fenêtre
    width: '100vw', // 100% de la largeur de la fenêtre
  }

  const [mail, setEmail] = useState("admin@gmail.com");
  const [mdp, setPassword] = useState("admin");
  const [rememberMe, setRememberMe] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submitThis = (e) => {
    e.preventDefault();
    const info = { mail: mail, mdp: mdp };
    axios.post(`${url}register/signin`, info)
      .then(response => {
        if (response.data.error == "aucun") {
          login(response.data.data[1].token, response.data.data[0]);
          setLoading(false);
          navigate("/admin/index");
        }
      })
      .catch(error => {
        console.error('Erreur de requête signing :', error);
        setLoading(false);
      });
  }
  if (loading) {
    return <>
    <div
      style={loadStyle}
    >
      <Loader type="TailSpin" color="#32325d" height={80} width={80} style={{ width: '45%' }} />
    </div></>

  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSignIn = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log("Email:", mail);
    console.log("Password:", mdp);
    console.log("Remember Me:", rememberMe);
    submitThis(e);
  };

  return (
    <>
    <div class="container">
      <div style={{padding: 81}} className="boite">
      <div class="row">
        <div class="col-md-6" id="image">
        
        </div>
        <div class="col-md-6" id="formulaire" style={{padding:0}}>
        <Card className="card">
          <CardHeader className="bg-transparent pb-5" style={{height: 124,border: "none"}}>
            <div className="text-muted text-center mt-2 mb-3">
                    <img style={{width: 54}} alt="..." src={require("../../assets/img/icons/common/logo_simple_black.png")}
                  /><br/>
              <h3>Admin</h3>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5">
           
            <Form role="form">
              <FormGroup className="mb-3">
                <label for="password">E-mail</label>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={mail}
                    onChange={handleEmailChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <label for="password">Mot de passe</label>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={mdp}
                    onChange={handlePasswordChange}
                  />
                </InputGroup>
              </FormGroup>
              {/* <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id="customCheckLogin"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div> */}
              <br/>
              <div className="btn-wrapper text-center">
              <Button
                style={{boxShadow:"none"}}
                className="btn-neutral btn-icon"
                color="default"
              >
                <span className="btn-inner--icon">
                  <img style={{width: 30}}
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
              </Button>
              <Button
                style={{boxShadow:"none"}}
                className="btn-neutral btn-icon"
                color="default"
              >
                <span className="btn-inner--icon">
                  <img style={{width: 30}}
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
              </Button>
            </div>
            <br/>
              <div className="text-center">
                <Button
                  class="btn btn-primary"
                  id="valider"
                  type="button"
                  onClick={handleSignIn}
                >
                  Connexion
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        </div>
      </div>
      </div>
    </div>
{/*       
      <Col lg="4" md="7">

        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col> */}
    </>
  );
};

export default Login;
