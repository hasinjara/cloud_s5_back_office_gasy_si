// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
  } from "reactstrap";
  // core components
  import VehiculeSearch from "components/Annonce/VehiculeSearch";
  
  const Annonce = () =>{
      
      return(
          <>
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <h3 className="mb-0">Research Results</h3>
                </CardHeader>
                <CardBody>
                  <Row className="icon-examples">
                    <VehiculeSearch/>
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
  