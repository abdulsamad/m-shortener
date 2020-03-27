import React from 'react';
import './scss/App.scss';
import Navbar from './components/Navbar';
import Form from './components/Form';
import List from './components/List';

function App() {
	return (
		<div className='App'>
			<Navbar title='URL Shortener' />
			<div className='container'>
				<Form />
				<List />
			</div>
		</div>
	);
}

export default App;
