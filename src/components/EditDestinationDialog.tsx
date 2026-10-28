'use client'
import { ChevronDown, CircleX, Pencil, Plus } from "lucide-react";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { fieldClass, inputClass, labelClass } from "@/lib/form-styles";
import type { Destination } from "@/lib/destinations";
import type { FormEvent } from "react";
import getTokenFromClient from "@/lib/getTokenFromClient";
import { BASE_API_URL } from "@/lib/api";

const categories = [
    "Beach",
    "City",
    "Mountain",
    "Island",
    "Desert",
    "Adventure",
    "Cultural",
];

const EditDestinationDialog = ({ destination }: { destination: Destination }) => {

    const handleEditDestination = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const updateData = Object.fromEntries(formData.entries())

        const token = await getTokenFromClient()
        const res = await fetch(`${BASE_API_URL}/destinations/${destination._id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                authorization:`Bearer ${token}`
            },
            body: JSON.stringify(updateData),
        })
        const result = await res.json()
        console.log(result)
    }
    return (
        <Dialog>
            <DialogTrigger>
                <button
                    type="button"
                    title="Editing is not available yet"
                    className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-slate-200 bg-white px-3 text-[11px] font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                    <Pencil aria-hidden="true" className="size-3" />
                    Edit
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        <form onSubmit={handleEditDestination} className="mt-6 rounded-md border border-slate-200 bg-white p-6 shadow-[0_1px_1px_rgba(15,23,42,0.12)] sm:p-8">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="destination-name" className={labelClass}>
                                        Destination Name
                                    </label>
                                    <input
                                        id="destination-name"
                                        name="destinationName"
                                        type="text"
                                        defaultValue={destination.destinationName}
                                        className={inputClass}
                                    />
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="country" className={labelClass}>
                                            Country
                                        </label>
                                        <input
                                            id="country"
                                            name="country"
                                            type="text"
                                            defaultValue={destination.country}
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="category" className={labelClass}>
                                            Category
                                        </label>
                                        <div className="relative">
                                            <select
                                                id="category"
                                                name="category"
                                                defaultValue={destination.category}
                                                className={`${inputClass} appearance-none pr-9`}
                                            >
                                                {categories.map((category) => (
                                                    <option key={category} value={category}>
                                                        {category}
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronDown
                                                aria-hidden="true"
                                                className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="price" className={labelClass}>
                                            Price (USD)
                                        </label>
                                        <input
                                            id="price"
                                            name="price"
                                            type="number"
                                            min="0"
                                            inputMode="decimal"
                                            defaultValue={destination.price}
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="duration" className={labelClass}>
                                            Duration
                                        </label>
                                        <input
                                            id="duration"
                                            name="duration"
                                            type="text"
                                            defaultValue={destination.duration}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="departure-date" className={labelClass}>
                                        Departure Date
                                    </label>
                                    <input
                                        id="departure-date"
                                        name="departureDate"
                                        type="date"
                                        defaultValue={destination.departureDate}
                                        className={`${inputClass} scheme-light`}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="image-url" className={labelClass}>
                                        Image URL
                                    </label>
                                    <input
                                        id="image-url"
                                        name="imageUrl"
                                        type="url"
                                        defaultValue={destination.imageUrl}
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="description" className={labelClass}>
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={4}
                                        defaultValue={destination.description}
                                        className={`${fieldClass} min-h-26 resize-none py-2.5`}
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-5">
                                <Link
                                    href="/"
                                    className="inline-flex h-9 items-center gap-2 rounded-md border border-rose-200 bg-white px-4 text-xs font-medium text-rose-500 transition-colors hover:border-rose-300 hover:bg-rose-50"
                                >
                                    <CircleX aria-hidden="true" className="size-3.5" />
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="inline-flex h-9 items-center gap-2 rounded-md bg-[#1598ff] px-4 text-xs font-medium text-white transition-colors hover:bg-[#0d86e8]"
                                >
                                    <Plus aria-hidden="true" className="size-3.5" />
                                    update Travel Package
                                </button>
                            </div>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default EditDestinationDialog;