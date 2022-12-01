import {MongoClient, ObjectId} from 'mongodb';
import MeetupDetails from '../../components/meetups/MeetupDetails';
import {DB_URL} from '../../utils/mongo';

function MeetupDetailsPage(props) {
	return (
		<MeetupDetails
			image={props.meetupData.image}
			title={props.meetupData.title}
			address={props.meetupData.address}
			description={props.meetupData.description}
		/>
	);
}

export async function getStaticPaths() {
	const client = await MongoClient.connect(DB_URL);
	const db = client.db('nextJS');

	const meetupsCollection = db.collection('meetups');

	const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();

	client.close();

	return {
		//should be write programmatically
		//fallback indicated if they are other path or not
		fallback: false,
		paths: meetups.map((meetup) => ({
			params: {meetupId: meetup._id.toString()},
		})),
	};
}

export async function getStaticProps(context) {
	// fetch data for a single meetup

	const meetupId = context.params.meetupId;

	const client = await MongoClient.connect(DB_URL);
	const db = client.db('nextJS');

	const meetupsCollection = db.collection('meetups');

	const meetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)});

	client.close();

	return {
		props: {
			meetupData: {
				id: meetup._id.toString(),
				image: meetup.image,
				title: meetup.title,
				address: meetup.address,
				description: meetup.description,
			},
		},
	};
}
export default MeetupDetailsPage;
