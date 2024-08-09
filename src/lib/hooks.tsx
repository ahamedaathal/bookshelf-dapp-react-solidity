// @ts-nocheck

import { createThirdwebClient, getContract, prepareContractCall, readContract, sendAndConfirmTransaction } from 'thirdweb';
import { sepolia } from 'thirdweb/chains';
import { createWallet } from 'thirdweb/wallets';
import contractData from "../contracts/BookShelf.json";
import { BookType } from './types';

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

export const client = createThirdwebClient({
    clientId: import.meta.env.VITE_REACT_APP_CLIENT_ID,
});

export const wallets = [
    createWallet("io.metamask"),
];

const contractInfo = getContract({
    client,
    chain: sepolia,
    address: contractAddress,
    abi: contractData.abi,
});

export const getContractOwner = async () => {
    const author = await readContract({
        contract: contractInfo,
        method: "author",
    });
    return author;
};

export const useBooks = () => {
    const getBooks = async () => {
        const books = await readContract({
            contract: contractInfo,
            method: "getAuthorBooks",
        });
        return books;
    };

    const buyBook = async (bookId: number, price: string) => {
        const account = await wallets[0].connect({ client });
        const userBooks = await getBuyerBooks(account.address);
        const alreadyOwned = userBooks.some(book => book.bookId.toString(16) === bookId.toString(16));

        if (alreadyOwned) {
            throw new Error("ALREADY_OWNED");
        }

        try {
            const transaction = prepareContractCall({
                contract: contractInfo,
                method: "buyBook",
                params: [
                    bookId
                ],
                value: price
            });
            const receipt = await sendAndConfirmTransaction({
                transaction,
                account,
            });
            return receipt;
        } catch (error) {
            console.error("Error buying book:", error);
            throw error;
        }

    };

    const getBuyerBooks = async (buyerAddress: string) => {
        try {
            const books = await readContract({
                contract: contractInfo,
                method: "getBuyerBooks",
                params: [buyerAddress]
            });
            return books;
        } catch (error) {
            console.error("Error fetching buyer's books:", error);
            throw error;
        }
    };

    const createBook = async (book: BookType) => {
        const account = await wallets[0].connect({ client });
        const transaction = prepareContractCall({
            contract: contractInfo,
            method: "publishBook",
            params: [
                book.title,
                book.content,
                book.author_name,
                book.published_date,
                book.purchase_counter,
                Number.parseInt(book.price),
                book.status
            ]
        });
        const receipt = await sendAndConfirmTransaction({
            transaction,
            account,
        });
        return receipt;
    };
    return { getBooks, buyBook, getBuyerBooks, createBook };
};

