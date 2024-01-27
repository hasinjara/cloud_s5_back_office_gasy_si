const getHeaderToken = () => {
    const token = getToken(); // Assurez-vous que la fonction getToken() est définie et retourne le token
    return {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        '--force --legacy-peer-deps' :'s'
      }
    };
  };
  
  // Exemple d'utilisation avec axios
  axios.get('/api/endpoint', getHeaderToken())
    .then(response => {
      // Traiter la réponse
    })
    .catch(error => {
      // Gérer l'erreur
    });
    // avecrequestbody
    axios.post('/api/endpoint', data, getHeaderToken())
  .then(response => {
    // Traiter la réponse
  })
  .catch(error => {
    // Gérer l'erreur
  });
  
  <ActiveCrud primaryKeyFieldName={'idFicheTechnique'} getEndPoint={'voiture/fiche_tech'} postEndPoint={'voiture/fiche_tech'} putEndPoint={'voiture/fiche_tech'} delEndPoint={'voiture/fiche_tech'} />

