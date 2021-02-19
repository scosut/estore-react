import React, { Component } from 'react';
import { Table } from 'reactstrap';
import PaginationBottom from './PaginationBottom';
import Utility from '../shared/utility';
import { Link } from 'react-router-dom';

class OrderDashboard extends Component {
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
    const { orders, user } = this.props;
    const ordersByRole = user.role === 'administrator' ? orders : orders.filter(order => order.user === user);
    const pages = Utility.getPages(10, ordersByRole);

    return (
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mt-5 mb-3">
          <h1>ORDERS</h1>
        </div>
        {pages.length > 0 &&
          <div className="table-responsive">
            <Table className="table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                </tr>
              </thead>
              <tbody>
                {pages[this.state.pageIndex].map((order, index) => {
                  return (
                    <tr key={index}>
                      <td><Link to={`/order-details/${order.id}`} className="table-link">{order.id}</Link></td>
                      <td>{order.user.name}</td>
                      <td>{order.ordered}</td>
                      <td>{order.getTotal()}</td>
                      <td>{order.paid}</td>
                      <td>{order.delivered ? order.delivered : <i className="fa fa-times text-danger" />}</td>
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
      </div>
    );
  }
}

export default OrderDashboard;