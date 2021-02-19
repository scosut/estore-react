import React, { Component } from 'react';
import { Button, Card, CardBody, CardTitle, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import Checkout from './Checkout';
import { withRouter } from 'react-router-dom';

class PaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      method: this.props.cart.payment ? this.props.cart.payment : 'PayPal',
      errors: {
        method: ''
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
    const errors = { method: '' };
    const { cart, cartHandler, history } = this.props;

    if (this.state.method.length === 0) {
      errors.method = 'Please select the payment method.';
    }

    if (Object.values(errors).filter(val => val.length > 0).length) {
      this.setErrors(errors);
    }
    else {
      cart.updatePayment(this.state.method);
      cartHandler(cart);
      history.push('/checkout/order-details');
    }
  }

  render() {
    return (
      <React.Fragment>
        <Checkout active="Payment" />
        <div className="container">
          <Card className="card-form mb-5">
            <CardTitle tag="div">
              <h1>PAYMENT</h1>
            </CardTitle>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="method" className="col-form-label d-block">Payment Method</Label>
                  <Input className="ml-0"
                    checked={this.state.method === 'PayPal'}
                    id="method"
                    invalid={this.state.errors.method.length > 0}
                    name="method"
                    onChange={(e) => this.setProperty(e)}
                    type="radio"
                    value={this.state.method} /> PayPal
                  <FormFeedback>{this.state.errors.method}</FormFeedback>
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

export default withRouter(PaymentForm);