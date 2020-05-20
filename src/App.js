import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Form from './components/Form';
import List from './components/List';
import Footer from './components/Footer';
import './scss/App.scss';

function App() {
	useEffect(() => {
		if (localStorage.getItem('theme')) {
			document.body.classList.add(localStorage.getItem('theme'));
		}
	}, []);

	return (
		<BrowserRouter basename='/url_shortener-is.gd'>
			<div className='App'>
				<Navbar title='URL Shortener' />
				<div className='container'>
					<Form />
					<Switch>
						<Route exact from='/' component={List} />
						<Route exact from='/:page' component={List} />
					</Switch>
				</div>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
