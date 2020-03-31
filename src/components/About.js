import React from 'react';
import { Button, Icon, Modal } from 'react-materialize';

function About() {
	return (
		<div>
			<Modal
				actions={[
					<Button flat modal='close' node='button' waves='green'>
						Close
					</Button>,
				]}
				bottomSheet
				fixedFooter={false}
				header='About'
				id='about-modal'
				open={false}
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
				trigger={<div>About</div>}>
				<div className='about'>
					<div className='flow-text'>URL Shortner v{process.env.REACT_APP_VERSION}</div>
					<div
						className='valign-wrapper'
						style={{
							marginTop: '5px',
						}}>
						Made with &nbsp; <Icon className='red-text'>favorite</Icon> &nbsp; by &nbsp;
						{process.env.REACT_APP_AUTHOR}
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default About;
