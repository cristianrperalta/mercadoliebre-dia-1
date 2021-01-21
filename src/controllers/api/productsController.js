const { validationResult } = require('express-validator');
const createError = require('http-errors');

// ******** Sequelize ***********

const { Product, Sequelize, Brand, Category } = require('../../database/models');
const Op = Sequelize.Op;

module.exports = {
	
	// Root - Show all products
	latest: function (req, res, next) {
        Product.findAll({
            order : [['createdAt', 'DESC']],
            limit : 5
        })
            .then(resultado => {
                for (let i = 0; i < resultado.length; i++){
                    resultado[i].setDataValue('endpoint', '/api/products/' + resultado[i].id)
                }
                let resJson = {
                    meta : {
                        status : 200,
                        total: resultado.length,
                        url: '/api/products'
                    },
                    data : resultado
                }
                return res.json(resJson)
            })
            .catch(function(error){
                createError(error)
            })                   
    },
    offers: function (req, res, next) {
        Product.findAll({
            where : {
                discount : { 
                    [Op.gt] : 0 
                },
            },
            limit : 5,
        })
            .then(resultado => {
                for (let i = 0; i < resultado.length; i++){
                    resultado[i].setDataValue('endpoint', '/api/products/' + resultado[i].id)
                }
                let resJson = {
                    meta : {
                        status : 200,
                        total: resultado.length,
                        url: '/api/products'
                    },
                    data : resultado
                }
                return res.json(resJson)
            })
            .catch(function(error){
                createError(error)
            })
	},
}