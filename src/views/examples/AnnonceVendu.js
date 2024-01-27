// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
  } from "reactstrap";
  // core components
  import AnnonceAdmin from "components/Annonce/AnnonceAdmin";
  
  const AnnonceValid = () =>{
    const endpoint = "annonce/vendre";

      return(
          <>
        {/* Page content */}
        <Container className="main-content container-fluid mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <h3 className="mb-0">Annonces Vendues</h3>
                </CardHeader>
                <CardBody>
                  <Row className="icon-examples">
                    <AnnonceAdmin endpoint={endpoint} />
                    </Row>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
             
          </>
      )
  }
  
  export default AnnonceValid;
  