import React from 'react';


export default function App() {
   const get = async () => {
		const res = await fetch('http://localhost:5000/api/v1');
		console.log(res);
	};
	get();
	return (
		<div>
			<h2>Welcome to Facebook frontend</h2>
         <div className="trash_icon"></div>
		</div>
	);
}
