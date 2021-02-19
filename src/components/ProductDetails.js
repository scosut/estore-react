import React, { Component } from 'react';
import { Button, Card, CardBody, Input, Col, Row } from 'reactstrap';
import ProductReviews from './ProductReviews';
import BreadcrumbGeneric from './BreadcrumbGeneric';
import Utility from "../shared/utility";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.cartItem = this.props.cart.items.filter(item => item.product === this.props.product);
    this.state = {
      quantity: this.cartItem.length ? this.cartItem[0].quantity : 1
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  quantityHandler = (e) => {
    this.setState({ quantity: Number(e.target.value) });
  }

  buttonHandler = (product, quantity) => {
    const { cart, cartHandler } = this.props;

    if (this.cartItem.length) {
      if (quantity > 0) {
        cart.updateItem(this.cartItem[0], quantity);
      }
      else {
        cart.deleteItem(this.cartItem[0]);
      }
    }
    else {
      cart.addItem(product, quantity);
    }

    cartHandler(cart);
  }

  render() {
    const { orders, product, productHandler, user } = this.props;

    return (
      <React.Fragment>
        <BreadcrumbGeneric href="/" text="Home" active="Product Details" />
        <div className="container mt-5">
          <Row className="row-product">
            <Col sm={2} md={4} className="mb-5">
              <img src={product.image} alt={product.name} className="img-fluid img-shadow" />
            </Col>
            <Col sm={5} md={4} className="mb-5">
              <div className="product">
                <div>{product.name}</div>
                <div className="divider"></div>
                <div className={Utility.getRating(product.reviews)}>
                  {product.reviews.length} reviews
                </div>
                <div className="divider"></div>
                <div>Price: {product.getPrice()}</div>
                <div className="divider"></div>
                <div>Description: {product.description}</div>
              </div>
            </Col>
            <Col sm={5} md={4} className="mb-5">
              <Card className="summary">
                <CardBody>
                  <div>Price:</div>
                  <div>{product.getPrice()}</div>
                  <div className="divider"></div>
                  <div>Status:</div>
                  <div>{product.inStock > 0 ? 'In Stock' : 'Out of Stock'}</div>
                  {((!user || (user && user.role === 'customer')) && product.inStock > 0) &&
                    <React.Fragment>
                      <div className="divider"></div>
                      <div>Quantity:</div>
                      <div>
                        <Input type="select" name="qty" id="qty" className="flat w-auto" value={this.state.quantity} onChange={(e) => this.quantityHandler(e)}>
                          {[...Array(product.inStock + 1).keys()].filter(i => this.cartItem.length ? i >= 0 : i > 0).map(i =>
                            <option key={i} disabled={this.cartItem.length && (i === this.state.quantity)}>{i}</option>)
                          }
                        </Input>
                      </div>
                      <div className="divider"></div>
                      <div className="w-100">
                        <Button
                          color="dark"
                          className="btn-block"
                          onClick={() => this.buttonHandler(product, this.state.quantity)}>
                          {this.cartItem.length ? 'UPDATE QUANTITY' : 'ADD TO CART'}
                        </Button>
                      </div>
                    </React.Fragment>
                  }
                </CardBody>
              </Card>
            </Col>
          </Row>
          <ProductReviews
            orders={orders}
            product={product}
            productHandler={productHandler}
            user={user} />
        </div>
      </React.Fragment>
    )
  }
}

export default ProductDetails;