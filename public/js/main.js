$(function() {
    window.App = {
        Models: {},
        Collections: {},
        Views: {}
    };

    window.template = function(id) {
        return _.template( $('#' + id). html() );
    };

    App.Models.Task = Backbone.Model.extend({
        validate: function(attrs) {
            if (! $.trim(attrs.title)) {
                return 'Имя задачи должно быть валидным !';
            }
        }
    });

    App.Views.Task = Backbone.View.extend({
        initialize: function() {
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
        },
        tagName: 'li',
        template: template('taskTemplate'),
        render: function () {
            var template = this.template(this.model.toJSON());
            this.$el.html( template );
            return this;
        },
        events:{
            'click.edit': 'editTask',
            'click.delete': 'destroy'
        },
        destroy: function () {
            this.model.destroy();
            console.log(tasksCollection);
        },
        remove: function(){
            this.$el.remove();
        },
        editTask: function () {
            var newTaskTitle = prompt('Как переименуем задачу ?', this.model.get('title'));
            //if ( !newTaskTitle ) return;
            this.model.set('title', newTaskTitle);
        }
    });

    App.Collections.Task = Backbone.Collection.extend({
        model: App.Models.Task
    });
    App.Views.Tasks = Backbone.View.extend({
        tagName: 'ul',

        initialize: function() {
            this.collection.on('add', this.addOne, this);
        },

        render: function() {
            this.collection.each(this.addOne, this);
            return this;
        },
        addOne: function(task) {
            var taskView = new App.Views.Task({ model:task });
            this.$el.append(taskView.render().el);
        }
    });

    App.Views.AddTask = Backbone.View.extend({
        el: '#addTask',
        events: {
            'submit' : 'submit'
        },

        initialize: function() {
        },
        submit: function(e) {
            e.preventDefault();
            var newTaskTitle = $(e.currentTarget).find('input[type=text]').val();
            var newTask = new App.Models.Task({title: newTaskTitle});
            this.collection.add(newTask);
        }
    });

    window.tasksCollection = new App.Collections.Task([
        {
            title: 'Родиться',
            priority: 4
        },
        {
            title: 'Немножко пожить',
            priority: 3
        },
        {
            title: 'Умереть',
            priority: 5
        },

    ]);

    var tasksView = new App.Views.Tasks({ collection: tasksCollection });

    $('.tasks').html(tasksView.render().el);
    var addTaskView = new App.Views.AddTask({collection: tasksCollection});

});