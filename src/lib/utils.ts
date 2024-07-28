import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Buffer } from "buffer";
import { ethers } from "ethers";
import { type BookType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function processBookData(book: BookType): BookType {
  return {
    title: decodeHexString(book.title),
    content: decodeHexString(book.content),
    published_date: decodeHexString(book.published_date),
    price: Number(ethers.formatUnits(book.price, "ether")),
    bookId: Number(book?.bookId?.toString()),
  };
}

function decodeHexString(hexString: string): string {
  return Buffer.from(hexString.slice(2), "hex").toString();
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
