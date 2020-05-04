import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Navbar as Nav, NavItem } from 'react-materialize';
import About from './About';

function Navbar({ title }) {
	return (
		<header>
			<Nav
				alignLinks='right'
				brand={<a href={document.domain}>{title}</a>}
				menuIcon={<Icon>menu</Icon>}
				options={{
					draggable: true,
					edge: 'left',
					inDuration: 250,
					onCloseEnd: null,
					onCloseStart: null,
					onOpenEnd: null,
					onOpenStart: null,
					outDuration: 200,
					preventScrolling: true,
				}}>
				<NavItem>
					<About />
				</NavItem>
			</Nav>
		</header>
	);
}

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
};

export default Navbar;
