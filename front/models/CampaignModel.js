'use strict'

let Campaign = Backbone.Model.extend({


  defaults: () => {
    return {
      "name": undefined,
      "description": undefined,
    }
  },


  url: () => {
    return "/campaign/" + this.id;
  }


});