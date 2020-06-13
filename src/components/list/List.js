import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css';
import {
	Collection,
	CollectionItem,
	Col,
	Icon,
	Pagination,
	Row,
	Modal,
	Button,
	TextInput,
} from 'react-materialize';
import Copy from '../Copy';
import ListHead from './ListHead';

function List({ match }) {
	const history = useHistory();
	const [urlList, setUrlList] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [activePage, setActivePage] = useState(1);
	const [showSearch, setShowSearch] = useState(false);
	const [editModeActive, setEditModeActive] = useState(false);
	const [editObj, setEditObj] = useState({
		url: '',
		shorturl: '',
		title: '',
		id: '',
	});

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

	const deleteURL = (id, elem) => {
		const linksCollection = JSON.parse(localStorage.getItem('linksCollection'));
		const newLinksCollection = linksCollection.filter((url) => url.id !== id);
		const newUrlList = urlList.filter((url) => url.id !== id);
		elem.classList.add('deleting-item');
		M.Toast.dismissAll();

		localStorage.setItem('linksCollection', JSON.stringify(newLinksCollection));
		setUrlList(newUrlList);
		setTimeout(() => {
			elem.classList.remove('deleting-item');
		}, 500);

		M.toast({
			html: `<i class='material-icons red-text'>check_circle</i> &nbsp; URL Deleted`,
			classes: 'delete-toast',
		});
	};

	const editURL = ({ id }) => {
		const linksCollection = JSON.parse(localStorage.getItem('linksCollection'));
		const newLinksCollection = linksCollection.map((url) => (url.id === id ? editObj : url));
		const newUrlList = urlList.map((url) => (url.id === id ? editObj : url));

		setUrlList(newUrlList);
		localStorage.setItem('linksCollection', JSON.stringify(newLinksCollection));
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
						editMode={() => setEditModeActive((prevState) => !prevState)}
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
					<CollectionItem
						key={index}
						onClick={(ev) => {
							const linksCollection = JSON.parse(localStorage.getItem('linksCollection'));
							const id = ev.target.parentElement.parentElement.parentElement
								.querySelector('.shorturl')
								.innerText.replace('https://is.gd/', '');

							if (ev.target.classList.contains('edit')) {
								let obj = linksCollection.find((url) => url.id === id);
								setEditObj({ title: '', ...obj });
							} else if (ev.target.classList.contains('delete')) {
								deleteURL(id, ev.currentTarget);
							}
						}}>
						<Row>
							<Col s={10}>
								{editModeActive && (
									<div className='edit-mode-icons'>
										<a href='#Edit-Modal' className='modal-trigger'>
											<Icon left className='edit'>
												edit
											</Icon>
										</a>
										<a href='#!'>
											<Icon left className='delete'>
												delete
											</Icon>
										</a>
									</div>
								)}
								<div className='truncate' title='Title'>
									{link.title ? link.title : link.url}
								</div>
								<div className='truncate blue-text shorturl' title='Short URL'>
									{link.shorturl}
								</div>
							</Col>
							<Col s={2}>
								{!editModeActive && (
									<Copy
										copyText={link.shorturl}
										classes='secondary-content secondary-copy-btn'
										btnText=''
										title='Copy ShortURL to Clipboard'
									/>
								)}
								{link.stats && !editModeActive && (
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
			<Modal
				actions={[
					<Button modal='close' node='button' className='red'>
						Cancel
					</Button>,
					<span>&nbsp;&nbsp;&nbsp;</span>,
					<Button modal='close' node='button' className='blue' onClick={() => editURL(editObj)}>
						Edit
					</Button>,
				]}
				className='edit-modal'
				bottomSheet={false}
				fixedFooter
				header='Edit URL'
				id='Edit-Modal'
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
				}}>
				<div style={{ paddingTop: '10px' }}>
					<TextInput
						type='text'
						icon='title'
						value={editObj.title}
						name='title'
						onChange={(ev) => setEditObj({ ...editObj, [ev.target.name]: ev.target.value })}
						label='Title'
					/>
					<TextInput
						type='url'
						icon='public'
						value={editObj.url}
						name='url'
						label='Full URL'
						readOnly
					/>
					<TextInput
						type='url'
						icon='link'
						value={editObj.shorturl}
						name='shorturl'
						label='Short URL'
						readOnly
					/>
				</div>
			</Modal>
		</section>
	);
}

export default List;
