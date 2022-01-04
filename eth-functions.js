async function loginWithMetaMask() { //This function will open the user's Metamask and prompt them to sign in using the wallet of their choice.
	const _accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
		.then((data) => {
			signMetaMask(data[0]);
		})
		.catch((e) => {
			console.log(e.message);
			return;
		});
		
		return;
}

async function isMetaMaskLoggedIn() { //Checks if we currently have a connected wallet.
	var response = null;
	const _accounts = await window.ethereum.request({method: 'eth_accounts' })
		.then((data) => {
			if (data.length > 0) {
				response = true;
			} else {
				response = false;
			}
		})
		.catch((e) => {
			console.log(e.message);
		});
		return response;
}

async function signMetaMask(wallet) { //creates a signature so we can verify the validity of this request on the serverside
	var _signmessage = "I agree to the terms and conditions."
	const _signature = await window.ethereum.request({method: 'personal_sign', params: [_signmessage, wallet]})
		.then((data) => {
			loginWeb3(wallet, data, _signmessage);
		})
		.catch((e) => {
			console.log(e.message);
		});
		return
}

async function getCurrentWallet() {
	var _wallet = await window.ethereum.request({method: 'eth_accounts' })
		.then((data) => {
			wallet = data[0];
		})
		.catch((e) => {
			console.log(e.message);
		});
	return wallet;
}

function loginWeb3(wallet, signature, message) { //sends a post request to our serverside to create data within our sqlite database.
	try {
		console.log("Sending POST attempt!");
		var web3xhr = new XMLHttpRequest();
		web3xhr.open("POST", "login.php", true);
		web3xhr.setRequestHeader('Content-Type', 'application/json');
		web3xhr.send(JSON.stringify({
			walletHash: wallet,
			signatureHash: signature,
			messageHash: message
		}));
	} catch {
		console.log("Could not POST login attempt!");
	}
	location.reload();
}

