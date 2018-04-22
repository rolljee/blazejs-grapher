import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Todos = new Mongo.Collection('todos');

if (Meteor.isServer) {
	// Fixtures

	Todos.bulkInsert = function bulkInsert(todos) {
		for (const todo of todos) {
			Todos.insert(todo);
		}
	};

	if (Todos.find().count() === 0) {
		Todos.bulkInsert([{
			name: 'toto',
			label: 'remember toto today!'
		}, {
			name: 'foo',
			label: 'remmber foo today!'
		}]);

		console.log('Bulk insert fixtures', Todos.find().fetch());
	}
}

export default Todos;
