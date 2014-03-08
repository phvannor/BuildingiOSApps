function insert(item, user, request) {
    var tokenTable = tables.getTable('PushInfo'); 
    console.log('registering device');
    
    // Upsert device token (do nothing if found)
    tokenTable.where({ token: item.token }).read({
        success: function (result) {
            console.log('success');            
            if (result.length === 0) {
                    request.execute();
            } else {
                request.respond(200, result[0]);
            }
        },
        error: function (error) {
            console.log('error');
        }
    });
}