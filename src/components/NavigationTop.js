import React, { Component } from 'react';
import {
  Button,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
  InputGroupAddon,
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  UncontrolledDropdown
} from 'reactstrap';
import { Link, NavLink as NavLinkRouter, withRouter } from 'react-router-dom';
import TooltipGeneric from './TooltipGeneric';

class NavigationTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navOpen: false,
      search: ''
    }
  }

  toggle = () => {
    this.setState({ navOpen: !this.state.navOpen });
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  clickHandler = (search) => {
    const { history, products, searchHandler } = this.props;
    this.setState({ search: '' });

    if (search.length === 0) {
      history.push('/');
    }
    else {
      const results = products.filter(product => product.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
      searchHandler(results);
      history.push('/search');
    }
  }

  render() {
    const { cart, orders, user } = this.props;
    const quantity = cart.getTotalQuantity();
    const subtotal = cart.getSubtotal();
    const cartVisible = cart.items.length > 0 && (!user || (user && user.role === 'customer'));
    const ordersVisible = orders.length > 0 && user && (user.role === 'administrator' || (user.role === 'customer' && orders.filter(order => order.user === user).length > 0));

    return (
      <Navbar color="dark" dark expand="md">
        <div className="container">
          <NavbarBrand tag={Link} to="/">E-STORE</NavbarBrand>
          <NavbarToggler onClick={() => this.toggle()} />
          <Collapse isOpen={this.state.navOpen} navbar>
            <InputGroup className="input-group-search my-2 my-md-0">
              <Input type="text" name="search" id="search" placeholder="Search products..." value={this.state.search} onChange={(e) => this.changeHandler(e)} />
              <InputGroupAddon addonType="append">
                <Button outline color="success" onClick={() => this.clickHandler(this.state.search)}>
                  <i className="fa fa-search" />
                </Button>
              </InputGroupAddon>
            </InputGroup>
            <Nav className="ml-auto" navbar>
              {cartVisible &&
                <NavItem>
                  <NavLinkRouter id="cart" to="/cart" className="nav-link d-inline-block d-md-block">
                    <i className="fa fa-shopping-cart" /> CART
                  </NavLinkRouter>
                  <TooltipGeneric
                    placement="left"
                    container="#cart"
                    target="cart"
                    text={`Subtotal (${quantity} item${quantity > 1 ? 's' : ''}): ${subtotal}`} />
                </NavItem>
              }
              {user &&
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle tag="a" nav caret>{user.role === 'customer' ? user.name.toUpperCase() : 'ADMIN'}</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem tag={Link} to="/userProfile">Profile</DropdownItem>
                    {user.role === 'administrator' &&
                      <React.Fragment>
                        <DropdownItem divider />
                        <DropdownItem tag={Link} to="/products">Products</DropdownItem>
                      </React.Fragment>
                    }
                    {ordersVisible &&
                      <React.Fragment>
                        <DropdownItem divider />
                        <DropdownItem tag={Link} to="/orders">Orders</DropdownItem>
                      </React.Fragment>
                    }
                    <DropdownItem divider />
                    <DropdownItem tag={Link} to="/signIn">Sign Out</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              }
              {!user &&
                <NavItem>
                  <NavLinkRouter className="nav-link" to="/signIn"><i className="fa fa-user" /> SIGN IN</NavLinkRouter>
                </NavItem>
              }
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    );
  }
}

export default withRouter(NavigationTop);