exports.get = function(request, response) {
    console.log(request.query.q)
    
	var mssql = request.service.mssql
	var text = (request.query.q || '') + '%'

	function handleError(err) {
		console.error(statusCodes.INTERNAL_SERVER_ERROR)
		console.error(err)
		response.send(statusCodes.INTERNAL_SERVER_ERROR, err)
	}

	var result = {}
    
    var oneComplete = false

	mssql.query('SELECT * FROM merchants m WHERE m.name LIKE ?', [text], {
		success: function(res) {
			result.merchants = res
            oneComplete = oneComplete ? response.send(statusCodes.OK, result) : true
            console.log('Merchants query finished')
		},
		error: handleError
	})

	mssql.query('SELECT * FROM items m WHERE m.name LIKE ?', [text], {
		success: function(res) {
			result.items = res
            oneComplete = oneComplete ? response.send(statusCodes.OK, result) : true
            console.log('Items query finished')
		},
		error: handleError
	})
};