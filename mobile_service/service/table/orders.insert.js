function insert(item, user, request) {

    item.createDate = new Date()
    item.updateDate = new Date()
    item.status = 'New'
    item.statusOrder = 1
    
    var orderItems = item.orderItems;
    
    delete item.orderItems;
    
    item.totalPrice = orderItems.map(function(orderItem) {
        return orderItem.price * orderItem.quantity
    }).reduce(function(prev, curr, ind) {
        return prev + curr
    })

    request.execute({
        success: function() {
            var orderItemsTable = tables.getTable('orderItems')
            orderItems.forEach(function(orderItem) {
                orderItemsTable.insert({
                    orderId: item.id,
                    itemId: orderItem.itemId,
                    price: orderItem.price,
                    quantity: orderItem.quantity
                })
            })
            request.respond()
        }
    })

}