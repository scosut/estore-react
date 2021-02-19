class Utility {
  static formatCurrency = (num) => {
    const nf = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    return nf.format(num);
  }

  static formatDate = (str) => {
    const dtf = new Intl.DateTimeFormat('en-US');
    return dtf.format(new Date(str));
  }

  static getId = (arr) => {
    return arr.length > 0 ? Math.max.apply(this, arr.map(a => a.id)) + 1 : 0;
  }

  static getPages = (perPageLimit, data) => {
    const arr = [...data];
    const pages = [];

    while (arr.length) {
      pages.push(arr.splice(0, perPageLimit));
    }

    return pages;
  }

  static getRating = (reviews) => {
    const num = Math.round((reviews.reduce((a, c) => a + c.rating, 0) / reviews.length) / 0.5) * 0.5;
    return isNaN(num) ? 'review-0' : `review-${num}`.replace('.', '-');
  }
}

export default Utility;