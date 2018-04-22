import { Meteor } from 'meteor/meteor';
import Todos from '../todos';

// Create a query that will be used client and server
const query = Todos.createQuery('getTodos', {
	label: 1,
	name: 1,
});

if (Meteor.isServer) {
	// expose the query to the client
	query.expose({
		firewall(userId, params) {
			console.log('firewall', userId, params);
		},
		publication: true, // true or false (true for reactive) / (false for static query)
	});
}

export default query;
