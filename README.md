# Book Store dApp

A decentralized application (dApp) for buying books from an author using Web3 technology.

## Features

- User-friendly interface for browsing and purchasing books
- Integration with Web3 wallet (using ThirdWeb)
- Smart contract for handling book transactions

## Tech Stack

- React + TypeScript + Vite + Tailwind + Shadcn + Vercel
- ThirdWeb for Web3 integration
- Hardhat for smart contract development

## Getting Started

1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Build for production: `npm run build`

## .ENV

It's important to add all the environment variables listed in the `.env.example` file. Make sure to create a `.env` or `.env.local` file in the root directory of your project and include the following variable:

```
VITE_REACT_APP_CLIENT_ID=
VITE_REACT_APP_SECRET_KEY=
VITE_CONTRACT_ADDRESS =
```

## Smart Contract

The smart contract allows users to purchase books and authors to manage their inventory. Key functions include:

1. createBook (author only): Allows the author to add a new book to the store with details like title, price, and available copies.

2. buyBook (all users): Enables users to purchase a book by paying the specified price in cryptocurrency.

3. getBookDetails: Retrieves information about a specific book, including title, price, and availability.

4. getAuthorBooks: Lists all books created by a specific author.

## Video Demo

[!Web3 Dapp Demo Video ([https://img.youtube.com/vi/_5tFXJQIzi4/0.jpg)](https://www.youtube.com/watch?v=_5tFXJQIzi4](https://flonnect.com/video/embed/560913d0cd14-4c1f-b50f-8be2dda27073))

Created by ahamedaathal
