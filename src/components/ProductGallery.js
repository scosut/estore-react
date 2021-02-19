import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import BreadcrumbGeneric from './BreadcrumbGeneric';
import ProductCarousel from './ProductCarousel';
import PaginationBottom from "./PaginationBottom";
import Utility from "../shared/utility";

class ProductGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0
    }
  }

  pageHandler = (pageIndex, e) => {
    e.preventDefault();

    this.setState({ pageIndex: pageIndex });
  }

  render() {
    const { products, search } = this.props;
    const pages = Utility.getPages(6, products);

    return (
      <React.Fragment>
        {!search &&
          <ProductCarousel products={pages[0].slice(0, 3)} />
        }
        {search &&
          <BreadcrumbGeneric href="/" text="Home" active="Search" />
        }
        <div className="container">
          <div className="text-center text-sm-left mt-5 mb-3">
            <h1>{search ? 'SEARCH RESULTS' : 'AVAILABLE PRODUCTS'}</h1>
          </div>
          {pages.length > 0 &&
            <Row>
              {pages[this.state.pageIndex].map(product => {
                return (
                  <Col key={product.id} sm={6} md={4} className="mb-5">
                    <Card>
                      <Link to={`/product-details/${product.id}`}>
                        <CardImg top className="img-shadow" src={product.image} alt={product.name} />
                      </Link>
                      <CardBody>
                        <CardTitle tag="h5">{product.name}</CardTitle>
                        <p className={Utility.getRating(product.reviews)}>{product.reviews.length} reviews</p>
                        <CardText>{product.getPrice()}</CardText>
                      </CardBody>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          }
          {pages.length === 0 &&
            <Row>
              <Col>No matches found.</Col>
            </Row>
          }
          <PaginationBottom
            numPages={pages.length}
            pageHandler={this.pageHandler}
            pageIndex={this.state.pageIndex} />
        </div>
      </React.Fragment>
    );
  }
}

export default ProductGallery;