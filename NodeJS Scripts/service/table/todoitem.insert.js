function insert(item, user, request) {           
  request.execute({
    success: function(){
      request.respond();
      sendNotifications(item);
    },
    error: function(err){
      request.respond(500, "Error");
    }
  });
}

// Simple function to send notifications to all devices
function sendNotifications(item){                        
  var tokenTable = tables.getTable('PushInfo'); 
  tokenTable.read({ 
    success: function(tokens){
      tokens.forEach(function(token){    
        push.apns.send(token.token, {
          alert: "new item: " + item.text
        },
        {
          success: function(response){                                               
            console.log(response);
          },                                   
          error: function(err){                                               
            console.error(err);                       
          }                    
        });
      });
    }       
  }); 
}