function read(query, user, request) {

    request.execute({
        success: function(orders) {
            tables.getTable('merchants').select('id', 'name').read({
                success: function(merchants) {
                    orders.forEach(function(order) {
                        var merch = merchants.filter(function(m) { return m.id == order.merchant })[0]
                        order.merchantName = merch ? merch.name : undefined
                    })
                    request.respond()
                }
            })
        }
    })

}