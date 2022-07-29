export const Product = {
  category: (parent, args, context) => {
    return context.db.categories.find(
      (category) => category.id === parent.categoryId
    );
  },
  reviews: (parent, args, context) => {
    return context.db.reviews.filter((review) => review.productId === parent.id);
  },
};
