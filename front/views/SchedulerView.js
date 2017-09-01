'use strict';

let SchedulerView = Backbone.View.extend({

  tagName: "div",

  className: "container xyz",

  initialize: function() {
    this.on('ready', S.fetchCollections);
    S.collection.get('posts').on('update', function() {
      this.post_render();
    S.view.get('menu').render();
    });
  },

  post_render: function() {
    let calendarFeed = S.calendarFeed();
    // Initialize datimepicker here after rendering, otherwise it won't work
    $('#scheduledForPicker').datetimepicker();
    // Initialize calendar view
    let calendar = $("#calendar-panel").calendar({
      tooltip_container: "main",
      language: S.lang.substr(0, 2),
      locale: S.lang.substr(0, 2),
      modal: "#dialog",
      tmpl_path: "/tmpls/",
      modal_type: "ajax",
      events_source: calendarFeed
    });

    // Calendar navigation
    let calButton = ['prev', 'next', 'day', 'week', 'month', 'year'];
    // TODO make this with Array.each() method
    calButton.map((target) => {
      if(target === 'prev' || target === 'next') {
        $('#btn-' + target).on('click', () => {
          calendar.navigate(target);
        });
      } else {
        $('#btn-' + target).on('click', () => {
          calendar.view(target);
        });
      }
    });
  },

  render: function() {
    let compiled = S.handlebarsCompile("#scheduler-template");
    this.$el.html(compiled);
    debugger;

    $("#main").html(this.$el);

    if (this.tour != undefined){
      this.tour.start(true);
    }
    $('.menu-toggle').on('click', function() {
      S.toggleMenu();
    });

    this.trigger('ready');
    return this;
  }
});
