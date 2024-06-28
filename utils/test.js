const { exec } = require('child_process');
function list(contractAddress, collectionAddress) {
    const listing_nft  = `{"listings_by_contract_address": {"contract_address": "${collectionAddress}"}} | jq`
    const command = `nibid query wasm contract-state smart ${contractAddress} '${listing_nft}' `;

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
    });

}

list("nibi1j65ycuzrawuyntjmgkl26qv3hy4y93xexjuyelrvv9q6n8smvh5sg9jrx6","nibi1gu49g3vndt6ued4k329j83xvkf4nk236vqm6zsxattztwxqnztfqnpu6p7")