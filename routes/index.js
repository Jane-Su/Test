exports.select = function(ibmdb,connString) {
    return function(req, res) {

	   
	res.render('index');

	   
		}
	}
	

exports.insert = function(ibmdb,connString) {
    return function(req, res) {
		var name = req.body.username;
		var points = req.body.points;
	   	   
       ibmdb.open(connString, function(err, conn) {
			if (err ) {
			 res.send("error occurred " + err.message);
			}
			else {
				conn.query("insert into student (name, points) values('" + name +"', " +points+");", function(err, tables, moreResultSets) {
							
							
				if ( !err ) {
				
					res.send("successfull");

					
				} else {
				   res.send("error occurred " + err.message);
				}

				/*
					Close the connection to the database
					param 1: The callback function to execute on completion of close function.
				*/
				conn.close(function(){
					console.log("Connection Closed");
					});
				});
			}
		} );
	   
	}
	}
	
exports.getRanking = function(ibmdb,connString) {
    return function(req, res) {

	   	   
       ibmdb.open(connString, function(err, conn) {
			if (err ) {
			 res.send("error occurred " + err.message);
			}
			else {
				
				conn.query("SELECT NAME,POINTS FROM STUDENT ORDER BY POINTS DESC", function(err, tables, moreResultSets) {
							
							
				if ( !err ) { 
					res.render('ranking', {
						"tablelist" : tables
						
					 });

					
				} else {
				   res.send("error occurred " + err.message);
				}

				/*
					Close the connection to the database
					param 1: The callback function to execute on completion of close function.
				*/
				conn.close(function(){
					console.log("Connection Closed");
					});
				});
			}
		} );
	   
	}
	}
