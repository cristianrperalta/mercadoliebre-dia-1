const bycrypt = require("bcryptjs");
const crypto = require("crypto");
const { validationResult } = require("express-validator");

// ******** Sequelize ***********
const {
    User,
    Product,
    Token,
    Cart,
    Item,
    sequelize,
} = require("../../database/models");

module.exports = {

	addToCart (req, res) {

        const errors = validationResult(req);

        if (errors.isEmpty()) {
            // Busco el producto que voy a agregar como Item.
            Product.findByPk(req.body.productId, {
                include: ["user"],
            })
            .then((product) => {
            // Saco el valor del producto, teniendo en cuenta el descuento.

            let price =
                Number(product.discount) > 0
                ? product.price - (product.price * product.discount) / 100
                : product.price;

            // Creo el Item de compra
            return Item.create({
                salePrice: price,
                quantity: req.body.quantity,
                subTotal: price * req.body.quantity,
                state: 1,
                userId: req.body.userId,
                sellerId: product.user.id,
                productId: product.id,
            });
            })
            .then((item) => {
                let resJson = {
                    meta : {
                        status : 201,
                        url: '/api/items',
                        message: "Product added to cart"
                    },
                    data : { 
                            item
                        }
                }
                return res.json(resJson)
            })
            .catch(e => {
                console.log(e)
                let resJson = {
                    meta : {
                        status : 500,
                        url: '/api/items',
                        message: "Error : Product NOT added to cart"
                    },
                    data : {error: e}
                }
                return res.json(resJson)
            }); 
        } else {
            Product.findByPk(req.body.productId, {
                include: ["user"],
            })
            .then(product => {
                let resJson = {
                    meta : {
                        status : 203,
                        url: '/api/items',
                        message: "Error : Product NOT added to cart"
                    },
                    data : {product: product, errors: errors.mapped()}
                }
                return res.json(resJson)
            })
        }
    },

}


    // Create -  Method to store
/* 
        //const errors = validationResult(req);
        const item = req.body;
        console.log(req);
        item.price = Number(req.body.price);
        item.discount = Number(req.body.discount);
        //item.image = req.file.filename;
        //item.userId = req.session.user.id;
        item.image = req.body.image;
        item.userId = req.body.userId;
        item.categoryId = Number(req.body.categoryId);
        item.brandId = Number(req.body.brandId);

        Product.create(item)
        .then(product => {
            let resJson = {
                meta : {
                    status : 201,
                    url: '/api/products/create',
                    message: "Product added to cart"
                },
                data : { 
                        item
                    }
            }
            return res.json(resJson)
        })
        .catch(e => {
            console.log(e)
            let resJson = {
                meta : {
                    status : 500,
                    url: '/api/products/create',
                    message: "Error : Product NOT added to cart"
                },
                data : {error: e}
            }
            return res.json(resJson)
        }); 
*/
