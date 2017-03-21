'use strict'

let Post = Backbone.Model.extend({

  defaults: () => {
    return {
    "date": new Date(),
    "topic": undefined,
    "content": {},
    "owner": 1
    }
  },

  url: () => {
    return apiBuilder("post");
  }
});
