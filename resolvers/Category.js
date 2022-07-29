export const Category = {
  products: (parent, args, context) => {
    const products = context.db.products.filter(
      (product) => product.categoryId === parent.id
    );
    let filteredProducts = products;
    if (args.filter) {
      if (args.filter.onSale) {
        filteredProducts = filteredProducts.filter((product) => product.onSale);
      }
    }
    return filteredProducts;
  },
};
