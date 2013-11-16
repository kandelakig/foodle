function update(item, user, request) {

    item.updateDate = new Date()
    
    request.execute();

}