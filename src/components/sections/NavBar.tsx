
import { client, getContractOwner, wallets } from "@/lib/hooks";
import { BookIcon, BookOpenIcon, MenuIcon, PlusIcon } from "@/lib/icons";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sepolia } from "thirdweb/chains";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";


export default function NavBar() {
    const activeAccount = useActiveAccount();
    const [contractOwner, setContractOwner] = useState<string | null>(null);
    const navigate = useNavigate();

    const isAuthorized = contractOwner === activeAccount?.address;

    useEffect(() => {
        async function fetchContractOwner() {
            try {
                const owner = await getContractOwner();
                setContractOwner(owner);
            } catch (error) {
                console.error("Error fetching contract owner:", error);
            }
        }

        fetchContractOwner();
    }, []);

    useEffect(() => {
        if (!activeAccount) {
            navigate('/');
        }
    }, [activeAccount, navigate]);

    return <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
            Web3 Book Dapp
        </Link>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <ConnectButton client={client} wallets={wallets} chain={sepolia} />
            </div>
            {activeAccount?.address && <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <MenuIcon className="h-4 w-4" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                    <div className="flex flex-col gap-2 p-4">
                        <SheetClose asChild>
                            <Link
                                to="/"
                                className="inline-flex items-center justify-between rounded-md bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                            >
                                <span>All Books</span>
                                <BookOpenIcon className="h-4 w-4" />
                            </Link>
                        </SheetClose>
                        {!isAuthorized && <SheetClose asChild>
                            <Link
                                to="/my-books"
                                className="inline-flex items-center justify-between rounded-md bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                            >
                                <span>My Books</span>
                                <BookIcon className="h-4 w-4" />
                            </Link>
                        </SheetClose>}
                        {isAuthorized && <SheetClose asChild>
                            <Link
                                to="/create-book"
                                className="inline-flex items-center justify-between rounded-md bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                            >
                                <span>Create Book</span>
                                <PlusIcon className="h-4 w-4" />
                            </Link>
                        </SheetClose>
                        }
                    </div>
                </SheetContent>
            </Sheet>}
        </div>
    </header >

}







// <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
//     <Link to="/" className="text-xl font-bold">
//         Web3 Book Dapp
//     </Link>
//     <div className="flex items-center gap-2">
//         <ConnectButton client={client} wallets={wallets} chain={sepolia} />
//     </div>
// </header>
