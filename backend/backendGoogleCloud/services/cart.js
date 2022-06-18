const CartModel = require("../models/cart");
const PaymentsService = require("./payments");

class CartService {
  async getItems(idUser) {
    const result = await CartModel.findById(idUser).populate("items.product", "name price");
    return result;
  }

  async addToCart(idUser, idProduct, amount) {
    const cart = await CartModel.findOne({
      _id: idUser,
      "items.product": idProduct
    });

    if(cart) {
      await CartModel.updateOne(
        {_id: idUser, "items.product": idProduct}, 
        {$inc: {"items.$.amount": amount}}, 
      );
      return await CartModel.findById(idUser);
    } else {
      const result = await CartModel.findByIdAndUpdate(idUser, {
        $push: {
          items: {
            product: idProduct,
            amount
          }
        }
      }, {new:true}).populate("items._id", "name price");
  
      return result;
    }

  }

  async removeFromCart(idUser, idProduct) {
    const result = await CartModel.findByIdAndUpdate(idUser, {
      $pull: {
        items: {
          product: idProduct
        }
      }
    }, {new:true});

    return result;
  }

  async pay(idUser) {
    const result = await this.getItems(idUser);

    if(!result) {
      return {
        success: false,
        message: "A wild error has appeared!"
      }
    }

    const total = result.items.reduce((result, item) => {
      return result + (item.product.price * item.amount)
    }, 0) * 100;

    if(total < 1) {
      return {
        success: false,
        message: "The value of your receipt is less than 1!"
      };
    }

    const paymentsServ = new PaymentsService();
    const clientSecret = await paymentsServ.createIntent(total);
    return {
      success: true,
      clientSecret
    };
  }

  async create(idUser) {
    const cart = await CartModel.create({
      _id: idUser,
      items: []
    });

    return cart;
  }

  async clearCart(idUser) {
    // Podríamos pasar los items que tiene el usuario a su registro de productos comprados
    const cart = await CartModel.findByIdAndUpdate(idUser, {
      items: []
    }, {new:true});
    // Podríamos llamar al Servicio de Productos para retirar del Stock
    // En Stripe se puede devolver dinero, de ahí podemos verificar el Stock, como en Amazon
    return cart;
  }
}

module.exports = CartService;