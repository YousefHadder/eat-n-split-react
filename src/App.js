import { useState } from 'react';

const initialFriends = [
	{
		id: 118836,
		name: 'Clark',
		image: 'https://i.pravatar.cc/48?u=118836',
		balance: -7,
	},
	{
		id: 933372,
		name: 'Sarah',
		image: 'https://i.pravatar.cc/48?u=933372',
		balance: 20,
	},
	{
		id: 499476,
		name: 'Anthony',
		image: 'https://i.pravatar.cc/48?u=499476',
		balance: 0,
	},
];
function App() {
	const [showAddFriend, setshowAddFriend] = useState(false);
	const [selectedFriend, setSelectedFriend] = useState(null);
	const [friendsArr, setFriendArr] = useState(initialFriends);

	const handleShowAddFriend = () => {
		setshowAddFriend((show) => !show);
	};

	const handleFriendSelection = (friend) => {
		setSelectedFriend((curr) => (curr?.id === friend.id ? null : friend));
		setshowAddFriend(false);
	};

	const handleAddFriend = (newFriend) => {
		setFriendArr((friends) => [...friends, newFriend]);
		setshowAddFriend(false);
	};

	const handleSplitBill = (value) => {
		setFriendArr((friends) =>
			friends.map((friend) => {
				if (friend.id === selectedFriend.id) {
					return { ...friend, balance: friend.balance + value };
				}
				return friend;
			})
		);
		setSelectedFriend(null);
	};

	return (
		<div className="app">
			<div className="sidebar">
				<FriendsList
					friendsArr={friendsArr}
					onSelection={handleFriendSelection}
					selectedFriend={selectedFriend}
				/>
				{showAddFriend && (
					<FormAddFriend onAddFriend={handleAddFriend} />
				)}
				<Button onClick={handleShowAddFriend}>
					{!showAddFriend ? 'Add Friend' : 'Close'}
				</Button>
			</div>
			{selectedFriend && (
				<FormSplitBill
					selectedFriend={selectedFriend}
					onSplitBill={handleSplitBill}
				/>
			)}
		</div>
	);
}

function Button({ onClick, children }) {
	return (
		<button className="button" onClick={onClick}>
			{children}
		</button>
	);
}

function FriendsList({ friendsArr, onSelection, selectedFriend }) {
	return (
		<ul>
			{friendsArr.map((friend, index) => (
				<Friend
					onSelection={onSelection}
					friend={friend}
					selectedFriend={selectedFriend}
				/>
			))}
		</ul>
	);
}
function Friend({ friend, onSelection, selectedFriend }) {
	const isSelected = selectedFriend?.id === friend.id;

	return (
		<li key={friend.id} className={isSelected ? 'selected' : ''}>
			<img src={friend.image} alt={friend.name} />
			<h3>{friend.name}</h3>
			{friend.balance === 0 && (
				<p className="">You and {friend.name} are even</p>
			)}
			{friend.balance < 0 && (
				<p className="red">
					You owe {friend.name} ${friend.balance}
				</p>
			)}
			{friend.balance > 0 && (
				<p className="green">
					{friend.name} owes you ${Math.abs(friend.balance)}
				</p>
			)}
			<Button onClick={() => onSelection(friend)}>
				{isSelected ? 'close' : 'select'}
			</Button>
		</li>
	);
}

function FormAddFriend({ onAddFriend }) {
	const [name, setName] = useState('');
	const [image, setImage] = useState('https://i.pravatar.cc/48');
	function handleSubmitFriend(event) {
		event.preventDefault();

		if (!name) return alert('Please enter a name');
		if (!image) return 'Please enter an image URL';

		const id = crypto.randomUUID();
		const newFriend = {
			id,
			name,
			image: `${image}?u=${id}`,
			balance: 0,
		};

		onAddFriend(newFriend);
		setName('');
		setImage('https://i.pravatar.cc/48');
		event.target.reset();
	}
	return (
		<div>
			<form className="form-add-friend" onSubmit={handleSubmitFriend}>
				<label>🙋🏽Friend name: </label>
				<input
					type="text"
					value={name}
					onInput={(event) => setName(event.target.value)}
				/>
				<label>🔗Image Url </label>
				<input
					type="text"
					valye={image}
					onInput={(event) => setImage(event.target.value)}
				/>
				<Button>Add </Button>
			</form>
		</div>
	);
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
	const [bill, SetBill] = useState('');
	const [paidByUser, SetPaidByUser] = useState('');

	const paidByFriend = bill ? bill - paidByUser : '';

	const [whoIsPaying, SetWhoIsPaying] = useState('user');

	const handleSetBill = (e) => {
		const value = Number(e.target.value);
		if (value >= 0) SetBill(value);
		else alert('Please enter a positive number');
	};
	const handleSetPaidByUser = (e) => {
		const value = Number(e.target.value);
		if (value >= 0 && value <= bill) SetPaidByUser(value);
		else
			alert(
				'Please enter a positive number and less than or equal to the bill'
			);
	};

	const handleSubmitSplitBill = (e) => {
		e.preventDefault();

		if (!bill || !paidByUser)
			return alert('Please enter both bill and paid by user values');
		onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser);
	};
	return (
		<form className="form-split-bill" onSubmit={handleSubmitSplitBill}>
			<h2>Split a bill with {selectedFriend.name}</h2>
			<label>💸 Bill Value</label>
			<input type="text" value={bill} onInput={handleSetBill}></input>
			<label>💰 Your Expense</label>
			<input
				type="text"
				value={paidByUser}
				onInput={handleSetPaidByUser}></input>
			<label>👬 {selectedFriend.name}'s expense</label>
			<input type="text" disabled value={paidByFriend}></input>
			<label>🤑 Who's paying the bill</label>
			<select
				value={whoIsPaying}
				onChange={(e) => SetWhoIsPaying(e.target.value)}>
				<option value="user">You</option>
				<option value="friend">{selectedFriend.name}</option>
			</select>
			<Button>Split Bill</Button>
		</form>
	);
}

export default App;
