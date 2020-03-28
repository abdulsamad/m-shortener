import React from 'react';
import M from 'materialize-css';
import { Button, CardPanel, Col, Row } from 'react-materialize';

function Form() {
	const storeUrl = (url, shorturl, stats) => {
		const objStr = { url, shorturl, stats, id: shorturl.replace('https://is.gd/', '') };

		if (localStorage.getItem('linksCollection') === null) {
			const linkCollection = [];
			linkCollection.unshift(objStr);
			localStorage.setItem('linksCollection', JSON.stringify(linkCollection));
		} else {
			const linkCollection = JSON.parse(localStorage.getItem('linksCollection'));
			linkCollection.unshift(objStr);
			localStorage.setItem('linksCollection', JSON.stringify(linkCollection));
		}
	};

	const onSubmit = ev => {
		ev.preventDefault();

		try {
			const url = new URL(ev.target.elements.url.value);
			const stats = ev.target.elements.stats.checked;
			if (stats) {
				fetch(`https://is.gd/create.php?format=json&url=${url}&logstats=1`)
					.then(res => {
						return res.json();
					})
					.then(res => {
						storeUrl(url.href, res.shorturl, stats);
					})
					.catch(err => {
						throw err;
					});
			} else {
				fetch(`https://is.gd/create.php?format=json&url=${url}`)
					.then(res => {
						return res.json();
					})
					.then(res => {
						storeUrl(url.href, res.shorturl, stats);
					})
					.catch(err => {
						throw err;
					});
			}

			ev.target.elements.url.value = '';
		} catch (err) {
			console.log(err);
			M.toast({
				html: `<i class='material-icons red-text'>error</i> &nbsp; ${err.message}`,
				classes: 'error-toast',
			});
		}
	};

	return (
		<section className='form-container'>
			<CardPanel>
				<form onSubmit={onSubmit} className='form'>
					<Row>
						<Col s={12}>
							<div className='input-field'>
								<label className='active' htmlFor='url'>
									Enter a URL
								</label>
								<input type='url' name='url' className='validate' required />
							</div>
							<Row>
								<Col s={4}>
									<div className='switch'>
										<label>
											<span>Show Stats</span>
											<input disabled type='checkbox' name='stats' />
											<span className='lever'></span>
											<span>(Coming Soon)</span>
										</label>
									</div>
								</Col>
								<Col s={6}></Col>
							</Row>
							<Button
								node='button'
								type='submit'
								style={{
									marginRight: '5px',
								}}
								waves='light'>
								Shorten it
							</Button>
						</Col>
					</Row>
				</form>
			</CardPanel>
		</section>
	);
}

export default Form;
