//Backbone Model
var Blog = Backbone.Model.extend({
	defaults: {
		name: '',
		age: 23,
		occupation: ''
	}
	 
});

//Backbone Collection
 var Blogs =Backbone.Collection.extend({

});
 //instantiation of  Collection for the class name Blogs
var blogs=new Blogs();

 //Backbone view for one blog
 var BlogView = Backbone.View.extend({
   model: new Blog(),
   tagName: 'tr',
   initialize:function(){
   	this.template=_.template($(".blogs-list-template").html());
   },
   events: {
    'click .edit-blog': 'edit',
    'click .update-blog': 'update',
    'click .cancel': 'cancel',
    'click .delete-blog': 'delete'
     
   },
   edit: function() {
       $('.edit-blog').hide();
       $('.delete-blog').hide();
       this.$('.update-blog').show();
       this.$('.cancel').show();

       var author = this.$('.author').html();
       var title = this.$('.title').html();
       var url = this.$('.url').html();

       this.$('.author').html('<input type="text" class="form-control author-update" value="' +author+ '">');
       this.$('.title').html('<input type="text" class="form-control title-update" value="' +title+ '">');
       this.$('.url').html('<input type="text" class="form-control url-update" value="' +url+ '">');
   },
   update: function() {
        this.model.set('name', $('.author-update').val());
        this.model.set('age', $('.title-update').val());
        this.model.set('occupation', $('.url-update').val());
   },
   cancel: function(){
       blogsView.render();
   },
   delete: function(){
    this.model.destroy();
   },
   render: function(){
   	this.$el.html(this.template(this.model.toJSON()));
   	return this;
   }

 });
 //instantiation of View for the class name BlogView
 var blogView = new BlogView();



 

 //Backbone view for all blogs
 var BlogsView = Backbone.View.extend({
 	model:blogs,
 	el:$('.blogs-list'),
 	initialize:function(){
    var self = this;
 		this.model.on('add', this.render, this);
    this.model.on('change', function(){
      setTimeout(function(){
        self.render();
      }, 30);
    }, this);
    this.model.on('remove', this.render, this);
 	},
 	render:function(){
 		var self = this;
 		this.$el.html('');
 		_.each(this.model.toArray(),function(blog){
 			self.$el.append((new BlogView({model:blog})).render().$el);
 		});
 		return this;
 	}

 });

 //instantiation of View for the class name BlogsView
 var blogsView = new BlogsView();


 
 $(document).ready(function(){
 	$('.add-blog').on('click', function(){
             var blog = new Blog({
             	name : $('.author-input').val(),
                age : $('.title-input').val(),
              occupation : $('.url-input').val()
             });
             $('.author-input').val('');
             $('.title-input').val('');
             $('.url-input').val('');
             console.log(blog.toJSON());
             blogs.add(blog);
 	})
 })

