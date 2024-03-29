import React, { useState, useEffect } from 'react';
import styles from './ActiveCrud.module.css';
import { useAuth } from 'AuthContext';
import axios from 'axios';

const ActiveCrud = (props) => {
  const { getBody, postBody, putBody, delBody, colNames = [], formName } = props;
  const {  primaryKeyFieldName } = props;

  
  const { url,getHeaderToken, getToken,getHeaderTokenTest,handleRequestError } = useAuth();
  // const HeaderToken = getHeaderToken();
  const { delEndPoint, postEndPoint, putEndPoint, getEndPoint } = props;
  const [formFields, setFormFields] = useState([]);

  console.log(`${url}`);

  const [formData, setFormData] = useState({});
  const [items, setItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  
  useEffect(() => {
    axios.get(`${url}${getEndPoint}`, {/* headers: getHeaderToken() */})
      .then(response => {
        if (response.data.error === "aucun" && response.data.data.length > 0) {
          console.log(getHeaderToken);
          
          const columnNames = Object.keys(response.data.data[0]);
          setFormFields(columnNames.map((colName, index) => ({
            label: colName,
            name: `${colName}`,
            type: 'text'

          })));
          
          const initialFormData = columnNames.reduce((obj, colName) => {
            obj[colName] = '';
            return obj;
          }, {});

          setFormData(initialFormData);
          if (response.data.data.length != items.length) {
            setItems(response.data.data);
          }

        }
      })
      .catch(error => {
        console.error('Erreur de requête signing :', error);
      });
  }, [url, getEndPoint, getToken()]);
  
  const handleChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleOperation = (operation, index) => {
    if (operation === 'delete') {
      deleteItem(index);
    } else if (operation === 'update') {
      updateItem(index);
    } else if (operation === 'save') {
      saveItem();
    }
  };
  
  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    setEditingIndex(-1);
    const itemToDelete = items[index];
    axios.delete(`${url}${delEndPoint}/${itemToDelete[primaryKeyFieldName]}`, getHeaderToken() )
      .then(response => {
        const updatedItems = items.filter((_, itemIndex) => itemIndex !== index);
        setItems(updatedItems);
        setEditingIndex(-1);
      })
      .catch(error => {
        console.error('Erreur lors de la suppression :', error);
      });
  };
  
const updateItem = (index) => {
  // Mettez à jour l'élément avec les données du formulaire
  const itemToUpdate = { ...items[index], ...formData };

  // Envoie la requête de mise à jour
  axios.put(`${url}${putEndPoint}/${itemToUpdate[primaryKeyFieldName]}`, itemToUpdate, getHeaderToken())
    .then(response => {
      // Mettez à jour l'état 'items' avec les nouvelles données
      const updatedItems = [...items];
      updatedItems[index] = itemToUpdate;
      setItems(updatedItems);

      // Réinitialisez le formulaire et l'indice d'édition
      setFormData({});
      setEditingIndex(-1);
    })
    .catch(error => {
      console.error('Erreur lors de la mise à jour :', error);
    });
};
  
  
  const saveItem = async () => {
    const newItem = { ...formData };
    setItems([...items, newItem]);
    setFormData({});
    setEditingIndex(-1);
    // axios.post(`${url}${postEndPoint}`, newItem, getHeaderToken())
    try {
      const response = await axios.post(`${url}${postEndPoint}`, newItem, getHeaderToken());
      // Gérer la réponse ici si nécessaire
    } catch (error) {
      handleRequestError(error);
  };
}

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== -1) {
      handleOperation('update', editingIndex);
    } else {
      handleOperation('save');
    }
  };


  const handleEditClick = (index) => {
    const itemData = items[index];
    const updatedFormData = { ...formData };
    Object.keys(formData).forEach(key => {
      updatedFormData[key] = itemData[key] || '';
    });
    setFormData(updatedFormData);
    setEditingIndex(index);
  };



  const handleUpdateChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  function enleverDerniereLettre(chaine) {
    return chaine.slice(0, -1);
  }
  
  
  
  return (

    <div className={styles.ActiveCrud}>
      <h1>{formName}</h1>
      <form onSubmit={handleSubmit}>
        {formFields.map((field, index) => {
          // Ignorer le premier élément
          if (index === 0) return null;
  
          return (
            
            <div key={index}>
              <br/>
              <h3>Insertion de {field.label}</h3>
              <br/>
              <label style={{ color: 'grey' }}>Nom de la {field.label}</label>
              <input
                type={field.type}
                value={formData[field.name] || ''}
                placeholder={`Enter ${field.label}`}
                onChange={(e) => handleChange(e, field.name)}
              />
            </div>
          );
        })}
        <br/>
        <button type="submit" className="btn save-btn">
          {editingIndex !== -1 ? 'Update' : 'Save'}
        </button>
      </form>
      <br/>
      <table className="crud-table">
        <thead>
          <tr>
            {formFields.map((field, index) => (
              <th key={index}>{field.label}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              {formFields.map((field, fieldIndex) => (
                <td key={fieldIndex}>
                  {editingIndex === index ? (
                    <input
                      type={field.type}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleUpdateChange(e, field.name)}
                    />
                  ) : (
                    item[field.name]
                  )}                
                </td>
              ))}
              <td>
                {editingIndex === index ? (
                  <button className="btn save-btn" onClick={() => handleOperation('update', index)}>
                    Update
                  </button>
                ) : (
                  <button style={{backgroundColor:'black'}}  onClick={() => handleEditClick(index)}>
                    Edit
                  </button>
                )}
                <button className="delete" style={{backgroundColor: 'red'}} onClick={() => handleOperation('delete', index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className={`ni ni-bold-up ${styles.scrollToTopBtn}`} onClick={handleScrollToTop}></button>
    </div>
  );
};

export default ActiveCrud;
