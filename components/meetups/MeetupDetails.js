import style from './MeetupDetails.module.css';

function MeetupDetails(props) {
	return (
		<section className={style.detail}>
			<img src={props.image} alt={props.title} />
			<h1> {props.title}</h1>
			<address> {props.adress}</address>
			<p> {props.description}</p>
		</section>
	);
}

export default MeetupDetails;