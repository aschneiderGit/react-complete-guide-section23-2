import {MongoClient} from 'mongodb';
import {DB_URL} from '../utils/mongo';

import {useEffect, useState} from 'react';
import MeetupList from '../components/meetups/MeetupList';

export async function getStaticProps() {
	const client = await MongoClient.connect(DB_URL);
	const db = client.db('nextJS');

	const meetupsCollection = db.collection('meetups');

	const meetups = await meetupsCollection.find().toArray();

	client.close();

	return {
		props: {
			meetups: meetups.map((meetup) => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(),
			})),
		},
		revalidate: 3600,
	};
}

// export async function getServerSideProps(context) {
// 	const req = context.req;
// 	const res = context.res;

// 	return {
// 		props: {
// 			meetups: DUMMY_MEETUPS,
// 		},
// 	};
// }

function HomePage(props) {
	return <MeetupList meetups={props.meetups} />;
}

export default HomePage;
