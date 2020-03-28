import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Modal as Mod } from 'react-materialize';

function Modal({ id, shorturl, url }) {
	return (
		<div>
			<Mod
				actions={[
					<Button flat modal='close' node='button' waves='green'>
						Close
					</Button>,
				]}
				bottomSheet={false}
				fixedFooter={false}
				id='stats-modal'
				options={{
					dismissible: true,
					endingTop: '10%',
					inDuration: 250,
					onCloseEnd: null,
					onCloseStart: null,
					onOpenEnd: null,
					onOpenStart: null,
					opacity: 0.5,
					outDuration: 250,
					preventScrolling: true,
					startingTop: '4%',
				}}
				trigger={
					<a href='#!' node='a' className='secondary-content' title='Show Stats'>
						<Icon>show_chart</Icon>
					</a>
				}>
				<p>
					<span role='img' aria-label='under-construction'>
						🚧
					</span>
					Under Construction
				</p>
			</Mod>
		</div>
	);
}

Modal.propTypes = {
	id: PropTypes.string.isRequired,
};

export default Modal;
