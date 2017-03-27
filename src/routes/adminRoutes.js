var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [{
				title: 'Life on the Mississippi',
				genre: 'History',
				author: 'Mark Twain',
				read: false
			},{
				title: 'Childhood',
				genre: 'Biography',
				author: 'Lev Nikolayevich Tolstoy',
				read: false
			},{
				title: 'Brisinger',
				genre: 'Fantasy',
				author: 'Scott Paulsen',
				read: true
			}]


var router = function (nav) {

	adminRouter.route('/addBooks')
		.get(function (req, res){
			var url = 'mongodb://localhost:27017/libraryApp';
			mongodb.connect(url, function (err, db){
				var collection = db.collection('books');
				collection.insertMany(books, function(err, results){
					res.send(results);
					db.close();
				});
			});
			//res.send('inserting books');
		});

	return adminRouter;
}

module.exports = router;
