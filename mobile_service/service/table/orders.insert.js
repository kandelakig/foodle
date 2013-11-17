function insert(item, user, request) {

    item.createDate = new Date()
    item.updateDate = new Date()
    item.status = 'New'
    item.statusOrder = 1
    
    var orderItems = item.orderItems;
    
    delete item.orderItems;

    request.execute({
        success: function() {
            console.log(item)
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