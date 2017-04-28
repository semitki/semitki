'use strict'

let addCampaign = Backbone.View.extend({
  tagName: "div",


  className: "modal-dialog",

  events: {
    "submit form": "onSubmit"
  },


  initialize: function(data) {
    this.data = data || undefined;
  },



  render: function(){
    let template = $("#campaign-modal-add").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $("#dialog-add").html(this.$el);
  },


});