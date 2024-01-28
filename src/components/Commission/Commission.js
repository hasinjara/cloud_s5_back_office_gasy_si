import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import styles from './Commission.module.css';
import { useAuth } from 'AuthContext';
import axios from 'axios';
import { TailSpin as Loader } from 'react-loader-spinner';

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
  Input
} from "reactstrap";


const Commission = () => {
  const { url, getIdUser, getHeaderToken, getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [commissions, setCommissions] = useState([]);

  useEffect(() => {
    const newEndPoint = `commission`;
    //console.log(newEndPoint);
    axios.get(`${url}${newEndPoint}`, getHeaderToken())
      .then(response => {
        // ... traitement de la réponse ...
        console.log("taftftaftafatfatafa")
        if (response.data.error === "aucun") {
          setCommissions(response.data.data);
          setLoading(false);
          console.log(response.data)
          
        }
      })
      .catch(error => {
        console.error('Erreur de requête :', error);
        setLoading(false);
      });
  }, [url, getHeaderToken]);

  const calculateTotalCommission = () => {
    const totalCommission = commissions.reduce((acc, commission) => acc + Number(commission.commission), 0);
    return totalCommission.toLocaleString('fr-FR');
  };



  return (
    <Container className="mt--7" fluid>
        <Row>
          <Col>
            <Card className='shadow'>
            <h5 style={{ textAlign: 'center' }}>Liste des commissions</h5> 
                {loading ? (
                  <Row>
                    <Col></Col>
                    <Col><Loader type="TailSpin" color="#32325d" height={80} width={80} /></Col>
                    <Col></Col>
                  </Row>
                ) : (
                  <Table className='table-hover table-striped table-bordered'>
                    <thead>
                      <tr>
                        <th>Ref-Annonce</th>
                        <th>Marque</th>
                        <th>Modele</th>
                        <th>Prix Vente</th>
                        <th>Marge</th>
                        <th>Commission</th>
                      </tr>
                    </thead>
                    <tbody>
                      {commissions.map((commission) => (
                        <tr key={commission.idCommission}>
                          <td>{commission.idAnnonce}</td>
                          <td>{commission.marque}</td>
                          <td>{commission.nomModele}</td>
                          <td style={{ textAlign: 'right' }} >{commission.prixVente.toLocaleString('fr-FR')}</td>
                          <td style={{ textAlign: 'right' }} >{commission.marge.toLocaleString('fr-FR')} %</td>
                          <td style={{ textAlign: 'right' }} >{commission.commission.toLocaleString('fr-FR')}</td>
                        </tr>
                      ))}
                        <tr>
                          <td colSpan="5" style={{ textAlign: 'right' }}><strong>Total :</strong></td>
                          <td style={{ textAlign: 'right' }}><strong>{calculateTotalCommission()}</strong></td>
                        </tr>
                    </tbody>
                  </Table>
                  )}
            </Card>
          </Col>
        </Row>
    </Container>
  );
};

Commission.propTypes = {};

Commission.defaultProps = {};

export default Commission;
