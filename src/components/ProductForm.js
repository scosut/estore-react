import React, { Component } from 'react';
import { Button, Card, CardBody, CardTitle, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import BreadcrumbGeneric from './BreadcrumbGeneric';
import { withRouter } from 'react-router-dom';

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.product ? this.props.product.name : '',
      price: this.props.product ? this.props.product.price : '',
      image: this.props.product ? this.props.product.image : '',
      brand: this.props.product ? this.props.product.brand : '',
      inStock: this.props.product ? this.props.product.inStock : '',
      category: this.props.product ? this.props.product.category : '',
      description: this.props.product ? this.props.product.description : '',
      errors: {
        name: '',
        price: '',
        image: '',
        brand: '',
        inStock: '',
        category: '',
        description: ''
      }
    };
    this.ref = React.createRef();
  }

  clearError = (e) => {
    this.setState({ errors: { ...this.state.errors, [e.target.name]: '' } });
  }

  setProperty = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => this.clearError(e));
  }

  setErrors = (obj) => {
    this.setState({ errors: obj });
    this.ref.current.querySelector("h1").scrollIntoView();
  }

  update = () => {
    const { classProduct, history, product, productHandler } = this.props;
    let re, products;
    const errors = { name: '', price: '', image: '', brand: '', inStock: '', category: '', description: '' };

    if (this.state.name.length === 0) {
      errors.name = 'Please provide the name.';
    }

    re = /^\d+\.\d{2,}?$/;
    if (this.state.price.length === 0) {
      errors.price = 'Please provide the price.';
    }
    else if (!re.test(this.state.price)) {
      errors.price = `${this.state.price} is invalid.`;
    }

    if (this.state.brand.length === 0) {
      errors.brand = 'Please provide the brand.';
    }

    re = /^\d*$/;
    if (this.state.inStock.length === 0) {
      errors.inStock = 'Please provide the number in stock.';
    }
    else if (!re.test(this.state.inStock)) {
      errors.inStock = `${this.state.inStock} is invalid.`;
    }

    if (this.state.category.length === 0) {
      errors.category = 'Please provide the category.';
    }

    if (this.state.description.length === 0) {
      errors.description = 'Please provide the description';
    }

    if (Object.values(errors).filter(val => val.length > 0).length) {
      this.setErrors(errors);
    }
    else {
      const params = Object.values(this.state);
      params.pop();

      if (product) {
        products = product.update.apply(this, params);
      }
      else {
        products = classProduct.create.apply(this, params);
      }

      productHandler(products);
      history.push('/products');
    }
  }

  render() {
    const { product } = this.props;

    return (
      <React.Fragment>
        <BreadcrumbGeneric href="/products" text="Products" active={product ? 'Edit' : 'Add'} />
        <div className="container" ref={this.ref}>
          <Card className="card-form mt-5 mb-5">
            <CardTitle tag="div">
              <h1>{product ? 'EDIT' : 'ADD'} PRODUCT</h1>
            </CardTitle>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="name" className="col-form-label">Name</Label>
                  <Input type="text" name="name" id="name" className="flat" placeholder="Enter name" invalid={this.state.errors.name.length > 0} onChange={(e) => this.setProperty(e)} value={this.state.name} />
                  <FormFeedback>{this.state.errors.name}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="price" className="col-form-label">Price</Label>
                  <Input type="text" name="price" id="price" className="flat" placeholder="Enter price" invalid={this.state.errors.price.length > 0} onChange={(e) => this.setProperty(e)} value={this.state.price} />
                  <FormFeedback>{this.state.errors.price}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="image" className="col-form-label">Image</Label>
                  <div className="custom-file">
                    <Input type="file" id="image" name="image" className="custom-file-input" accept="image/gif, image/jpeg, image/png" />
                    <Label className="form-control flat custom-file-label" for="image">Select image</Label>
                  </div>
                  {(product && product.image) && <img src={product.image} alt={product.name} className="custom-file-img" />}
                </FormGroup>
                <FormGroup>
                  <Label for="brand" className="col-form-label">Brand</Label>
                  <Input type="text" name="brand" id="brand" className="flat" placeholder="Enter brand" invalid={this.state.errors.brand.length > 0} onChange={(e) => this.setProperty(e)} value={this.state.brand} />
                  <FormFeedback>{this.state.errors.brand}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="inStock" className="col-form-label">Number in Stock</Label>
                  <Input type="text" name="inStock" id="inStock" className="flat" placeholder="Enter number" invalid={this.state.errors.inStock.length > 0} onChange={(e) => this.setProperty(e)} value={this.state.inStock} />
                  <FormFeedback>{this.state.errors.inStock}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="category" className="col-form-label">Category</Label>
                  <Input type="text" name="category" id="category" className="flat" placeholder="Enter category" invalid={this.state.errors.category.length > 0} onChange={(e) => this.setProperty(e)} value={this.state.category} />
                  <FormFeedback>{this.state.errors.category}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="description" className="col-form-label">Description</Label>
                  <Input type="textarea" name="description" id="description" className="flat" placeholder="Enter description" invalid={this.state.errors.description.length > 0} onChange={(e) => this.setProperty(e)} value={this.state.description} />
                  <FormFeedback>{this.state.errors.description}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Button color="dark" onClick={this.update}>{product ? 'UPDATE' : 'ADD'}</Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(ProductForm);