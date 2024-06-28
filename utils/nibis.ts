import { exec } from 'child_process';

interface MintCommandParams {
  contractAddress: string;
  account: string;
  token_id: string;
  token_uri: string;
  name: string;
  description: string;
  attributes: { trait_type: string; value: string }[];
}

export function mintNft(params: MintCommandParams): Promise<string> {
  const { contractAddress, account, token_id, token_uri , name, description, attributes} = params;
  const mint  = `{
    "mint": {
      "token_id": "${token_id}",
      "owner": "nibi197gw9qcxfnvypn3dwqwys2jptgyrl5zksfz86a",
      "token_uri": "${token_uri}",
      "extension": {
        "name": "${name}",
        "description": "${description}",
        "attributes": ${JSON.stringify(attributes)}
      }
    }
}`
  const command = `nibid tx wasm execute ${contractAddress} '${mint}' --from ${account} --gas auto --gas-adjustment 1.5 --gas-prices 0.025unibi`;
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
        if (error) {
        console.error(`Error executing command: ${error.message}`);
        return;
        }
        if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
        }
        console.log(`stdout: ${stdout}`);
        resolve( `${stdout}`);
    // return stdout
  });
});

}

interface ApproveCommandParams {
    spender: string;
    contractAddress: string;
    account: string;
    token_id: string;
}

export function approve(params: ApproveCommandParams): Promise<string> {
    const {spender, contractAddress, account, token_id} = params;
    const approve  = `{
        "approve": {
            "spender": "${spender}",
            "token_id": "${token_id}"
        }
    }`
    const command = `nibid tx wasm execute ${contractAddress} '${approve}' --from ${account} --gas auto --gas-adjustment 1.5 --gas-prices 0.025unibi`;
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            resolve( `${stdout}`);
        });
    })
   
}

interface ListNFTParams {
    contractAddress: string;
    collectionAddress: string;
    account: string;
    token_id: string;
    auction_config: {
        fixed_price: {
            price: {
                denom: string;
                amount: string;
            };
            start_time: null;
            end_time: null;
        };
    };
}

export function list_nft(params: ListNFTParams): Promise<string> {
    const {contractAddress,collectionAddress, account, token_id, auction_config} = params;
    const list_nft  = `{
        "list_nft": {
            "contract_address": "${collectionAddress}",
            "token_id": "${token_id}",
            "auction_config": ${JSON.stringify(auction_config)}
        }
    }`
    const command = `nibid tx wasm execute ${contractAddress} '${list_nft}' --from ${account} --gas auto --gas-adjustment 1.5 --gas-prices 0.025unibi`;
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            resolve( `${stdout}`);
        });
    })
    
}


interface ListingNftParams {
    contractAddress: string;
    collectionAddress: string;
}

export function listing_nft(params: ListingNftParams): Promise<string> {
    const {contractAddress, collectionAddress} = params;
    const listing_nft  = `{
        "listings_by_contract_address": {
            "contract_address": "${collectionAddress}"
        }
    }`
    const command = `nibid query wasm contract-state smart ${contractAddress} '${listing_nft}' `;
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            resolve( `${stdout}`);
        });
    })
    
}

interface BuyNftParams {
    contractAddress: string;
    account: string;
    token_id: string;
    collectionAddress: string;
}

export function buy_nft(params: BuyNftParams): Promise<string> {
    const {contractAddress, account, token_id, collectionAddress} = params;
    const buy_nft  = `{
        "buy": {
            "contract_address": "${collectionAddress}",
            "token_id": "${token_id}"
        }
    }`
    const command = `nibid tx wasm execute ${contractAddress} '${buy_nft}' --from ${account} --gas auto --gas-adjustment 1.5 --gas-prices 0.025unibi`;
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            resolve( `${stdout}`);
        });
    })
   
}

