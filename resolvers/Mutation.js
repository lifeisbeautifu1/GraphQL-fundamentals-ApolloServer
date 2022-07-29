import { v4 as uuid } from 'uuid';

export const Mutation = {
  addCategory: (parent, args, context) => {
    const newCategory = {
      id: uuid(),
      name: args.input.name,
    };
    context.db.categories.push(newCategory);
    return newCategory;
  },

  updateCategory: (parent, args, context) => {
    const index = context.db.categories.findIndex(
      (category) => category.id === args.id
    );
    context.db.categories[index] = {
      ...context.db.categories[index],
      ...args.input,
    };
    return context.db.categories[index];
  },

  deleteCategory: (parent, args, context) => {
    context.db.categories = context.db.categories.filter(
      (category) => category.id !== args.id
    );
    context.db.products = context.db.products.map((product) => {
      if (product.categoryId === args.id) {
        return {
          ...product,
          categoryId: null,
        };
      } else {
        return product;
      }
    });
    return true;
  },

  addReview: (parent, args, context) => {
    const { date, title, comment, rating, productId } = args.input;
    const newReview = {
      id: uuid(),
      date,
      title,
      comment,
      rating,
      productId,
    };
    context.db.reviews.push(newReview);
    return newReview;
  },

  updateReview: (parent, args, context) => {
    const index = context.db.reviews.findIndex(
      (review) => review.id === args.id
    );
    context.db.reviews[index] = {
      ...context.db.reviews[index],
      ...args.input,
    };
    return context.db.reviews[index];
  },

  addProduct: (parent, args, context) => {
    const { name, price, categoryId, image, description, quantity, onSale } =
      args.input;
    const newProduct = {
      id: uuid(),
      name,
      price,
      categoryId,
      image,
      description,
      quantity,
      onSale,
    };
    context.db.products.push(newProduct);
    return newProduct;
  },
  deleteProduct: (parent, args, context) => {
    context.db.products = context.db.products.filter((product) => {
      return product.id !== args.id;
    });
    context.db.reviews = context.db.reviews.filter((review) => {
      return review.productId !== args.id;
    });
    return true;
  },
};
