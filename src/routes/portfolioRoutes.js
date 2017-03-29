var express = require('express');
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var portfolioRouter = express.Router();

var router = function(nav){
	var portfolioController = require('../controllers/portfolioController')(nav);
	portfolioRouter.route('/')
		.get(portfolioController.getIndex);
	portfolioRouter.route('/:id')
        .get(portfolioController.getById);
	return portfolioRouter;
}

module.exports = router;
