import { CalendarDaysIcon } from "@/lib/icons";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns"

export default function CreateBookForm() {
    const [date, setDate] = useState<Date>();
    const [open, setOpen] = useState(false);

    return (
        <main className="flex-1 py-12 px-6 md:px-12 lg:px-20">
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Publish a Book</h2>
                <Card>
                    <CardContent className="p-6">
                        <form className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="title">Book Title</Label>
                                <Input id="title" placeholder="Enter book title" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="author">Author</Label>
                                <Input id="author" placeholder="Enter author name" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="content">Content</Label>
                                <Textarea id="content" placeholder="Enter book content" rows={8} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="price">Price (ETH)</Label>
                                <Input id="price" type="number" step="0.01" />
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
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="copies">Number of Copies</Label>
                                <Input id="copies" type="number" min="1" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="availability">Availability</Label>
                                <Select>
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