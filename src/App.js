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
	const [friendsArr, setFriendArr] = useState(initialFriends);

	const handleAddFriend = (newFriend) => {
		setFriendArr((friends) => [...friends, newFriend]);
		setshowAddFriend(false);
	};
	const handleShowAddFriend = () => {
		setshowAddFriend((show) => !show);
	};
	return (
		<div className="app">
			<div className="sidebar">
				<FriendsList friendsArr={friendsArr} />
				{showAddFriend && (
					<FormAddFriend onAddFriend={handleAddFriend} />
				)}
				<Button onClick={handleShowAddFriend}>
					{!showAddFriend ? 'Add Friend' : 'Close'}
				</Button>
			</div>
			<FormSplitBill />
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

function FriendsList({ friendsArr }) {
	return (
		<ul>
			{friendsArr.map((friend) => (
				<Friend friend={friend} />
			))}
		</ul>
	);
}
function Friend({ friend }) {
	return (
		<li key={friend.id}>
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
			<Button>select</Button>
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

function FormSplitBill({ selectedFriend }) {
	return (
		<form className="form-split-bill">
			<h2>Split a bill with {''}</h2>
			<label>💸 Bill Value</label>
			<input type="text"></input>
			<label>💰 Your Expense</label>
			<input type="text"></input>
			<label>👬 {}'s expense</label>
			<input type="text" disabled value={0}></input>
			<label>🤑 Who's paying the bill</label>
			<select>
				<option value="user">You</option>
				<option value="friend">{}</option>
			</select>
			<Button>Split Bill</Button>
		</form>
	);
}

export default App;
