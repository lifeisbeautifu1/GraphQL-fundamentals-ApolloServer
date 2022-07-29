export const Query = {
  hello: () => {
    return 'Hello world!';
  },
  products: (parent, args, context) => {
    let filteredProducts = context.db.products;
    if (args.filter) {
      if (args.filter.onSale) {
        filteredProducts = filteredProducts.filter((product) => product.onSale);
      }
      if ([1, 2, 3, 4, 5].includes(args.filter.avgRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          const reviews = context.db.reviews.filter(
            (review) => review.productId === product.id
          );
          const sumRating = reviews.reduce((total, item) => {
            return (total += item.rating);
          }, 0);

          return sumRating / reviews.length >= args.filter.avgRating;
        });
      }
    }
    return filteredProducts;
  },
  product: (parent, args, context) => {
    return context.db.products.find((product) => product.id === args.id);
  },
  categories: (parent, args, context) => {
    return context.db.categories;
  },
  category: (parent, args, context) => {
    return context.db.categories.find((category) => category.id === args.id);
  },
  reviews: (parent, args, context) => {
    return context.db.reviews;
  },
  review: (parent, args, context) => {
    return context.db.reviews.find((review) => review.id === args.id);
  },
};
