import React, { Component } from 'react';
import { Table } from 'reactstrap';
import TooltipGeneric from './TooltipGeneric';
import ModalGeneric from './ModalGeneric';
import PaginationBottom from './PaginationBottom';
import Utility from '../shared/utility';
import { Link } from 'react-router-dom';

class ProductDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      product: null,
      pageIndex: 0
    }
  }

  toggle = (product = this.state.product) => {
    this.setState({ modalOpen: !this.state.modalOpen, product: product });
  }

  pageHandler = (pageIndex, e) => {
    e.preventDefault();

    this.setState({ pageIndex: pageIndex });
  }

  confirmHandler = () => {
    const { productHandler } = this.props;
    const products = this.state.product.delete();
    productHandler(products);
    this.toggle(this.state.product);
  }

  render() {
    const { products } = this.props;
    const pages = Utility.getPages(10, products);

    return (
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mt-5 mb-3">
          <h1>PRODUCTS</h1>
          <Link to="/products/add">
            <i id="addProductLink" className="fa fa-plus-circle text-success" />
          </Link>
          <TooltipGeneric placement="bottom" target="addProductLink" text="Add Product" />
        </div>
        {pages.length > 0 &&
          <div className="table-responsive">
            <Table className="table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>BRAND</th>
                  <th>CATEGORY</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {pages[this.state.pageIndex].map((product, index) => {
                  return (
                    <tr key={index}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.getPrice()}</td>
                      <td>{product.brand}</td>
                      <td>{product.category}</td>
                      <td>
                        <Link to={`/products/edit/${product.id}`}>
                          <i id={`edtProductLink${product.id}`} className="fa fa-pencil text-success mr-2" />
                        </Link>
                        <TooltipGeneric
                          placement="bottom"
                          target={`edtProductLink${product.id}`}
                          text="Edit product" />
                        <i id={`delProductLink${product.id}`} className="fa fa-trash text-success" onClick={() => this.toggle(product)} />
                        <TooltipGeneric
                          placement="bottom"
                          target={`delProductLink${product.id}`}
                          text="Delete product" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              {pages.length > 1 &&
                <tfoot>
                  <tr>
                    <td colSpan="6" className="p-0 pt-5">
                      <PaginationBottom
                        numPages={pages.length}
                        pageHandler={this.pageHandler}
                        pageIndex={this.state.pageIndex} />
                    </td>
                  </tr>
                </tfoot>
              }
            </Table>
          </div>
        }
        <ModalGeneric
          body={`You have chosen to delete the ${this.state.product ? this.state.product.name : ''} from your inventory.`}
          confirmHandler={this.confirmHandler}
          isOpen={this.state.modalOpen}
          toggle={this.toggle} title="Delete Product" />
      </div>
    );
  }
}

export default ProductDashboard;