var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [{
				title: 'Life on the Mississippi',
				genre: 'History',
				author: 'Mark Twain',
				bookId: 99152,
				read: false
			},{
				title: 'Childhood',
				genre: 'Biography',
				author: 'Lev Nikolayevich Tolstoy',
				read: false
			},{
				title: 'Brisinger',
				genre: 'Fantasy',
				author: 'Christopher Paolini',
				bookId: 2248573,
				read: true
			}];


var router = function (nav) {
	adminRouter.use(function(req, res, next){
		if(!req.user){
			res.redirect('/');
		}
		next();
	});
	var bookService = require('../services/goodreadsService')();
	var bookController = require('../controllers/bookController')(bookService, nav);
	adminRouter.route('/addBooks')
		.get(bookController.bulkLoad);
	adminRouter.route('/addBook')
		.get(function(req, res){
			res.render('addBook', {title: 'Add A Book',
                            nav: nav});
		})
		.post(bookController.addOneBook);
	return adminRouter;
};

module.exports = router;
