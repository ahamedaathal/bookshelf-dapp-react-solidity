import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import CreateBookForm from './components/sections/CreateBookForm';
import MyBooks from './components/sections/MyBooks';
import Layout from './Layout';

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<App />} />
                    <Route path="my-books" element={<MyBooks />} />
                    <Route path="create-book" element={<CreateBookForm />} />
                </Route>
            </Routes>
        </Router>
    )
}