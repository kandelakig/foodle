function insert(item, user, request) {
    
    item.createDate = new Date()
    
    request.execute();

}