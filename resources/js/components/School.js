import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Alert } from 'react-bootstrap';
import axios from "axios";
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
    this.getSchoollists();
  }
  getSchoollists() {

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

  deleteSchool(schoolId) {
    const { schools } = this.state;

    const apiUrl = 'api/school/'+schoolId;
    const formData = new FormData();
    formData.append('schoolId', schoolId);

    const options = {
      method: 'DELETE',
      body: formData
    }

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            response: result,
            schools: schools.filter(school => school.id !== schoolId)

          });
          this.getSchoollists();
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
          <Table className="table-striped" >
            <thead>
              <tr>
                <th>#ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Medium</th>
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
                  <td>{school.school_medium}</td>
                  <td>
                    <button variant="info" className="btn btn-info" onClick={() => this.props.editSchool(school.id)}>Edit</button>
                    &nbsp;<button variant="danger" className="btn btn-danger" onClick={() => {if(window.confirm('Delete the item?')){this.deleteSchool(school.id)}}}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )
    }
  }
}

export default School;