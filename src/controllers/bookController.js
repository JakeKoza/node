var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var bookController = function(bookService, nav){
	var getIndex = function(req, res){
		var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db){
                var collection = db.collection('books');
                collection.find({}).toArray(
                    function (err, results) {
						res.render('books', {title: 'Books Page',
						nav: nav,
						books: results});
                    }
				);
			});
	};	

	var getById = function(req, res){
		
		var id = new ObjectId(req.params.id);
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function (err, db){
            var collection = db.collection('books');
            collection.findOne({_id: id},
                function (err, results) {
					if(results.bookId){
						bookService.getBookById(results.bookId, function(err, book){
							results.book = book;
							res.render('bookView', {title: 'Books Page',
								nav: nav,
								book: results});
							});
					}else{
						res.render('bookView', {title: results.title,
								nav: nav,
								book: results,
								image_url: null});
					}
				});
                    
        });
    };

	var middleware = function(req, res, next){
		if(!req.user){
			//res.redirect('/');
		}
		next();
	};
	
	var addOneBook = function(req, res){
		console.log(req.body.bookId);
			bookService.getBookById(req.body.bookId, function(err, book){
				req.body.image_url = book.image_url;
				
			    var url = 'mongodb://localhost:27017/libraryApp';
			    mongodb.connect(url, function (err, db){
					var collection = db.collection('books');
					collection.insertOne(req.body, function(err, results){
						console.log(results);
						db.close();
						res.redirect('/books');
					});
			
				});
				
			});
			

		};
	
	var bulkLoad = function (req, res){
			var url = 'mongodb://localhost:27017/libraryApp';
			mongodb.connect(url, function (err, db){
				var collection = db.collection('books');
				collection.insertMany(books, function(err, results){
					res.send(results);
					db.close();
				});
			});
			//res.send('inserting books');
		};
	
	return {
		getIndex: getIndex,
		getById: getById,
		middleware: middleware,
		addOneBook: addOneBook,
		bulkLoad: bulkLoad
	};
};

module.exports = bookController;
