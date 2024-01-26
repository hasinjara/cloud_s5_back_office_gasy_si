import React, { Component } from "react";
import './css/StaticCrud.css';

class StaticCrud extends Component {
  constructor(props) {
    super(props);
    const colNames = props.colNames || [];
    const formFields = colNames.map((colName, index) => {
      return { label: colName, name: `${colName}${index}`, type: "text" };
    });
    
    this.state = {
      formFields,
      formData: {},
      items: [],
      editingIndex: -1,
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOperation = this.handleOperation.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleUpdateChange = this.handleUpdateChange.bind(this);
  }
  
  render() {
    return (
      <div>
        <h1>{this.props.formName}</h1>

        <form onSubmit={this.handleSubmit}>
          {this.state.formFields.map((field, index) => (
            <div key={index}>
              <label style={{ color: 'grey' }}>{field.label}</label>
              <input
                type={field.type}
                value={this.state.formData[field.name] || ""}
                placeholder={`Enter ${field.label}`}
                onChange={(e) => this.handleChange(e, field.name)}
              />
            </div>
          ))}
          <button type="submit" className="btn save-btn">
            {this.state.editingIndex !== -1 ? "Update" : "Save"}
          </button>
        </form>

        <h1>Render Data</h1>

        <table className="crud-table">
          <thead>
            <tr>
              {this.state.formFields.map((field, index) => (
                <th key={index}>{field.label}</th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.items.map((item, index) => (
              <tr key={index}>
                {this.state.formFields.map((field, fieldIndex) => (
                  <td key={fieldIndex}>
                    {this.state.editingIndex === index ? (
                      <input
                        type={field.type}
                        value={this.state.formData[field.name] || ""}
                        onChange={(e) => this.handleUpdateChange(e, field.name)}
                      />
                    ) : (
                      item[field.name]
                    )}
                  </td>
                ))}
                <td>
                  {this.state.editingIndex === index ? (
                    <button
                      className="btn save-btn"
                      onClick={() => this.handleOperation("update", index)}
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      className="btn save-btn"
                      onClick={() => this.handleEditClick(index)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="btn del-btn"
                    onClick={() => this.handleOperation("delete", index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  handleChange(e, fieldName) {
    const formData = { ...this.state.formData, [fieldName]: e.target.value };
    this.setState({ formData });
  }

  handleOperation(operation, index) {
    if (operation === "delete") {
      this.delete(index);
    } else if (operation === "update") {
      this.update(index);
    } else if (operation === "save") {
      this.save();
    }
  }

  delete(index) {
    const updatedItems = [...this.state.items];
    updatedItems.splice(index, 1);
    this.setState({ items: updatedItems, editingIndex: -1 });
  }

  update(index) {
    const updatedItems = [...this.state.items];
    updatedItems[index] = { ...this.state.formData };
    this.setState({ items: updatedItems, formData: {}, editingIndex: -1 });
  }

  save() {
    const newItem = { ...this.state.formData };
    const updatedItems = [...this.state.items, newItem];
    this.setState({ items: updatedItems, formData: {}, editingIndex: -1 });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.editingIndex !== -1) {
      this.handleOperation("update", this.state.editingIndex);
    } else {
      this.handleOperation("save");
    }
  }

  handleEditClick(index) {
    this.setState({ editingIndex: index, formData: { ...this.state.items[index] } });
  }

  handleUpdateChange(e, fieldName) {
    const updatedFormData = { ...this.state.formData, [fieldName]: e.target.value };
    this.setState({ formData: updatedFormData });
  }
}

export default StaticCrud;
