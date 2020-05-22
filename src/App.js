import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Form from './components/Form';
import List from './components/list/List';
import Footer from './components/layout/Footer';
import './scss/App.scss';

function App() {
	useEffect(() => {
		if (localStorage.getItem('theme')) {
			document.body.className = localStorage.getItem('theme');
		}
	}, []);

	return (
		<BrowserRouter basename='/url_shortener_is.gd'>
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
