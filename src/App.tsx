import BookList from "./components/sections/BookList";

export default function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 py-12 px-6 md:px-12 lg:px-20">
                <BookList />
            </main>
        </div >
    )
}