import React, { Component } from 'react';
import NavigationTop from './NavigationTop';
import SignInForm from './SignInForm';
import RegisterForm from './RegisterForm';
import UserProfileForm from './UserProfileForm';
import ProductForm from './ProductForm';
import ShippingForm from './ShippingForm';
import PaymentForm from './PaymentForm';
import ProductGallery from './ProductGallery';
import ProductDetails from './ProductDetails';
import ProductDashboard from './ProductDashboard';
import OrderDashboard from './OrderDashboard';
import CartDetails from './CartDetails';
import OrderDetails from './OrderDetails';
import Footer from './Footer';
import { User, Users, Product, Products, Cart, Order, Orders } from '../shared/data';
import { Switch, Route, Redirect } from 'react-router-dom';
import '../App.css';

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: new Cart(),
      orders: Orders,
      products: Products,
      search: [],
      user: null,
      users: Users
    }
  }

  cartHandler = (cart = new Cart()) => {
    this.setState({ cart: cart });
  }

  orderHandler = (orders) => {
    this.setState({ orders: orders });
  }

  productHandler = (products) => {
    this.setState({ products: products });
  }

  searchHandler = (search) => {
    this.setState({ search: search });
  }

  userHandler = (user) => {
    this.setState({ user: user });
  }

  render() {
    const ProductById = ({ match }) => {
      return (
        <ProductForm
          classProduct={Product}
          product={this.state.products.filter(product => product.id === +match.params.productId)[0]}
          productHandler={this.productHandler} />
      );
    }

    const ProductDetailsById = ({ match }) => {
      return (
        <ProductDetails
          cart={this.state.cart}
          cartHandler={this.cartHandler}
          orders={this.state.orders}
          product={this.state.products.filter(product => product.id === +match.params.productId)[0]}
          productHandler={this.productHandler}
          user={this.state.user} />
      );
    }

    const OrderDetailsById = ({ match }) => {
      const order = this.state.orders.filter(order => order.id === +match.params.orderId)[0];
      return (
        <OrderDetails
          breadcrumb
          loggedInUser={this.state.user}
          order={order}
          orderHandler={this.orderHandler}
          user={order.user} />
      );
    }

    return (
      <div className="App">
        <NavigationTop
          cart={this.state.cart}
          orders={this.state.orders}
          products={this.state.products}
          searchHandler={this.searchHandler}
          user={this.state.user} />
        <Switch>
          <Route exact path='/'
            render={() => <ProductGallery
              products={this.state.products} />} />
          <Route exact path='/search'
            render={() => <ProductGallery
              products={this.state.search}
              search />} />
          <Route exact path='/cart'
            render={() => <CartDetails
              cart={this.state.cart}
              cartHandler={this.cartHandler}
              user={this.state.user} />} />
          <Route exact path='/checkout/signIn'
            render={() => <SignInForm
              checkout
              user={this.state.user}
              userHandler={this.userHandler}
              users={this.state.users} />} />
          <Route exact path='/checkout/shipping'
            render={() => <ShippingForm
              cart={this.state.cart}
              cartHandler={this.cartHandler} />} />
          <Route exact path='/checkout/payment'
            render={() => <PaymentForm
              cart={this.state.cart}
              cartHandler={this.cartHandler} />} />
          <Route exact path='/checkout/order-details'
            render={() => <OrderDetails
              cart={this.state.cart}
              cartHandler={this.cartHandler}
              checkout
              classOrder={Order}
              loggedInUser={this.state.user}
              orderHandler={this.orderHandler}
              user={this.state.user} />} />
          <Route exact path='/orders'
            render={() => <OrderDashboard
              orders={this.state.orders}
              user={this.state.user} />} />
          <Route exact path='/products'
            render={() => <ProductDashboard
              classProduct={Product}
              productHandler={this.productHandler}
              products={this.state.products} />} />
          <Route exact path='/products/add'
            render={() => <ProductForm
              classProduct={Product}
              productHandler={this.productHandler} />} />
          <Route exact path='/signIn'
            render={() => <SignInForm
              user={this.state.user}
              userHandler={this.userHandler}
              users={this.state.users} />} />
          <Route exact path='/register'
            render={() => <RegisterForm
              classUser={User}
              users={this.state.users} />} />
          <Route exact path='/userProfile'
            render={() => <UserProfileForm
              classUser={User}
              user={this.state.user}
              userHandler={this.userHandler}
              users={this.state.users} />} />
          <Route exact path='/products/edit/:productId' component={ProductById} />
          <Route exact path='/product-details/:productId' component={ProductDetailsById} />
          <Route exact path='/order-details/:orderId' component={OrderDetailsById} />
          <Redirect to='/' />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default MainComponent;