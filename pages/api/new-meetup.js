// /api/-meetup
//this code is only on the server file

import {MongoClient} from 'mongodb';
import {DB_URL} from '../../utils/mongo';

async function handler(req, res) {
	if (req.method === 'POST') {
		const data = req.body;

		const client = await MongoClient.connect(DB_URL);
		const db = client.db('nextJS');

		const meetupsCollection = db.collection('meetups');

		const result = await meetupsCollection.insertOne(data);

		console.log(result);

		client.close();

		res.status(201).json({message: 'Meetup inserted!'});
	}
}

export default handler;
