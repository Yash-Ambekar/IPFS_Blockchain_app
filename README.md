# Skeleton of a IPFS-Ethereum Storage System

Step-1 - Run npm install command for installing all the dependencies
```shell
npm i
```

Step-2 - Compile the Hashes.sol contract
```shell
npx hardhat compile
```
After this an artifact file will be made inside the src folder which contains the JSON file with the ABI code inside it.

Step-3 - Now initiate a local blockchain network 
```shell
npx hardhat node
```

Step-4 - Deploy the contract to the blockchain 
```shell
npx hardhat run scripts/deploy.js --network localhost
```
here the output will be 
```shell
Hashes deployed to: (hexadecimal address)
```
Copy that address and paste it into the hashesAddress global variable in the IPFS.js and Search.js files under 'Components' folder under 'src'


Step-5 - Start the frontend of the application on the browser
```shell
npm start
```

Step-6 - Install Metamask Extension onto the browser and login or create an account.
Enable *show local/test networks* in the metamask settings.
Switch to localhost:8545
Click on import an account on metamask then copy the private key of one of the accounts shown during step-3 and paste it to import that account onto your metamask

NOW,
Upload file(s) then click the 'Submit' button and then click the 'ADD TO BLOCKCHAIN' button, this will ask for a payment through metamask, confirm the payment and then the file's hash will be stored on the blockchain.

You can Search for files by clicking the Search button and entering the file name with the file extension 
For eg: 'ABC.pdf'

After entering the file name then click on Search after that your file will be visible click on it then your file will be downloaded.











