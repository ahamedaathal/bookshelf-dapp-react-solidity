import { useBooks } from "@/lib/hooks";
import { BookType } from "@/lib/types";
import { formatDate, processBookData } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { Card, CardContent } from "../ui/card";

export default function MyBooks() {
    const [books, setBooks] = useState<BookType[]>([]);
    const { getBuyerBooks } = useBooks();
    const account = useActiveAccount();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const fetchedBooks: BookType[] = await getBuyerBooks(account?.address || "");
                const processedBooks = fetchedBooks.map(processBookData);
                setBooks(processedBooks);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetchBooks();
    }, [account?.address]);

    if (books.length === 0) {
        return <div>No books found. Please buy some books to see them here.</div>;
    }

    return (
        <>
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">My Books</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {books.map((book) => (
                        <Card key={book.bookId} className="flex flex-col">
                            <CardContent className="p-4 flex flex-col h-full">
                                <h3 className="text-lg font-bold mb-2">{book.title}</h3>
                                <p className="text-muted-foreground mb-2">{formatDate(book.published_date)}</p>
                                <p className="mb-4 line-clamp-3">
                                    {book.content}
                                </p>
                            </CardContent>
                        </Card>

                    ))}
                </div>
            </section>
        </>
    )
}