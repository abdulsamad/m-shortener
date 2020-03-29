import React, { useState, useEffect } from 'react';
import {
	Collection,
	CollectionItem,
	Col,
	Dropdown,
	Icon,
	Pagination,
	Row,
} from 'react-materialize';
import Modal from './Modal';
import Copy from './Copy';

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

	return (
		<section className='links-collection z-depth-2 hoverable'>
			{urlList.length > 0 && (
				<Collection
					header={
						<div className='list-head'>
							<div className='heading'>Shorten Links</div>
							<Dropdown
								id='list-dropdown'
								options={{
									alignment: 'left',
									autoTrigger: true,
									closeOnClick: true,
									constrainWidth: true,
									container: null,
									coverTrigger: true,
									hover: false,
									inDuration: 150,
									onCloseEnd: null,
									onCloseStart: null,
									onOpenEnd: null,
									onOpenStart: null,
									outDuration: 250,
								}}
								trigger={
									<a href='#!'>
										<Icon right>more_vert</Icon>
									</a>
								}>
								<a href='#!'>
									<Icon>import_export</Icon> Import
								</a>
								<a href='#!'>
									<Icon>cloud_download</Icon> Export
								</a>
							</Dropdown>
						</div>
					}>
					{urlList.map((link, index) => (
						<CollectionItem key={index}>
							<Row>
								<Col s={11}>
									{link.shorturl} <br />
									<span className='truncate blue-text'>{link.url}</span>
								</Col>
								<Col s={1}>
									<Copy
										copyText={link.shorturl}
										classes='secondary-content'
										btnText=''
										title='Copy ShortURL to Clipboard'
									/>
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
