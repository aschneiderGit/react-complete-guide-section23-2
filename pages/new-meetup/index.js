import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetupPage() {
	function onAddMeetUpHandler(enteredData) {
		console.log(enteredData);
	}
	return <NewMeetupForm onAddMeetUp={onAddMeetUpHandler} />;
}

export default NewMeetupPage;
