import React, { Component } from 'react';
import { Button, Card, CardBody, CardTitle, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class UserProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      email: this.props.user.email,
      oldEmail: this.props.user.email,
      password: this.props.user.password,
      confirm: this.props.user.password,
      errors: {
        name: '',
        email: '',
        password: '',
        confirm: ''
      }
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

  update = () => {
    const { classUser, history, user, userHandler, users } = this.props;
    const foundUser = users.filter(u => u.email === this.state.email);
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const errors = { name: '', email: '', password: '', confirm: '' };

    if (this.state.name.length === 0) {
      errors.name = 'Please provide the name.';
    }

    if (this.state.email.length === 0) {
      errors.email = 'Please provide the email.';
    }
    else if (!re.test(this.state.email)) {
      errors.email = `${this.state.email} is invalid.`;
    }
    else if (this.state.email !== this.state.oldEmail && foundUser.length) {
      errors.email = `${this.state.email} already exists.`;
    }

    if (this.state.password.length === 0) {
      errors.password = 'Please provide the password.';
    }

    if (this.state.confirm.length === 0) {
      errors.confirm = 'Please confirm the password.';
    }

    if (this.state.password.length > 0 && this.state.confirm.length > 0 && this.state.password !== this.state.confirm) {
      errors.confirm = "Password and Confirm Password must match."
    }

    if (Object.values(errors).filter(val => val.length > 0).length) {
      this.setErrors(errors);
    }
    else {
      classUser.update(user, this.state.name, this.state.email, this.state.password);
      userHandler(user);
      history.goBack();
    }
  }

  render() {
    return (
      <div className="container">
        <Card className="card-form mt-5 mb-5">
          <CardTitle tag="div">
            <h1>USER PROFILE</h1>
          </CardTitle>
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="name" className="col-form-label">Name</Label>
                <Input type="text" name="name" id="name" className="flat" placeholder="Enter name" invalid={this.state.errors.name.length > 0} onChange={(e) => this.setProperty(e)} value={this.state.name} />
                <FormFeedback>{this.state.errors.name}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="email" className="col-form-label">Email Address</Label>
                <Input type="text" name="email" id="email" className="flat" placeholder="Enter email" invalid={this.state.errors.email.length > 0} onChange={(e) => this.setProperty(e)} value={this.state.email} />
                <FormFeedback>{this.state.errors.email}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="password" className="col-form-label">Password</Label>
                <Input type="password" name="password" id="password" className="flat" placeholder="Enter password" invalid={this.state.errors.password.length > 0} onChange={(e) => this.setProperty(e)} value={this.state.password} />
                <FormFeedback>{this.state.errors.password}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="confirm" className="col-form-label">Confirm Password</Label>
                <Input type="password" name="confirm" id="confirm" className="flat" placeholder="Re-enter password" invalid={this.state.errors.confirm.length > 0} onChange={(e) => this.setProperty(e)} value={this.state.confirm} />
                <FormFeedback>{this.state.errors.confirm}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Button color="dark" onClick={this.update}>UPDATE</Button>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default withRouter(UserProfileForm);