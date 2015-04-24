import Ember from 'ember';

function CreateTodo() {
    let title = this.get('newTitle');
    if (!title.trim()) {
        return;
    }

    let todo = this.store.createRecord('todo', {
        title: title,
        isCompleted: false
    });

    this.set('newTitle', '');
    todo.save();
}

function ClearCompleted() {
    let completed = this.get('model').filterBy('isCompleted', true);
    completed.invoke('deleteRecord');
    completed.invoke('save');
}

export default Ember.Controller.extend({
    actions: {
        createTodo: CreateTodo,
        clearCompleted: ClearCompleted
    },

    hasCompleted: function() {
        return this.get('completed') > 0;
    }.property('completed'),

    completed: function() {
        return this.get('model').filterBy('isCompleted', true).get('length');
    }.property('model.@each.isCompleted'),

    remaining: function() {
        let todos = this.get('model');
        return todos.filterBy('isCompleted', false).get('length');
    }.property('model.@each.isCompleted'),

    inflection: function() {
        let remaining = this.get('remaining');
        return remaining === 1 ? 'item' : 'items';
    }.property('remaining'),

    allAreDone: function(key, value) {

        let todos = this.get('model');

        if (value === undefined) {
            return !!todos.get('length') && todos.isEvery('isCompleted');
        } else {
            todos.setEach('isCompleted', value);
            todos.invoke('save');
            return value;
        }

    }.property('model.@each.isCompleted')
});