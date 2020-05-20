import React, { useState, useRef } from 'react';
import M from 'materialize-css';
import { Button, CardPanel, Col, Icon, Row } from 'react-materialize';
import Copy from './Copy';
import axios from 'axios';

function Form() {
	const [shortenURL, setShortenURL] = useState('');
	const urlInput = useRef();

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

		// Add title optional
		getTitle(url).then((res) => {
			const linkCollection = JSON.parse(localStorage.getItem('linksCollection'));
			linkCollection[0].title = res.trim();
			localStorage.setItem('linksCollection', JSON.stringify(linkCollection));
		});
	};

	const onSubmit = (ev) => {
		ev.preventDefault();

		const url = new URL(ev.target.elements.url.value);
		const stats = ev.target.elements.stats.checked;

		if (stats) {
			axios
				.get(`https://is.gd/create.php?format=json&url=${url}&logstats=1`, {
					timeout: 5000,
				})
				.then((res) => {
					const { shorturl } = res.data;
					setShortenURL(shorturl);
					storeUrl(url.href, shorturl, stats);
				})
				.catch((err) => {
					console.log(err);
					M.toast({
						html: `<i class='material-icons red-text'>error</i> &nbsp; ${err.message}`,
						classes: 'error-toast',
					});
				});
		} else {
			axios
				.get(`https://is.gd/create.php?format=json&url=${url}`, {
					timeout: 5000,
				})
				.then((res) => {
					const { shorturl } = res.data;
					setShortenURL(shorturl);
					storeUrl(url.href, shorturl, stats);
				})
				.catch((err) => {
					console.log(err);
					M.toast({
						html: `<i class='material-icons red-text'>error</i> &nbsp; ${err.message}`,
						classes: 'error-toast',
					});
				});
		}

		ev.target.elements.url.value = '';
	};

	const getTitle = (url) => {
		return axios
			.get(`https://cors-anywhere.herokuapp.com/${url}`, {
				timeout: 5000,
			})
			.then((res) => {
				const doc = new DOMParser().parseFromString(res.data, 'text/html');
				const title = doc.querySelectorAll('title')[0];
				if (title) {
					return title.innerText.trim();
				}
			});
	};

	const shareShortLink = () => {
		const shareData = {
			title: `Created with ${document.title}`,
			text: 'Check this out!',
			url: shortenURL,
		};
		navigator.share(shareData);
	};

	const pasteLongURL = async () => {
		try {
			const text = await navigator.clipboard.readText();
			urlInput.current.value = text;
		} catch (err) {
			alert('Clipboard API not supported or Clipboard permission not granted.');
			console.log(err);
		}
	};

	return (
		<section className='form-container'>
			<CardPanel className='z-depth-2'>
				<Row>
					<Col s={12}>
						<form onSubmit={onSubmit} className='form'>
							<div className='input-field'>
								<label className='active' htmlFor='url'>
									Enter a Long URL
								</label>
								<input
									type='url'
									name='url'
									ref={urlInput}
									placeholder='https://mylongurl.com/'
									className='validate url'
									required
								/>
								<Button
									flat
									tabIndex='-1'
									aria-hidden='true'
									className='paste-button hide'
									style={{
										padding: '0',
									}}
									waves='light'
									onClick={pasteLongURL}>
									<Icon>content_paste</Icon>
								</Button>
							</div>
							<Row>
								<Col s={12}>
									<div className='switch'>
										<label>
											<span>Show Stats</span>
											<input type='checkbox' name='stats' />
											<span className='lever'></span>
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
									classes='btn btn-small waves-effect'
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