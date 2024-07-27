import { useBooks } from "@/lib/hooks";
import { processBookData } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

type BookType = {
    title: string;
    content: string;
    published_date: string;
    price: string;
}

export default function BookList() {
    const [books, setBooks] = useState<BookType[]>([]);
    const { getBooks } = useBooks();
    const activeAccount = useActiveAccount();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const fetchedBooks = await getBooks();
                const processedBooks = fetchedBooks.map(processBookData);
                setBooks(processedBooks);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetchBooks();
    }, []);

    if (books.length === 0) {
        return <div>No books found</div>
    }

    return (
        <>
            {activeAccount?.address ? (
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Browse Books</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {books.map((book, index) => (
                            <Card key={index}>
                                <CardContent className="p-4">
                                    <h3 className="text-lg font-bold mb-2">{book.title}</h3>
                                    <p className="text-muted-foreground mb-4">{book.published_date}</p>
                                    <p className="mb-4">
                                        {book.content}
                                    </p>
                                    <Button className="w-full">Buy for {(Number(books[0].price) * 1e18).toFixed(2)} USD</Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            ) : (
                <section className="mb-12">
                    <div>Please connect your wallet to view books</div>
                </section>
            )}
        </>
    )
}