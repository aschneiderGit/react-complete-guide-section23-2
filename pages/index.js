import {MongoClient} from 'mongodb';
import {DB_URL} from '../utils/mongo';

import {useEffect, useState} from 'react';
import MeetupList from '../components/meetups/MeetupList';

export async function getStaticProps() {
	const client = await MongoClient.connect(DB_URL);
	const db = client.db('nextJS');

	const meetupsCollection = db.collection('meetups');

	const meetups = await meetupsCollection.find().toArray();

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

const DUMMY_MEETUPS = [
	{
		id: 'm1',
		title: 'A First Meetup',
		image:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
		address: 'Some address 5, 12345 Some City',
		description: 'This is a first meetup!',
	},
	{
		id: 'm2',
		title: 'A Second Meetup',
		image:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
		address: 'Some address 10, 12345 Some City',
		description: 'This is a second meetup!',
	},
];

function HomePage(props) {
	const [loadedMeetups, setLoadedMeetups] = useState([]);

	useEffect(() => {
		setLoadedMeetups(DUMMY_MEETUPS);
	}, []);
	return <MeetupList meetups={props.meetups} />;
}

export default HomePage;
