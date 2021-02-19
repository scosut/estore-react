import React, { Component } from 'react';
import { Carousel, CarouselControl, CarouselIndicators, CarouselItem } from 'reactstrap';
import { Link } from 'react-router-dom';

class ProductCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      animating: false
    }
  }

  next = () => {
    const { products } = this.props;
    if (this.state.animating) return;
    const nextIndex = (this.state.activeIndex === products.length - 1) ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous = () => {
    const { products } = this.props;
    if (this.state.animating) return;
    const nextIndex = (this.state.activeIndex === 0) ? products.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex = (newIndex) => {
    if (this.state.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  setAnimating = (bln) => {
    this.setState({ animating: bln });
  }

  render() {
    const { products } = this.props;
    const slides = products.map(product => {
      return (
        <CarouselItem
          key={product.id}
          onExisting={() => this.setAnimating(true)}
          onExited={() => this.setAnimating(false)}>
          <div className="carousel-caption">
            <p>{`${product.name} (${product.getPrice()})`}</p>
          </div>
          <Link tag="div" to={`/product-details/${product.id}`} className="carousel-image">
            <img src={product.image} alt={product.name} />
          </Link>
        </CarouselItem>
      );
    });

    return (
      <div className="container mt-3">
        <Carousel
          activeIndex={this.state.activeIndex}
          className="bg-dark"
          next={() => this.next()}
          previous={() => this.previous()}>
          {slides}
          <CarouselIndicators
            activeIndex={this.state.activeIndex}
            items={products}
            onClickHandler={(index) => this.goToIndex(index)} />
          <div>
            <CarouselControl
              direction="prev"
              directionText="Previous"
              onClickHandler={() => this.previous()} />
            <CarouselControl
              direction="next"
              directionText="Next"
              onClickHandler={() => this.next()} />
          </div>
        </Carousel>
      </div>
    );
  }
}

export default ProductCarousel;