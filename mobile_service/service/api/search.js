exports.get = function(request, response) {
	var mssql = request.service.mssql
	var text = request.query.q + '%'

	function handleError(err) {
		console.error(err)
		response.send(statusCodes.INTERNAL_SERVER_ERROR, err)
	}

	var result = {}

	mssql.query('SELECT * FROM merchants m WHERE m.name LIKE ?', [text], {
		success: function(res) {
			result.merchants = res
		},
		error: handleError
	})

	mssql.query('SELECT * FROM items m WHERE m.name LIKE ?', [text], {
		success: function(res) {
			result.items = res
		},
		error: handleError
	})

    response.send(statusCodes.OK, result);
};