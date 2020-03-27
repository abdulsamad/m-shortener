import React, { useState, useEffect } from 'react';
import M from 'materialize-css';

function List() {
	const [urlList, seturlList] = useState([]);

	useEffect(() => {
		const obj = JSON.parse(localStorage.getItem('linksCollection'));
		seturlList(obj);
	}, []);

	const copyShortLink = text => {
		const textarea = document.createElement('textarea');
		textarea.value = text;
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand('copy');
		document.body.removeChild(textarea);

		M.toast({
			html: `<i class='material-icons'>check_circle</i> &nbsp; Link Copied`,
			classes: 'copy-toast',
		});
	};

	return (
		<section className='links-collection hoverable'>
			<ul className='collection with-header'>
				<li className='collection-header'>
					<h5>Shorten URL's</h5>
				</li>
				{urlList &&
					urlList.map((link, index) => (
						<li className='collection-item' key={index}>
							<div className='row is-paddingless'>
								<div className='col s11'>
									{link.shorturl} <br />
									<a className='truncate' href={link.url}>
										{link.url}
									</a>
								</div>
								<div className='col s1'>
									<a
										href='#!'
										className='secondary-content'
										onClick={() => copyShortLink(link.shorturl)}>
										<i className='material-icons'>content_copy</i>
									</a>
								</div>
							</div>
						</li>
					))}
			</ul>
		</section>
	);
}

export default List;
