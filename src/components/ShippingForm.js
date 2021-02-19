import React, { Component } from 'react';
import Checkout from './Checkout';
import { Button, Card, CardBody, CardTitle, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class ShippingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: this.props.cart.shipping ? this.props.cart.shipping.address : '',
      city: this.props.cart.shipping ? this.props.cart.shipping.city : '',
      postal: this.props.cart.shipping ? this.props.cart.shipping.postal : '',
      country: this.props.cart.shipping ? this.props.cart.shipping.country : '',
      errors: {
        address: '',
        city: '',
        postal: '',
        country: ''
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
    const { cart, cartHandler, history } = this.props;
    const errors = { address: '', city: '', postal: '', country: '' };

    if (this.state.address.length === 0) {
      errors.address = 'Please provide the address.';
    }

    if (this.state.city.length === 0) {
      errors.city = 'Please provide the city.';
    }

    if (this.state.postal.length === 0) {
      errors.postal = 'Please provide the postal code.';
    }

    if (this.state.country.length === 0) {
      errors.country = 'Please provide the country.';
    }

    if (Object.values(errors).filter(val => val.length > 0).length) {
      this.setErrors(errors);
    }
    else {
      cart.updateShipping(this.state.address, this.state.city, this.state.postal, this.state.country);
      cartHandler(cart);
      history.push('/checkout/payment');
    }
  }

  render() {
    return (
      <React.Fragment>
        <Checkout active="Shipping" />
        <div className="container">
          <Card className="card-form mb-5">
            <CardTitle tag="div">
              <h1>SHIPPING</h1>
            </CardTitle>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="address" className="col-form-label">Address</Label>
                  <Input type="text" name="address" id="address" className="flat" placeholder="Enter address" value={this.state.address} invalid={this.state.errors.address.length > 0} onChange={(e) => this.setProperty(e)} />
                  <FormFeedback>{this.state.errors.address}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="city" className="col-form-label">City</Label>
                  <Input type="text" name="city" id="city" className="flat" placeholder="Enter city" value={this.state.city} invalid={this.state.errors.city.length > 0} onChange={(e) => this.setProperty(e)} />
                  <FormFeedback>{this.state.errors.city}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="postal" className="col-form-label">Postal Code</Label>
                  <Input type="text" name="postal" id="postal" className="flat" placeholder="Enter postal code" value={this.state.postal} invalid={this.state.errors.postal.length > 0} onChange={(e) => this.setProperty(e)} />
                  <FormFeedback>{this.state.errors.postal}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="Country" className="col-form-label">Country</Label>
                  <Input type="text" name="country" id="country" className="flat" placeholder="Enter country" value={this.state.country} invalid={this.state.errors.country.length > 0} onChange={(e) => this.setProperty(e)} />
                  <FormFeedback>{this.state.errors.country}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Button color="dark" onClick={() => this.update()}>CONTINUE</Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(ShippingForm);