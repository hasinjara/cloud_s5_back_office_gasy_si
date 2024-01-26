
import { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import TableCreator from "components/customised/TableCreator";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import StaticCrud from "../components/customised/StaticCrud";
import Message from "../components/Message/Message";
import ConversationList from "../components/ConversationList/ConversationList";
import MessageBox from "../components/MessageBox/MessageBox";
import ChatBox from "../components/ChatBox/ChatBox";
import { Link } from "react-router-dom";

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const data = [
    ['xxx 1', 'input1', 'Placeholder 1', 'text'],
    ['tentation 2', 'input2', 'Placeholder 2', 'text'],
  ];
  const personne = ['nom', 'prenom', 'age']
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }
  
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };



  const messages = [
    { author: 'John'  , message:  "1J -  ", image: null, date: '2023-11-01', hour: '08:30' },
    { author: 'Bob'   , message:  "1B - ", image: null, date: '2023-11-01', hour: '09:45' },
    { author: 'John'  , message:  "J2 - ", image: null, date: '2023-11-01', hour: '10:15' },
    { author: 'Bob'   , message:  "B2 - ", image: null, date: '2023-11-01', hour: '11:30' },
    { author: 'Bob'   , message:  "B3 - ", image: null, date: '2023-11-01', hour: '13:30' },
    { author: 'John'  , message:  "J3 - ", image: null, date: '2023-11-01', hour: '12:45' },
    { author: 'John'  , message:  "J4 - ", image: null, date: '2023-11-01', hour: '14:15' },
    { author: 'Bob'   , message:  "B4 - ", image: null, date: '2023-11-01', hour: '15:00' },
    { author: 'John'  , message:  "J5 - ", image: null, date: '2023-11-01', hour: '15:45' },
    { author: 'Bob'   , message:  "B5 - ", image: null, date: '2023-11-01', hour: '16:30' },
    { author: 'John'  , message:  "J6 - ", image: null, date: '2023-11-01', hour: '17:15' },
    { author: 'Bob'   , message:  "B6 - ", image: null, date: '2023-11-01', hour: '18:00' },
    { author: 'John'  , message:  "J7 - ", image: null, date: '2023-11-01', hour: '18:45' },
    { author: 'Bob'   , message:  "B7 - ", image: null, date: '2023-11-01', hour: '19:30' },
  ];




  const conversationList = [
    { sender: 'John', LastMessage: 'Hello there!', image: "//" },
    { sender: 'Mananjara', LastMessage: 'viens teddy, je veux te b***ser', image: "//" },
    { sender: 'hitler', LastMessage: 'mifona grand maitre', image: "//" },
  ];
  const colNames = ['Nom', 'Prenom', 'Age', 'sexe'];

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <h1>huhu</h1>
        {/* <StaticCrud colNames={colNames} formName={"Personne"} /> */}

        {/* {conversationList.map((conversation, index) => (
          <ConversationList key={index} sender={conversation.sender} LastMessage={conversation.LastMessage} />
        ))} */}
        <MessageBox messages={messages} />
        <button><Link to={`/admin/crud/${data}`}>uWu vs UwU</Link></button>
      </Container>
    </>
  );
};

export default Index;
