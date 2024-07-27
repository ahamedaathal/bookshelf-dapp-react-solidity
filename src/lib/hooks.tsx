import { ethers } from 'ethers';
import contractData from "../contracts/BookShelf.json";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
const privateKey = import.meta.env.VITE_SIGNER_PRIVATE_KEY;
const infuraApiKey = import.meta.env.VITE_INFURA_API_KEY;

const network = "sepolia";
const provider = new ethers.InfuraProvider(
    network,
    infuraApiKey
);

const signer = new ethers.Wallet(privateKey).connect(provider);


export const contractEth = new ethers.Contract(
    contractAddress as string,
    contractData.abi,
    signer
);

// export const contractInfo = getContract({
//     client,
//     chain: {
//         id: 11155111,
//         rpc: "https://sepolia.infura.io/v3/9039f7b1fa5d4e2492602c418907603c",
//     },
//     address: contractAddress,
//     abi: contractData.abi
// });

export const getContractOwner = async () => {
    const owner = await contractEth.author();
    return owner;
};

export const useBooks = () => {
    const getBooks = async () => {
        const books = await contractEth.getAuthorBooks();
        return books;
    };
    return { getBooks };
};
