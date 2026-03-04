import Checkout from "../models/checkout.model.js";


export const createCheckout = async (userId) => {
    let checkout = await Checkout.findOne({userId});

    if(!checkout){
        checkout = await Checkout.create({userId})
    }

    return checkout;
}