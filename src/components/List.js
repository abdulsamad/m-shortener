import React, { useState, useEffect } from 'react';
import { Collection, CollectionItem, Col, Icon, Pagination, Row } from 'react-materialize';
import Modal from './Modal';
import M from 'materialize-css';

function List() {
	const step = 10;
	const linksCollection = localStorage.getItem('linksCollection');
	const [urlList, seturlList] = useState([]);
	const [pageStart, setPageStart] = useState(0);
	const [pageEnd, setPageEnd] = useState(step);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		let num = 1;

		if (localStorage.getItem('linksCollection')) {
			const length = JSON.parse(linksCollection).length;

			while (step * num < length) {
				num++;
			}

			setTotalPages(num);
		}

		if (linksCollection) {
			const obj = JSON.parse(linksCollection).slice(pageStart, pageEnd);
			seturlList(obj);
		}
	}, [pageStart, pageEnd, linksCollection]);

	const copyShortLink = text => {
		const textarea = document.createElement('textarea');
		textarea.value = text;
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand('copy');
		document.body.removeChild(textarea);

		M.toast({
			html: `<i class='material-icons green-text'>check_circle</i> &nbsp; Link Copied`,
			classes: 'copy-toast',
		});
	};

	return (
		<section className='links-collection z-depth-2 hoverable'>
			{urlList.length > 0 && (
				<Collection header={<h6>Shorten URL's</h6>}>
					{urlList.map((link, index) => (
						<CollectionItem key={index}>
							<Row>
								<Col s={11}>
									{link.shorturl} <br />
									<span className='truncate blue-text'>{link.url}</span>
								</Col>
								<Col s={1}>
									<a
										href='#!'
										className='secondary-content'
										onClick={() => copyShortLink(link.shorturl)}
										title='Copy ShortURL to Clipboard'>
										<Icon>content_copy</Icon>
									</a>
									{link.stats && <Modal id={link.id} shorturl={link.shorturl} url={link.url} />}
								</Col>
							</Row>
						</CollectionItem>
					))}
					{totalPages > 1 && (
						<CollectionItem className='center-align'>
							<Pagination
								activePage={1}
								items={totalPages}
								leftBtn={<Icon>chevron_left</Icon>}
								maxButtons={totalPages}
								rightBtn={<Icon>chevron_right</Icon>}
								onSelect={num => {
									setPageStart(num * step - step);
									setPageEnd(num * step);
								}}
							/>
						</CollectionItem>
					)}
				</Collection>
			)}
		</section>
	);
}

export default List;
