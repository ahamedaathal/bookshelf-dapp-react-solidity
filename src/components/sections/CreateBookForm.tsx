import { CalendarDaysIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { useBooks } from "@/lib/hooks";
import { BookType } from "@/lib/types";
import { useNavigate } from "react-router-dom";

export default function CreateBookForm() {
    const { createBook } = useBooks();
    const navigate = useNavigate();
    const [date, setDate] = useState<Date>();
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title_: "",
        content_: "",
        authorname_: "",
        date_: "",
        purchase_counter_: 10,
        price_: 0,
        bookstatus_: 0,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const submitData: BookType = {
            title: formData.title_,
            content: formData.content_,
            author_name: formData.authorname_,
            published_date: formData.date_,
            purchase_counter: formData.purchase_counter_,
            price: formData.price_,
            status: formData.bookstatus_
        };
        try {
            console.log(submitData);
            await createBook(submitData);
            console.log(submitData);
            setFormData({
                title_: "",
                content_: "",
                authorname_: "",
                date_: "",
                purchase_counter_: 10,
                price_: 0,
                bookstatus_: 0,
            });
            navigate("/");
        } catch (error) {
            console.error("Transaction failed:", error);
        }
    };

    return (
        <main className="flex-1 py-12 px-6 md:px-12 lg:px-20">
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Publish a Book</h2>
                <Card>
                    <CardContent className="p-6">
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="space-y-1">
                                <Label htmlFor="title">Book Title</Label>
                                <Input id="title" required placeholder="Enter book title" name="title_" onChange={handleInputChange} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="author">Author</Label>
                                <Input id="author" required placeholder="Enter author name" name="authorname_" onChange={handleInputChange} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="content">Content</Label>
                                <Textarea id="content" required placeholder="Enter book content" rows={8} name="content_" onChange={handleInputChange} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="price">Price (USD)</Label>
                                <Input id="price" type="number" step="1" required name="price_" onChange={handleInputChange} />
                            </div>
                            <div className="space-y-1 space-x-4">
                                <Label htmlFor="date">Date Published</Label>
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[280px] justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarDaysIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={(newDate) => {
                                                setDate(newDate);
                                                setOpen(false);
                                                setFormData({ ...formData, date_: newDate ? newDate.toISOString() : '' });
                                            }}
                                            required
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="copies">Number of Copies</Label>
                                <Input id="copies" type="number" min="1" required name="purchase_counter_" onChange={(e) =>
                                    setFormData({ ...formData, purchase_counter_: Number(e.target.value) })
                                } />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="availability">Availability</Label>
                                <Select onValueChange={(value) => setFormData({ ...formData, bookstatus_: value === "available" ? 1 : 0 })}>
                                    <SelectTrigger className="text-muted-foreground">
                                        <SelectValue placeholder="Select availability" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="available">Available</SelectItem>
                                        <SelectItem value="unavailable">Unavailable</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit" className="w-full">
                                Publish Book
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </section>
        </main>
    )
}