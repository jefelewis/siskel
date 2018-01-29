var Movie = Backbone.Model.extend({

  defaults: {
    like: true
  },

  toggleLike: function() {
    // If the State is True, set Like to False
    if (this.get('like')) {
      this.set('like', false);
    } else {
    // If the State is False, set Like to True
      this.set('like', true);
    }
    
  }

});

var Movies = Backbone.Collection.extend({

  model: Movie,

  initialize: function() {
    //
    this.on('change', function() {
      this.set('comparator');
    });
  },

  comparator: 'title',

  sortByField: function(field) {
    // Add Field argument to the Comparator
    this.comparator = field;
    // Sort now that the field has been added
    this.sort();
  }

});

var AppView = Backbone.View.extend({

  events: {
    'click form input': 'handleClick'
  },

  handleClick: function(e) {
    var field = $(e.target).val();
    this.collection.sortByField(field);
  },

  render: function() {
    new MoviesView({
      el: this.$('#movies'),
      collection: this.collection
    }).render();
  }

});

var MovieView = Backbone.View.extend({

  template: _.template('<div class="movie"> \
                          <div class="like"> \
                            <button><img src="images/<%- like ? \'up\' : \'down\' %>.jpg"></button> \
                          </div> \
                          <span class="title"><%- title %></span> \
                          <span class="year">(<%- year %>)</span> \
                          <div class="rating">Fan rating: <%- rating %> of 10</div> \
                        </div>'),

  initialize: function() {
    // Re-render when the model changes
    this.render();

  },

  events: {
    'click button': 'handleClick'
  },

  handleClick: function() {
    // your code here
    
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }

});

var MoviesView = Backbone.View.extend({

  initialize: function() {
    // Re-render when the model changes
    this.render();
  },

  render: function() {
    this.$el.empty();
    this.collection.forEach(this.renderMovie, this);
  },

  renderMovie: function(movie) {
    var movieView = new MovieView({model: movie});
    this.$el.append(movieView.render());
  }

});
