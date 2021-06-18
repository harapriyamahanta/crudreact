
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import './App.css';
import { Container, Button, Alert } from 'react-bootstrap';
import School from './School';
import AddSchool from './AddSchool';
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddSchool: false,
      error: null,
      response: {},
      school: {},
      schools: [],
      isEditSchool: false,
      isListSchool: true
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onCreate() {
    this.setState({ school: {},isAddSchool: false ,isEditSchool: false }
      ,function(){
        this.setState({ school: {} , isAddSchool: true ,isEditSchool: false });
      });
    
  }

  onCancel() { 
    this.setState({ school: {},isAddSchool: false ,isEditSchool: false });
  }

  onFormSubmit(data) {
    let apiUrl;
    if(this.state.isEditSchool){
      apiUrl = 'api/school/'+data.id;
      var method = 'PUT';
    } else {
      apiUrl = 'api/school';
      var method = 'POST';
    }
    if(data.name && data.address && data.phone && data.school_medium){
      const options = {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      };
      this.setState({
        isListSchool:false
      });
      fetch(apiUrl, options)
        .then(res => res.json())
        .then(result => {
          this.setState({
            response: result,
            isAddSchool: false,
            isEditSchool: false,
            isListSchool:true
          })
        },
        (error) => {
          this.setState({ error });
        }
      )
    }else{
      alert('Please fill the Required Field!');
    }
  }

  editSchool = schoolId => {
    const apiUrl = 'api/school/'+schoolId+'/edit';
    const options = {
      method: 'GET',
    }
    
      this.setState({
        school: {},
        isAddSchool: false,
      },function(){
        fetch(apiUrl, options)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              school: result,
              isEditSchool: true,
              isAddSchool: false,
              isListSchool:true
            });
          },
          (error) => {
            this.setState({ error });
          }
        )

      });

  }

  render() {

    let schoolForm;
    if(this.state.isAddSchool) {
      schoolForm = <AddSchool onCancel={this.onCancel}   onFormSubmit={this.onFormSubmit} school={this.state.school} />
    }
    if(this.state.isEditSchool) {
      schoolForm = <AddSchool onCancel={this.onCancel}   onFormSubmit={this.onFormSubmit} school={this.state.school} />
    }

    return (
      <div className="App">
        <Container>
          <h1 style={{textAlign:'center'}}>School Management</h1>
          {!this.state.isAddSchool && <Button variant="primary" onClick={() => this.onCreate()}>Add School</Button>}
          { schoolForm }
          {this.state.response.status === '200' && <div><br /><Alert variant="info">{this.state.response.message}</Alert></div>}
          {this.state.isListSchool && <School editSchool={this.editSchool}/>}
         
          {this.state.error && <div>Error: {this.state.error.message}</div>}
        </Container>
      </div>
    );
  }
}

export default App;

if (document.getElementById('schoollist')) {
    ReactDOM.render(<App />, document.getElementById('schoollist'));
}

