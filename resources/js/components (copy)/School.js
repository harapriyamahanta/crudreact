import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class School extends Component {
	constructor(props) {
    super(props);
    this.state = {
      error: null,
      schools: [],
      response: {}
    }
  }

  componentDidMount() {
    const apiUrl = 'api/school';

    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            schools: result
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  deleteProduct(productId) {
    const { products } = this.state;

    const apiUrl = 'api/school/delete/'+productId;
    const formData = new FormData();
    formData.append('productId', productId);

    const options = {
      method: 'POST',
      body: formData
    }

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            response: result,
            products: products.filter(product => product.id !== productId)
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  render() {
    const { error, products} = this.state;

    if(error) {
      return (
        <div>Error: {error.message}</div>
      )
    } else {
      return(
        <div>
          <h2>School List</h2>
          {this.state.response.message && <span variant="info">{this.state.response.message}</span>}
          <table>
            <thead>
              <tr>
                <th>#ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.schools.map(school => (
                <tr key={school.id}>
                  <td>{school.id}</td>
                  <td>{school.name}</td>
                  <td>{school.address}</td>
                  <td>{school.phone}</td>
                  <td>
                    <button variant="info" onClick={() => this.props.editSchool(school.id)}>Edit</button>
                    &nbsp;<button variant="danger" onClick={() => this.deleteSchool(school.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
  }
}

export default School;