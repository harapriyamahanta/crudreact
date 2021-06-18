import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row, Form, Col, Button } from 'react-bootstrap';
import axios from "axios";
class AddSchool extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      id: '',
      name: '',
      address: '',
      phone: '',
      school_medium:'',
      school_logo:''
    }
    if(this.props.school){
      this.state = this.props.school
      
    } else {
      this.state = this.initialState;
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  

  

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    
    this.setState({
      [name]: value
    })


  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    console.log("this.state");
    this.props.onFormSubmit(this.state);
    this.setState(this.initialState);
  }

  render() {

   
    
    let pageTitle;
    if(this.state.id) {
      pageTitle = <h2>Edit School</h2>
    } else {
      pageTitle = <h2>Add School</h2>
    }

    return(
      <div>
        {pageTitle}
        <Row>
          <Col sm={6}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>School Name <span style={{color: "red"}}>*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder="School Name"/>
              </Form.Group>
              <Form.Group controlId="address">
                <Form.Label>Address <span style={{color: "red"}}>*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleChange}
                  placeholder="Address" />
              </Form.Group>
              <Form.Group controlId="phone">
                <Form.Label>Phone <span style={{color: "red"}}>*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.handleChange}
                  placeholder="Phone" />
              </Form.Group>
              <Form.Group controlId="school_medium">
                <Form.Label>School Medium  <span style={{color: "red"}}>*</span></Form.Label>
                <Form.Control as="select" name="school_medium"  value={this.state.school_medium}    onChange={this.handleChange}
                > 
                  <option value="">Select</option>
                  <option value="CBSE">CBSE</option>
                  <option value="ICSE">ICSE</option>
                  <option value="CISCE">CIICSESCE</option>
                  <option value="NIOS">NIOS</option>
                  <option value="IB">IB</option>
                  <option value="CIE">CIE</option>
                </Form.Control>
              </Form.Group>
              
              <Form.Group>
                <Form.Control type="hidden" name="id" value={this.state.id} />
                <Button variant="success" type="submit">{this.state.id?'Update':'Save'}</Button>&nbsp;
                <Button variant="danger" type="button" onClick={() => this.props.onCancel()}  >Cancel</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default AddSchool;