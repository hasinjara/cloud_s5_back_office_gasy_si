// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
  } from "reactstrap";
  // core components
  import AnnonceGeneral from "components/Annonce/AnnonceGeneral";
  
  const AnnonceValid = () =>{
    const endpoint = "annonce/valider";

      return(
          <>
        {/* Page content */}
        <Container className="main-content container-fluid mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <h3 className="mb-0">Annonces Validées</h3>
                </CardHeader>
                <CardBody>
                  <Row className="icon-examples">
                    <AnnonceGeneral endpoint={endpoint} />
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
  