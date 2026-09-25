import { useState } from 'preact/hooks';

export default function Greeting({ messages }) {
	const [saludo, setSaludo] = useState(messages[0]);

	const otro = () => {
		setSaludo(messages[Math.floor(Math.random() * messages.length)]);
	};

	return (
		<div>
			<h3>{saludo}, gracias por visitar un blog que nadie pidió.</h3>
			<button onClick={otro}>Otro saludo</button>
		</div>
	);
}
