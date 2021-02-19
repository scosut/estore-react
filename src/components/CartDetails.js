import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Input, Row } from 'reactstrap';
import TooltipGeneric from './TooltipGeneric';
import ModalGeneric from './ModalGeneric';
import { Link, withRouter } from 'react-router-dom';

const CartItem = ({ hasDivider, index, item, quantityHandler, toggle }) => {
  return (
    <React.Fragment>
      <Row>
        <Col xs={3} lg={2}>
          <img src={item.product.image} alt={item.product.name} className="img-fluid img-shadow" />
        </Col>
        <Col xs={3} lg={4}>
          {item.product.name}
        </Col>
        <Col xs={2}>
          {item.product.getPrice()}
        </Col>
        <Col xs={2}>
          <Input type="select" name="qty" id="qty" className="flat w-auto" value={item.quantity} onChange={(e) => quantityHandler(item, e)}>
            {[...Array(item.product.inStock).keys()].map(i =>
              <option key={i} disabled={(i + 1) === item.quantity}>{i + 1}</option>)
            }
          </Input>
        </Col>
        <Col>
          <i id={`delItemLink${index}`} className="fa fa-trash text-success" onClick={() => toggle(item)} />
          <TooltipGeneric placement="bottom" target={`delItemLink${index}`} text="Delete item." />
        </Col>
      </Row>
      {hasDivider && <div className="divider" />}
    </React.Fragment>
  );
}

class CartDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      item: null
    }
  }

  toggle = (item = this.state.item) => {
    this.setState({ modalOpen: !this.state.modalOpen, item: item });
  }

  quantityHandler = (item, e) => {
    const { cart, cartHandler } = this.props;
    cart.updateItem(item, Number(e.target.value));
    cartHandler(cart);
  }

  confirmHandler = () => {
    const { cart, cartHandler, history } = this.props;
    cart.deleteItem(this.state.item);
    cartHandler(cart);
    this.toggle(this.state.item);

    if (!cart.items.length) {
      history.push('/');
    }
  }

  render() {
    const { cart, user } = this.props;
    const quantity = cart.getTotalQuantity();
    const subtotal = cart.getSubtotal();

    return (
      <div className="container">
        <div className="text-center text-sm-left mt-5 mb-3">
          <h1>SHOPPING CART</h1>
        </div>
        <Row className="row-product">
          <Col sm={7} md={8} className="mb-5 cart">
            {cart.items.map((item, index, arr) => {
              return (
                <CartItem
                  hasDivider={index < arr.length - 1}
                  index={index}
                  item={item}
                  key={index}
                  quantityHandler={this.quantityHandler}
                  toggle={this.toggle} />
              )
            })}
          </Col>
          <Col sm={5} md={4} className="mb-5">
            <Card className="summary">
              <CardBody className="flex-column">
                <div>{`SUBTOTAL (${quantity} ITEM${quantity > 1 ? 'S' : ''}):`}</div>
                <div>{subtotal}</div>
                <div className="divider" />
                <div className="w-100">
                  <Button
                    color="dark"
                    className="btn-block"
                    tag={Link}
                    to={user ? '/checkout/shipping' : '/checkout/signIn'}>
                    CHECKOUT
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <ModalGeneric
          body={`You have chosen to remove the ${this.state.item ? this.state.item.product.name : ''} from your cart.`}
          confirmHandler={this.confirmHandler}
          isOpen={this.state.modalOpen}
          toggle={this.toggle} title="Delete Item" />
      </div>
    );
  }
}

export default withRouter(CartDetails);