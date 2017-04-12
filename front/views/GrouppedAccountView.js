'use strict'

let GrouppedAccountView = Backbone.View.extend({
  tagName:"div",
  className: "row",
  
  render: function(){
    let template = $("#groupped-account").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled);
    $("#container").html(this.$el);
  }
});