define(['jquery', 'lib/mustache', 'azure', 'lib/underscore'], function($, Mustache) {
  M = Mustache
  // TODO: do not pollute global scope!
  client = new WindowsAzure.MobileServiceClient(
    "https://ffu.azure-mobile.net/",
    "NOBNKTNLVHWotAPMiQXICsknJeXZjB81"
  )


  function refreshOrders() {
    var orderTemplate = '<div class="order-list-item-container" id="{{id}}" status="{{status}}"><label class="order-list-item orderno" id="{{id}}">Order #{{id}}</label><label class="order-list-item type" id="{{id}}">Reservation</label><label class="order-list-item date" id="{{id}}">{{date}}</label><label class="order-list-item cost" id="{{id}}">{{totalPrice}}&nbsp;GEL</label><div class="order-list-item button reject" id="{{id}}">X</div><div class="order-list-item button accept" id="{{id}}">&#x2713</div></div>'
    var start = new Date()
    return client.getTable('orders').orderByDescending('statusOrder').orderBy('updateDate').read().then(function(res) {
      $('div.orders-container>:not(.dummy)').remove()
      R = res
      res.forEach(function(order) {
        order.date = formatDate(order.arrivalDate)
        var html = Mustache.render(orderTemplate, order)
        $('div.orders-container>.dummy').after(html)
      })
    }).done(function() {
      console.log('Refresh complete in ' + (new Date() - start) + ' milliseconds')
    })
  }

  refreshOrders()
  var refreshLoopId = setInterval(refreshOrders, 1000)
})


function formatDate(d) {
  var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

  var curr_date = d.getDate();
  var curr_month = d.getMonth();
  var curr_year = d.getFullYear();
  var curr_hour = d.getHours();
  var curr_min = d.getMinutes();

  if (curr_hour < 12) {
    a_p = "AM";
  } else {
    a_p = "PM";
  }

  if (curr_hour == 0) {
    curr_hour = 12;
  }

  if (curr_hour > 12) {
    curr_hour = curr_hour - 12;
  }

  return curr_date + "-" + m_names[curr_month] + "-" + curr_year + " " + curr_hour + ":" + curr_min + " " + a_p;
}