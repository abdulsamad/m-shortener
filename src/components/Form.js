import React from 'react';
import M from 'materialize-css';

function Form() {
	const storeUrl = (url, shorturl) => {
		let objStr = { url, shorturl };

		if (localStorage.getItem('linksCollection') === null) {
			const linkCollection = [];
			linkCollection.push(objStr);
			localStorage.setItem('linksCollection', JSON.stringify(linkCollection));
		} else {
			const linkCollection = JSON.parse(localStorage.getItem('linksCollection'));
			linkCollection.push(objStr);
			localStorage.setItem('linksCollection', JSON.stringify(linkCollection));
		}

		window.location.reload();
	};

	const onSubmit = ev => {
		ev.preventDefault();

		try {
			const url = new URL(ev.target.elements.url.value);

			fetch(`https://is.gd/create.php?format=json&url=${url}&logstats=1`)
				.then(res => {
					return res.json();
				})
				.then(res => {
					storeUrl(url, res.shorturl);
				})
				.catch(err => {
					throw err;
				});

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
		<section className='form'>
			<div className='card'>
				<div className='card-content'>
					<form onSubmit={onSubmit} className='form'>
						<div className='row'>
							<div className='col s12'>
								<div className='input-field'>
									<label className='active' htmlFor='url'>
										Enter a URL
									</label>
									<input type='url' name='url' className='validate' required />
								</div>
								<button type='submit' className='btn'>
									Shorten it
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}

export default Form;
