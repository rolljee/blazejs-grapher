import { Template } from 'meteor/templating';
import getTodosQuery from '../lib/queries/getTodos';
import './grapher.html';

Template.Grapher.onCreated(function () {
	this.queryResults = new ReactiveVar(false);
});

Template.Grapher.onRendered(function () {
	// Create a reactive computation to wait for sub ready
	this.autorun(function () {
		// Clone the query for the client
		const query  = getTodosQuery.clone();
		// Listen of the ready()
		const handle = query.subscribe();
		if (handle.ready()) {
			// Set result to the template variable
			this.queryResults.set(query.fetch());
		}
	}.bind(this));
});

Template.Grapher.helpers({
	todos() {
		return Template.instance().queryResults.get(); // display
	}
});

Template.Grapher.events({
	'click .js-'(event, instance) {

	}
});

Template.Grapher.onDestroyed(function () {

});
