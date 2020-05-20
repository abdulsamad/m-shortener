import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Collection, CollectionItem, Col, Icon, Pagination, Row } from 'react-materialize';
import Copy from './Copy';
import ListHead from './ListHead';

function List({ match }) {
	const history = useHistory();
	const [urlList, setUrlList] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [activePage, setActivePage] = useState(1);
	const [showSearch, setShowSearch] = useState(false);

	useEffect(() => {
		const linksCollection = localStorage.getItem('linksCollection');

		if (linksCollection) {
			let num = 1;
			const step = 10;
			const length = JSON.parse(linksCollection).length;
			while (step * num < length) {
				num++;
			}

			setTotalPages(num);

			if (match.path !== '/') {
				setActivePage(parseInt(match.params.page));
			}

			setUrlList(JSON.parse(linksCollection).slice(activePage * step - step, activePage * step));
		}
	}, [totalPages, activePage, match]);

	const onSearch = (ev, step = 10) => {
		const linksCollection = localStorage.getItem('linksCollection');
		if (linksCollection) {
			const filteredUrlList = JSON.parse(linksCollection).filter((url) => {
				const regex = new RegExp(ev.target.value, 'gi');
				if (!url.title) {
					return url.url.match(regex) || url.shorturl.match(regex);
				}

				return url.url.match(regex) || url.shorturl.match(regex) || url.title.match(regex);
			});

			setUrlList(filteredUrlList.slice(0, step));
		}
	};

	const onSearchCancel = () => {
		setShowSearch(false);
		history.push('/');
	};

	return (
		<section className='links-collection z-depth-2'>
			<Collection
				header={
					<ListHead
						onSearch={onSearch}
						onSearchCancel={onSearchCancel}
						showSearch={showSearch}
						setShowSearch={setShowSearch}
					/>
				}>
				{urlList.length === 0 && (
					<CollectionItem>
						<br />
						<h5 className='grey-text'>Your history will appear here.</h5>
						<br />
					</CollectionItem>
				)}
				{activePage > totalPages && urlList.length > 0 && (
					<CollectionItem>
						<br />
						<h5 className='grey-text'>Page not found</h5>
						<br />
					</CollectionItem>
				)}
				{urlList.map((link, index) => (
					<CollectionItem key={index}>
						<Row>
							<Col s={10}>
								<div className='truncate'>{link.title ? link.title : link.url}</div>
								<div className='truncate blue-text'>{link.shorturl}</div>
							</Col>
							<Col s={2}>
								<Copy
									copyText={link.shorturl}
									classes='secondary-content'
									btnText=''
									title='Copy ShortURL to Clipboard'
								/>
								{link.stats && (
									<a
										href={`https://is.gd/stats.php?url=${link.id}`}
										target='_blank'
										rel='noreferrer noopener'
										className='secondary-content'
										title='Check Statistics'>
										<Icon left>show_chart</Icon>
									</a>
								)}
							</Col>
						</Row>
					</CollectionItem>
				))}
				{!showSearch && (
					<CollectionItem className='center-align'>
						<Pagination
							activePage={activePage}
							items={totalPages}
							leftBtn={<Icon>chevron_left</Icon>}
							maxButtons={5}
							rightBtn={<Icon>chevron_right</Icon>}
							onSelect={(num) => {
								history.push(`/${num}`);
							}}
						/>
					</CollectionItem>
				)}
			</Collection>
		</section>
	);
}

export default List;
