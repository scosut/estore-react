import React, { Component } from 'react';
import Checkout from './Checkout';
import { Button, Card, CardBody, CardTitle, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {
        email: '',
        password: ''
      }
    }
  }

  componentDidMount() {
    const { user, userHandler } = this.props;
    if (user) {
      userHandler(null);
    }
  }

  clearError = (e) => {
    this.setState({ errors: { ...this.state.errors, [e.target.name]: '' } });
  }

  setProperty = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => this.clearError(e));
  }

  setErrors = (obj) => {
    this.setState({ errors: obj });
  }

  login = () => {
    const { checkout, history, userHandler, users } = this.props;
    const foundUser = users.filter(user => user.email === this.state.email);
    const errors = { email: '', password: '' };

    if (this.state.email.length === 0) {
      errors.email = 'Please provide the email.';
    }
    else if (!foundUser.length) {
      errors.email = `${this.state.email} does not exist.`;
    }

    if (this.state.password.length === 0) {
      errors.password = 'Please provide the password.';
    }
    else if (foundUser.length && foundUser[0].password !== this.state.password) {
      errors.password = 'Incorrect password.';
    }

    if (Object.values(errors).filter(val => val.length > 0).length) {
      this.setErrors(errors);
    }
    else {
      userHandler(foundUser[0]);
      history.push(checkout && foundUser[0].role === 'customer' ? '/checkout/shipping' : '/');
    }
  }

  render() {
    const { checkout } = this.props;

    return (
      <React.Fragment>
        {checkout &&
          <Checkout active="Sign In" />
        }
        <div className="container">
          <Card className={`card-form mb-5${!checkout ? ' mt-5' : ''}`}>
            <CardTitle tag="div">
              <h1>SIGN IN</h1>
            </CardTitle>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="email" className="col-form-label">Email Address</Label>
                  <Input type="text" name="email" id="email" className="flat" placeholder="Enter email" invalid={this.state.errors.email.length > 0} onChange={(e) => this.setProperty(e)} />
                  <FormFeedback>{this.state.errors.email}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="password" className="col-form-label">Password</Label>
                  <Input type="password" name="password" id="password" className="flat" placeholder="Enter password" invalid={this.state.errors.password.length > 0} onChange={(e) => this.setProperty(e)} />
                  <FormFeedback>{this.state.errors.password}</FormFeedback>
                </FormGroup>
                <FormGroup className="d-flex align-items-center justify-content-between">
                  <Button color="dark" onClick={this.login}>SIGN IN</Button>
                  <Link className="form-link" to="/register">New customer?<br />Register</Link>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(SignInForm);