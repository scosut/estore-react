import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const BreadcrumbGeneric = ({ active, href, text }) => {
  return (
    <div className="bg-breadcrumb">
      <Breadcrumb className="container px-sm-0">
        <BreadcrumbItem><Link to={href}>{text}</Link></BreadcrumbItem>
        <BreadcrumbItem active>{active}</BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
}

export default BreadcrumbGeneric;