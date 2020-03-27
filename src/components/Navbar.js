import React from 'react';
import PropTypes from 'prop-types';

function Navbar({ title }) {
	return (
		<header>
			<nav>
				<div className='nav-wrapper'>
					<a href={document.domain} className='brand-logo'>
						&nbsp;{title}
					</a>
				</div>
			</nav>
		</header>
	);
}

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
};

export default Navbar;
