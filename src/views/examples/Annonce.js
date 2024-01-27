// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
} from "reactstrap";
// core components
import VehiculeAxios from "components/Annonce/VehiculeAxios";

const Annonce = () =>{
    
    return(
        <>
      {/* Page content */}
      <Container className="main-content container-fluid mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Annonces Non Validées</h3>
              </CardHeader>
              <CardBody>
                <Row className="icon-examples">
                  <VehiculeAxios/>
                  </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
           
        </>
    )
}

export default Annonce;
