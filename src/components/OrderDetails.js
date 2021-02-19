import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import Checkout from './Checkout';
import Message from './Message';
import BreadcrumbGeneric from './BreadcrumbGeneric';
import { withRouter } from 'react-router-dom';

class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: this.props.order ? this.props.order : null
    }
  }

  place = () => {
    const { cart, cartHandler, classOrder, history, orderHandler, user } = this.props;
    const obj = classOrder.create(user, cart);
    orderHandler(obj.orders);
    cartHandler();
    history.push(`/order-details/${obj.id}`);
  }

  pay = (order) => {
    const { orderHandler } = this.props;
    const orders = order.update('paid');
    this.setState({ order: order });
    orderHandler(orders);
  }

  deliver = (order) => {
    const { orderHandler } = this.props;
    const orders = order.update('delivered');
    this.setState({ order: order });
    orderHandler(orders);
  }

  renderButton = (order, role = "customer") => {
    if (order) {
      if (role === "administrator") {
        if (order.paid && !order.delivered) {
          return (
            <React.Fragment>
              <div className="divider" />
              <div className="w-100">
                <Button color="dark" className="btn-block" onClick={() => this.deliver(order)}>MARK AS DELIVERED</Button>
              </div>
            </React.Fragment>
          );
        }
        return null;
      }
      else {
        if (!order.paid) {
          return (
            <React.Fragment>
              <div className="divider" />
              <div className="w-100">
                <Button color="transparent" className="btn-block btn-paypal" onClick={() => this.pay(order)}>&nbsp;</Button>
              </div>
            </React.Fragment>
          );
        }
        return null;
      }
    }
    return (
      <React.Fragment>
        <div className="divider" />
        <div className="w-100">
          <Button color="dark" className="btn-block" onClick={() => this.place()}>PLACE ORDER</Button>
        </div>
      </React.Fragment>
    );
  }

  render() {
    const { breadcrumb, cart, checkout, loggedInUser, user } = this.props;
    const obj = cart ? cart : this.state.order;

    return (
      <React.Fragment>
        {breadcrumb &&
          <BreadcrumbGeneric href="/orders" text="Orders" active="Order Details" />
        }
        <div className="container">
          {checkout &&
            <Checkout active="Place Order" />
          }
          {this.state.order &&
            <div className="text-center text-sm-left mt-5 mb-3">
              <h1>ORDER {obj.id}</h1>
            </div>
          }
          <Row className="row-product">
            <Col sm={7} md={8} className="cart">
              <Row>
                <Col xs={12} className="text-center text-sm-left mb-3">
                  <h2>SHIPPING</h2>
                </Col>
                <Col className="col-shipping">
                  <div>Name:</div>
                  <div>{user.name}</div>
                  <div className="w-100" />
                  <div>Email:</div>
                  <div>{user.email}</div>
                  <div className="w-100" />
                  <div>Address:</div>
                  <div>{`${obj.shipping.address}, ${obj.shipping.city} ${obj.shipping.postal}, ${obj.shipping.country}`}</div>
                  {this.state.order &&
                    <Message
                      color={obj.delivered ? 'success' : 'danger'}
                      styling="w-100 mt-2"
                      message={obj.delivered ? `Delivered on ${obj.delivered}.` : 'Not delivered.'}
                    />
                  }
                  <div className="divider" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} className="text-center text-sm-left mb-3">
                  <h2>PAYMENT METHOD</h2>
                </Col>
                <Col className="col-payment">
                  <div>Method:</div>
                  <div>{obj.payment}</div>
                  {this.state.order &&
                    <Message
                      color={obj.paid ? 'success' : 'danger'}
                      styling="w-100 mt-2"
                      message={obj.paid ? `Paid on ${obj.paid}.` : 'Not paid.'}
                    />
                  }
                  <div className="divider" />
                </Col>
              </Row>
              {obj.items.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <Row className={index === obj.items.length - 1 ? 'mb-5' : ''}>
                      {index === 0 &&
                        <Col xs={12} className="text-center-text-sm-left mb-3">
                          <h2>ORDER ITEMS</h2>
                        </Col>
                      }
                      <Col xs={2}>
                        <img src={item.product.image} alt={item.product.name} className="img-fluid img-shadow" />
                      </Col>
                      <Col xs={4} md={5}>
                        {item.product.name}
                      </Col>
                      <Col xs={6} md={5} className="text-right">
                        {item.quantity} &times; {item.product.getPrice()} = {item.getTotal()}
                      </Col>
                    </Row>
                    {index < obj.items.length - 1 &&
                      <Row>
                        <Col>
                          <div className="divider" />
                        </Col>
                      </Row>
                    }
                  </React.Fragment>
                );
              })}
            </Col>
            <Col sm={5} md={4} className="mt-sm-5 mb-5">
              <Card className="summary">
                <CardBody>
                  <div className="w-100">ORDER SUMMARY</div>
                  <div className="divider" />
                  <div>Items:</div>
                  <div>{obj.getSubtotal()}</div>
                  <div className="divider" />
                  <div>Shipping</div>
                  <div>$0.00</div>
                  <div className="divider" />
                  <div>Tax:</div>
                  <div>{obj.getTax()}</div>
                  <div className="divider" />
                  <div>Total:</div>
                  <div>{obj.getTotal()}</div>
                  {this.renderButton(this.state.order, loggedInUser.role)}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(OrderDetails);