import React, { Component } from 'react';
import Message from './Message';
import { Button, Form, FormGroup, FormFeedback, Label, Input, Row, Col } from 'reactstrap';

class ProductReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: '',
      comments: '',
      errors: {
        rating: '',
        comments: ''
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

  review = () => {
    const { product, productHandler, user } = this.props;
    const errors = { rating: '', comments: '' };

    if (this.state.rating.length === 0) {
      errors.rating = 'Please select a rating.';
    }

    if (this.state.comments.length === 0) {
      errors.comments = 'Please provide the comments.';
    }

    if (Object.values(errors).filter(val => val.length > 0).length) {
      this.setErrors(errors);
    }
    else {
      const products = product.review(user, this.state.rating, this.state.comments);
      productHandler(products);
    }
  }

  render() {
    const { orders, product, user } = this.props;
    const userReview = product.reviews.filter(review => review.user === user);
    const userOrders = orders.filter(order => order.user === user);
    let hasPurchased = false;

    for (var i = 0; i < userOrders.length; i++) {
      hasPurchased = userOrders[i].items.filter(item => item.product === product).length > 0;

      if (hasPurchased) {
        break;
      }
    }

    const reviews = product.reviews.map((review, index, arr) => {
      return (
        <div key={index}>
          <p>{review.user.name}</p>
          <p className={`review-${review.rating}`}></p>
          <p>{review.date}</p>
          <p className="review-text">{review.comments}</p>
          {index < arr.length - 1 &&
            <div className="divider" />
          }
        </div>
      );
    });

    const reviewForm = (
      <React.Fragment>
        {product.reviews.length > 0 &&
          <div className="divider" />
        }
        <h2>WRITE A CUSTOMER REVIEW</h2>
        {userReview.length > 0 &&
          <Message color="success" message={`You reviewed this item on ${userReview[0].date}.`} />
        }
        {userReview.length === 0 &&
          <Form>
            <FormGroup>
              <Label for="rating">Rating</Label>
              <Input type="select" name="rating" id="rating" className="flat" invalid={this.state.errors.rating.length > 0} onChange={(e) => this.setProperty(e)} value={this.state.rating}>
                <option></option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Input>
              <FormFeedback>{this.state.errors.rating}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="comments">Comments</Label>
              <Input type="textarea" name="comments" id="comments" className="flat" placeholder="Enter comments" invalid={this.state.errors.comments.length > 0} onChange={(e) => this.setProperty(e)} value={this.state.comments} />
              <FormFeedback>{this.state.errors.comments}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Button color="dark" onClick={this.review}>SUBMIT</Button>
            </FormGroup>
          </Form>
        }
      </React.Fragment>
    );

    return (
      <Row>
        <Col className="col-review mb-5">
          {reviews.length > 0 &&
            <h2>REVIEWS</h2>
          }
          {reviews}
          {(user && user.role === 'customer' && hasPurchased) &&
            reviewForm
          }
        </Col>
      </Row>
    );
  }
}

export default ProductReviews;