'use strict'

let AddPostView = Backbone.View.extend({


  tagName: "div",


  className: "container addpost-form",


  events: {
    "click #closeadd": "closeadd",
    "click #publish-btn": "publish",
  },


  initialize: function(data) {
    this.data = data || {};
    this.data.campaigns = S.collection.get("campaigns").toJSON().map((i) => {
      return S.collection2select({id: i.id, text: i.name});
    });
    S.toggleNavigation();
  },


  closeadd: function() {
    S.toggleNavigation(true);
    this.scheduler = new SchedulerCreateView();
    this.remove();
    //this.scheduler.render();
  },


  publish: function() {
    let tags = [];
    tags.push(this.data.bucket);
    tags.push({"like": $("#lkgroups").val()});
    tags.push({"rs": $("#rsgroups").val()});
    let content = {
      txt: $("#postxt").val(),
      img: "http://images2.fanpop.com/image/photos/13700000/Beautiful-Pug-pugs-13728067-1600-1200.jpg",
      tags: tags,
    };

    let post = {
      date: new Date(),
      campaign: $("#campaignSelectorBox").val(),
      phase: $("#phaseSelectorBox").val(),
      content: content,
      owner: S.user.attributes.pk
    };

    let newPost = new Post(post);
    let options = S.addAuthorizationHeader();
    options.error = () => {
      S.logger("bg-danger", "Couldn't schedule new post", true);
    };
    options.wait = true;
    S.collection.get("posts").create(newPost, options);
/*    S.collection.get("posts").add(newPost).sync("create", newPost, {*/
      //headers: S.addAuthorizationHeader().headers,
      //success: (model, response) => {
        //S.logger("bg-success", "Post published succesfully", true);
        //this.closeadd();
      //},
      //error: (model, response) => {
        //console.log(response);
      //}
    /*});*/

  },


  render: function() {
    let template = $("#addpost-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));

    $("#main").html(this.$el);

    // Campaigns and phases select
    let c = $("#campaignSelectorBox").select2({data: this.data.campaigns,
      placeholder: "Select a campaign"});
    let p = $("#phaseSelectorBox").select2({placeholder: "Select a phase"});
    c.on("select2:select", (e) => {
      p.select2({data: S.collection.get("campaigns").get(e.target.value).
        toJSON().phases.map((i) => {
          return S.collection2select({id: i.id, text: i.name});
        })}).prop("disabled", false);
    });

    // RS and Like group selects
    let lk = $("#lkgroups").select2({data: S.collection.get("groups")
      .toJSON().map((i) => {
        return  S.collection2select({id: i.id, text: i.name });
      })
    });
    let rs = $("#rsgroups").select2({data: S.collection.get("groups")
      .toJSON().map((i) => {
        return  S.collection2select({id: i.id, text: i.name });
      })
    });

    return this;
  }
});
