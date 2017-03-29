var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var portfolioController = function(nav){
	
	var getIndex = function(req, res){
		var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db){
                var collection = db.collection('project');
                collection.find({}).toArray(
                    function (err, results) {
						res.render('portfolio', {title: 'Portfolio',
						nav: nav,
						projects: results});
                    }
				);
			});
	};
	
	var getById = function(req, res){
		
		var id = new ObjectId(req.params.id);
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function (err, db){
            var collection = db.collection('project');
            collection.findOne({_id: id},
                function (err, results) {
					
					res.render('projectView', {title: results.title,
						nav: nav,
						project: results});
					});
					
				});

    };
	
	return {
		getIndex: getIndex,
		getById: getById
	}
}

module.exports = portfolioController;
