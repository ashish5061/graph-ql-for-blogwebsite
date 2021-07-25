import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import cron from 'node-cron';
import shell from 'shelljs';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';

const pubsub = new PubSub();

cron.schedule('* * * * *', () => {
	console.log('running a task every minute');
	if (shell.exec('dir').code !== 0) {
		console.log('something went wrong');
	}
});

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers: {
		Query,
		Mutation,
		Subscription,
		User,
		Post,
		Comment,
	},
	context: {
		db,
		pubsub,
	},
});

server.start(() => {
	console.log('The server is up!');
});
