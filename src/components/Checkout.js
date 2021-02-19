import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const Checkout = ({ active }) => {
  const tabs = ['Sign In', 'Shipping', 'Payment', 'Place Order'];

  return (
    <Nav tabs className="mt-5 mb-4">
      {tabs.map((tab, index) => {
        return (
          <NavItem key={index}>
            <NavLink href="#" className={active === tab ? 'disabled active' : 'disabled'}>{tab}</NavLink>
          </NavItem>
        );
      })}
    </Nav>
  );
}

export default Checkout;