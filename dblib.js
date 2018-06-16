module.exports = {

	insert: function (titleField, contentField) {
		var MongoClient = require('mongodb').MongoClient;
		var url = "mongodb://localhost:27017/";
		MongoClient.connect(url, function (err, db) {
			if (err) throw err;
			var dbo = db.db("mydb");
			var myobj = { title: titleField, content: contentField };
			dbo.collection("customers").insertOne(myobj, function (err, res) {
				if (err) throw err;
				console.log("1 document inserted");
				db.close();
			});
		});
	},
	findOne: function (option) {
		return new Promise(() => {

			var MongoClient = require('mongodb').MongoClient;
			var url = "mongodb://localhost:27017/";
			MongoClient.connect(url, function (err, db) {
				if (err) throw err;
				var dbo = db.db("mydb");
				dbo.collection("customers").find({ title: option }).toArray(function (err, result) {
					if (err) throw err;
					console.log(result);
					return result;
					db.close();
				});
			});
		})
	},
	findAll: function () {
		var MongoClient = require('mongodb').MongoClient;
		var url = "mongodb://localhost:27017/";

		MongoClient.connect(url, function (err, db) {
			if (err) throw err;
			var dbo = db.db("mydb");
			dbo.collection("customers").find({}).toArray(function (err, result) {
				if (err) throw err;
				console.log(result);
				return result;
				db.close();
			});
		}); 
	}
}