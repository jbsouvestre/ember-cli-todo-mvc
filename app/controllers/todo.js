import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        editTodo: function() {
            this.set('isEditing', true);
        },
        acceptChanges: function() {
            this.set('isEditing', false);
            if (Ember.isEmpty(this.model.get('title'))) {
                this.send('removeTodo');
            } else {
                this.get('model').save();
            }
        },
        removeTodo: function() {
            let todo = this.get('model');
            todo.deleteRecord();
            todo.save();
        }
    },
    isEditing: false,
    isCompleted: function(key, value) {
        let model = this.get('model');
        if (value === undefined) {
            return model.get('isCompleted');
        } else {
            model.set('isCompleted', value);
            model.save();
            return value;
        }
    }.property('model.isCompleted')
});