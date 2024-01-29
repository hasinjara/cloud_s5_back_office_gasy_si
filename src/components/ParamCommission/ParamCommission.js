import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from 'AuthContext';
import { Row, Col, Container, Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button,Table} from "reactstrap";
import PropTypes from 'prop-types';
import styles from './ParamCommission.module.css';
import { TailSpin as Loader } from 'react-loader-spinner';

const ParamCommission = () => {
  const { url, getToken, getHeaderToken } = useAuth();
  const [margeCommission, setMargeCommission] = useState('');
  const [margeCommissionput, setMargeCommissionPut] = useState('');
  
  const [loading, setLoading] = useState(true);
  const fetchCommission = async () => {
    try {
      const response = await axios.get(`${url}param_commission`, getHeaderToken());
      if (response.data.error === "aucun") {
        setMargeCommission(response.data.data.margeCommission);
      }
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCommission();
  }, [url, getToken()]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${url}param_commission/${margeCommissionput}`, {}, getHeaderToken());
      setLoading(true)
      console.log(response.data);
      fetchCommission();
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Row>
        <Col></Col>
        <Col><Loader type="TailSpin" color="#32325d" height={80} width={80} /></Col>
        <Col></Col>
      </Row>
    );
  }

  return (
    <Container className="mt--7" fluid>
      <Row>
          <Col>
              <Card>
          <CardHeader>
            <h3>Paramètres de Commission</h3>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="margeCommission">Marge de Commission (%)</Label>
                <Input
                  type="number"
                  id="margeCommission"
                  onChange={(e) => setMargeCommissionPut(e.target.value)}
                />
              </FormGroup>
              <Button type="submit" color="primary">Mettre à jour</Button>
            </Form>
            <Table bordered>
              <thead>
                <tr>
                  <th>Marge de Commission (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{margeCommission}</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
    
        </Col>
      </Row>
      </Container>
      
  );
};

ParamCommission.propTypes = {};

ParamCommission.defaultProps = {};

export default ParamCommission;
