function read(query, user, request) {
    
    console.log(query);

    request.execute({
        success: function(result) {
            console.log('Result', result)
            request.respond()
        }
    });

}