import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import { Dropdown, Modal, Icon, Button, TextInput } from 'react-materialize';
import localForage from 'localforage';

function ListHead({
	onSearch,
	onSearchCancel,
	showSearch,
	setShowSearch,
	editMode,
}) {
	const linkHash = 'e5a9cc5a85b282aec3acbc5f95bd009a';
	const [linksCollection, setLinksCollection] = useState(false);

	useEffect(() => {
		localForage
			.getItem('linksCollection')
			.then((links) => setLinksCollection(links !== null));
	}, []);

	const exportData = () => {
		const linkElem = document.createElement('a');

		localForage.getItem('linksCollection').then((links) => {
			if (links) {
				links.push({ id: linkHash });
				linkElem.href = `data:text/json;charset=utf-8,${encodeURIComponent(
					JSON.stringify(links)
				)}`;
				linkElem.download = `${document.domain}.json`;
				document.body.appendChild(linkElem);
				linkElem.click();
				document.body.removeChild(linkElem);

				M.toast({
					html: `<i class='material-icons blue-text'>info</i> &nbsp; Please download your backup and Keep it safe.`,
				});
			} else {
				M.toast({
					html: `<i class='material-icons red-text'>error</i> &nbsp; Nothing to export`,
					classes: 'error-toast',
				});
			}
		});
	};

	const importData = (ev) => {
		const file = ev.target.files[0];

		try {
			if (file && file.type === 'application/json') {
				const reader = new FileReader();
				reader.readAsText(file, 'UTF-8');

				reader.onload = (ev) => {
					localForage.getItem('linksCollection').then((links) => {
						const data = JSON.parse(ev.target.result);
						const fileId = data.pop().id;

						if (fileId === linkHash) {
							links === null
								? localForage.setItem('linksCollection', data)
								: localForage.setItem('linksCollection', data.concat(links));

							window.location.reload();
						} else {
							throw new Error('Not a valid file');
						}
					});
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
	};

	const deleteData = () => {
		localForage.removeItem('linksCollection');
		window.location.reload();
	};

	if (showSearch)
		return (
			<div className='search-input-container'>
				<TextInput
					placeholder='Enter Search Keyword'
					onKeyUp={onSearch}
					autoFocus
				/>
				<Button className='red darken-1' onClick={onSearchCancel}>
					<Icon>close</Icon>
				</Button>
			</div>
		);

	return (
		<div className='list-head'>
			<div className='heading'>Recent Shorten Links</div>
			{linksCollection && (
				<span className='list-dropdown'>
					<a href='#!' onClick={() => setShowSearch(true)}>
						<Icon>search</Icon>
					</a>
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
						<a href='#!' onClick={editMode}>
							<Icon left>edit</Icon> Edit Mode
						</a>
						<a href='#!' onChange={importData}>
							<Icon left>import_export</Icon>
							<input type='file' accept='.json' className='import-file-input' />
						</a>
						<a href='#!' onClick={exportData}>
							<Icon left>cloud_download</Icon> Export
						</a>
						<a className='modal-trigger' href='#delete-modal'>
							<Icon left>delete</Icon> Delete All
						</a>
					</Dropdown>
				</span>
			)}
			{!linksCollection && (
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
						<input type='file' accept='.json' className='import-file-input' />
					</a>
				</Dropdown>
			)}
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
				<h6>
					<b>Note:</b> All your created short links will continue to redirect to
					their destination.
				</h6>
				<p>
					Meanwhile, You can download your backup data&nbsp;
					<a href='#!' onClick={exportData}>
						here.
					</a>
				</p>
				<Button className='red darken-1' node='button' onClick={deleteData}>
					Yes
				</Button>
			</Modal>
		</div>
	);
}

export default ListHead;
