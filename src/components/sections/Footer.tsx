import { Link } from "react-router-dom";

export default function Footer() {
    return <footer className="bg-muted text-muted-foreground py-4 px-6 text-sm">
        <div className="container max-w-7xl mx-auto flex items-center justify-between">
            <p>&copy; 2024 Web3 Book Dapp</p>
            <div className="flex items-center gap-4">
                <Link to="#" className="hover:underline">
                    Privacy Policy
                </Link>
                <Link to="#" className="hover:underline">
                    Terms of Service
                </Link>
            </div>
        </div>
    </footer>
}