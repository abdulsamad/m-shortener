import React, { useState, useEffect } from 'react';
import {
	Button,
	Collection,
	CollectionItem,
	Col,
	Dropdown,
	Icon,
	Modal,
	Pagination,
	Row,
} from 'react-materialize';
import M from 'materialize-css';
import Copy from './Copy';

function List() {
	const step = 10;
	const linksCollection = localStorage.getItem('linksCollection');
	const linkHash = 'e5a9cc5a85b282aec3acbc5f95bd009a';
	const [urlList, setUrlList] = useState([]);
	const [pageStart, setPageStart] = useState(0);
	const [pageEnd, setPageEnd] = useState(step);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		let num = 1;

		if (linksCollection) {
			const length = JSON.parse(linksCollection).length;

			while (step * num < length) {
				num++;
			}

			setTotalPages(num);
			const obj = JSON.parse(linksCollection).slice(pageStart, pageEnd);

			setUrlList(obj);
		}
	}, [pageStart, pageEnd, linksCollection]);

	const exportData = () => {
		const link = document.createElement('a');
		const data = JSON.parse(localStorage.getItem('linksCollection'));

		if (data) {
			data.push({ id: linkHash });

			link.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
			link.download = document.domain + '.json';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

			M.toast({
				html: `<i class='material-icons blue-text'>info</i> &nbsp; Please download your backup and Keep it safe.`,
			});
		} else {
			M.toast({
				html: `<i class='material-icons red-text'>error</i> &nbsp; Nothing to export`,
				classes: 'error-toast',
			});
		}
	};

	const importData = (ev) => {
		const file = ev.target.files[0];

		if (file) {
			try {
				const reader = new FileReader();

				if (file.type === 'application/json') {
					reader.readAsText(file, 'UTF-8');

					reader.onload = function (ev) {
						const data = JSON.parse(ev.target.result);
						const fileId = data.pop().id;
						const linksCollection = localStorage.getItem('linksCollection');

						if (fileId === linkHash) {
							if (linksCollection === null) {
								localStorage.setItem('linksCollection', JSON.stringify(data));
							} else {
								const concatData = data.concat(JSON.parse(linksCollection));
								localStorage.setItem('linksCollection', JSON.stringify(concatData));
							}

							window.location.reload();
						} else {
							throw new Error('Not a valid file');
						}
					};
				} else {
					throw new Error('Not a valid file');
				}
			} catch (err) {
				M.toast({
					html: `<i class='material-icons red-text'>error</i> &nbsp; ${err.message}`,
					classes: 'error-toast',
				});
			}
		}
	};

	const deleteData = () => {
		localStorage.removeItem('linksCollection');
		window.location.reload();
	};

	return (
		<section className='links-collection z-depth-2 hoverable'>
			<Collection
				header={
					<div className='list-head'>
						<div className='heading'>Recent Shorten Links</div>
						<span className='list-dropdown'>
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
								<a href='#!' onChange={importData}>
									<Icon left>import_export</Icon>
									<input type='file' className='import-file-input' />
								</a>
								<a href='#!' onClick={exportData}>
									<Icon left>cloud_download</Icon> Export
								</a>
								<a className='modal-trigger' href='#delete-modal' node='a'>
									<Icon left>delete</Icon> Delete
								</a>
							</Dropdown>
						</span>
						<Modal
							bottomSheet={false}
							fixedFooter={false}
							header='Delete All links stored locally?'
							id='delete-modal'
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
							}}>
							<h6>All yours created short links will continue to redirect to their destination.</h6>
							<p>
								You can backup you data&nbsp;
								<a href='#!' onClick={exportData}>
									here.
								</a>
							</p>
							<Button className='red darken-1' node='button' onClick={deleteData}>
								Yes
							</Button>
						</Modal>
					</div>
				}>
				{urlList.length === 0 && (
					<CollectionItem>
						<br />
						<h5 className='grey-text'>Your history will appear here.</h5>
						<br />
					</CollectionItem>
				)}
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
				<CollectionItem className='center-align'>
					<Pagination
						activePage={1}
						items={totalPages}
						leftBtn={<Icon>chevron_left</Icon>}
						maxButtons={5}
						rightBtn={<Icon>chevron_right</Icon>}
						onSelect={(num) => {
							setPageStart(num * step - step);
							setPageEnd(num * step);
						}}
					/>
				</CollectionItem>
			</Collection>
		</section>
	);
}

export default List;
