import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Buffer } from "buffer";
import { ethers } from "ethers";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type BookType = {
  title: string;
  content: string;
  published_date: string;
  price: string;
};

export function processBookData(book: BookType) {
  return {
    title: decodeHexString(book.title),
    content: decodeHexString(book.content),
    date: decodeHexString(book.published_date),
    price: ethers.formatUnits(book.price, "ether"),
  };
}

function decodeHexString(hexString: string): string {
  return Buffer.from(hexString.slice(2), "hex").toString();
}
