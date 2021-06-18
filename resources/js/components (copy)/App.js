
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import './App.css';
import { Container, Button, Alert } from 'react-bootstrap';
import School from './School';
import AddSchool from './AddSchool';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddSchool: false,
      error: null,
      response: {},
      school: {},
      isEditSchool: false
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onCreate() {
    this.setState({ isAddSchool: true });
  }

  onFormSubmit(data) {
    let apiUrl;

    if(this.state.isEditSchool){
      apiUrl = 'api/school/update/';
    } else {
      apiUrl = 'http://localhost/dev/tcxapp/reactapi/createProduct';
    }

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      myHeaders
    };

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(result => {
        this.setState({
          response: result,
          isAddSchool: false,
          isEditSchool: false
        })
      },
      (error) => {
        this.setState({ error });
      }
    )
  }

  editSchool = schoolId => {

    const apiUrl = 'api/school/'+schoolId+'/edit';
    //const formData = new FormData();
    //formData.append('schoolId', schoolId);

    const options = {
      method: 'GET',
      //body: formData
    }

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            school: result,
            isEditSchool: true,
            isAddSchool: false
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  render() {

    let schoolForm;
    if(this.state.isAddSchool || this.state.isEditSchool) {
      schoolForm = <AddSchool onFormSubmit={this.onFormSubmit} school={this.state.school} />
    }

    return (
      <div className="App">
        <Container>
          <h1 style={{textAlign:'center'}}>School Management</h1>
          {!this.state.isAddSchool && <Button variant="primary" onClick={() => this.onCreate()}>Add School</Button>}
          {this.state.response.status === 'success' && <div><br /><Alert variant="info">{this.state.response.message}</Alert></div>}
          {!this.state.isAddSchool && <School editSchool={this.editSchool}/>}
          { schoolForm }
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

