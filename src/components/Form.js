import React, { useState } from 'react';
import M from 'materialize-css';
import { Button, CardPanel, Col, Icon, Row } from 'react-materialize';
import Copy from './Copy';

function Form() {
	const [shortenURL, setShortenURL] = useState('');

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
						setShortenURL(res.shorturl);
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
						setShortenURL(res.shorturl);
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

	const shareShortLink = () => {
		const shareData = {
			title: `Created with ${document.title}`,
			text: 'Check this out!',
			url: shortenURL,
		};
		navigator.share(shareData);
	};

	return (
		<section className='form-container'>
			<CardPanel>
				<Row>
					<Col s={12}>
						<form onSubmit={onSubmit} className='form'>
							<div className='input-field'>
								<label className='active' htmlFor='url'>
									Enter a Long URL
								</label>
								<input type='url' name='url' className='validate' required />
							</div>
							<Row>
								<Col s={12}>
									<div className='switch'>
										<label>
											<span>Show Stats</span>
											<input disabled type='checkbox' name='stats' />
											<span className='lever'></span>
											<span>(Coming Soon)</span>
										</label>
									</div>
								</Col>
							</Row>
							<Button
								node='button'
								type='submit'
								style={{
									marginRight: '5px',
								}}
								waves='light'>
								<Icon left>content_cut</Icon>
								<span>Shorten It</span>
							</Button>
						</form>
						{shortenURL && (
							<div>
								<div className='input-field'>
									<input type='url' name='shortenurl' value={shortenURL} disabled />
								</div>
								{navigator.share && (
									<Button
										small
										onClick={shareShortLink}
										node='button'
										style={{
											marginRight: '5px',
										}}
										waves='light'>
										<Icon left>share</Icon>
										<span>Share</span>
									</Button>
								)}
								<Copy
									copyText={shortenURL}
									classes='btn btn-small'
									btnText='Copy'
									title='Copy ShortURL to Clipboard'
								/>
							</div>
						)}
					</Col>
				</Row>
			</CardPanel>
		</section>
	);
}

export default Form;
