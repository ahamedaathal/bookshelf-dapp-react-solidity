import { useBooks } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { type BookType } from "../../lib/types";
import { formatDate, processBookData } from "../../lib/utils";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useNavigate } from 'react-router-dom';


export default function BookList() {
    const [books, setBooks] = useState<BookType[]>([]);
    const { getBooks, buyBook } = useBooks();
    const activeAccount = useActiveAccount();
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState<Record<number, string>>({});
    const [expandedBooks, setExpandedBooks] = useState<Record<number, boolean>>({});
    const [loadingBookId, setLoadingBookId] = useState<number | null>(null);


    const handlePurchase = async (bookId: number, price: string) => {
        setLoadingBookId(bookId);
        try {
            await buyBook(bookId, price);
            navigate("/my-books");
        } catch (error) {
            if (error instanceof Error) {
                let message = 'An error occurred while purchasing the book.';
                if (error.message === 'ALREADY_OWNED') {
                    message = 'You already own this book.';
                }
                setErrorMessages(prev => ({ ...prev, [bookId]: message }));

                setTimeout(() => {
                    setErrorMessages(prev => {
                        const newErrors = { ...prev };
                        delete newErrors[bookId];
                        return newErrors;
                    });
                }, 4000);
            }
        } finally {
            setLoadingBookId(null);
        }
    };

    const toggleContent = (bookId: number) => {
        setExpandedBooks(prev => ({
            ...prev,
            [bookId]: !prev[bookId]
        }));
    };

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const fetchedBooks: BookType[] = await getBooks();
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
                                    <p className="text-muted-foreground mb-4">{formatDate(book.published_date)}</p>
                                    <div className="mb-4">
                                        <p>
                                            {book.content.length > 50 && !expandedBooks[Number(book.bookId)]
                                                ? book.content.slice(0, 30) + "..."
                                                : book.content}
                                        </p>
                                        {book.content.length > 50 && (
                                            <Button
                                                variant="link"
                                                onClick={() => toggleContent(Number(book.bookId))}
                                                className="mt-2 p-0"
                                            >
                                                {expandedBooks[Number(book.bookId)] ? "Show Less" : "Show More"}
                                            </Button>
                                        )}
                                    </div>
                                    <Button className="w-full" disabled={loadingBookId === Number(book.bookId)} onClick={() => handlePurchase(Number(book.bookId), (Number(book.price) * 1e18).toString())}> {loadingBookId === Number(book.bookId) ? (
                                        <>
                                            <span className="mr-2">Loading...</span>
                                            {/* You can add a spinner icon here if desired */}
                                        </>
                                    ) : (
                                        `Buy for ${(Number(book.price) * 1e18).toFixed(2)} USD`
                                    )}</Button>
                                    {errorMessages[Number(book.bookId)] && (
                                        <p className="text-red-500 mt-2">{errorMessages[Number(book.bookId)]}</p>
                                    )}
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