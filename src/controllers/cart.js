export const getCart = async (req, res, next) => {
  try {
    console.log("getCart");
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    //Nếu người dùng chưa có cart thì tạo cart, nếu có rồi thì thêm vào cart
    const cart = Cart.findOne({ userId });
    const productIndex = cart.findIndex((item) => item.product == productId);
    if (productIndex == -1) {
      cart.products.push({ product: productId, quantity });
    } else {
      cart[productIndex].quantity += quantity;
    }
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const checkout = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
