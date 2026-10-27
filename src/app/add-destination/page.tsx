'use client'
import type { FormEvent } from "react";
import Link from "next/link";
import { ChevronDown, CircleX, Plus } from "lucide-react";
import { fieldClass, inputClass, labelClass } from "@/lib/form-styles";

const categories = [
    "Beach",
    "City",
    "Mountain",
    "Island",
    "Desert",
    "Adventure",
    "Cultural",
];

export default function AddDestinationPage() {

    const handleAddDestination = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const newDestinationData = Object.fromEntries(formData.entries())
        console.log('newDestinationData: ', newDestinationData)

        const res = await fetch(`http://localhost:5000/add-destination`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newDestinationData),
        })
        if (!res.ok){
            console.log('BIG Error')
        }
        const result = await res.json()
        console.log('result: ',result)
        if (result.acknowledged){
            console.log('Successfully inserted data')
        }
    }

    return (
        <main className="relative flex flex-1 justify-center bg-white px-6 py-12 sm:px-10 sm:py-16">
            <span
                aria-hidden="true"
                className="absolute left-1/2 top-5 h-0.5 w-4.5 -translate-x-1/2 bg-[#1598ff]"
            />
            <span
                aria-hidden="true"
                className="absolute left-6 top-1/2 hidden h-4.75 w-0.5 -translate-y-1/2 bg-[#1598ff] sm:block"
            />
            <span
                aria-hidden="true"
                className="absolute right-6 top-1/2 hidden h-4.75 w-0.5 -translate-y-1/2 bg-[#1598ff] sm:block"
            />
            <span
                aria-hidden="true"
                className="absolute bottom-5 left-1/2 h-0.5 w-4.5 -translate-x-1/2 bg-[#1598ff]"
            />

            <div className="w-full max-w-xl">
                <h1 className="text-[clamp(2rem,4vw,2.5rem)] leading-tight font-light tracking-[-0.065em] text-slate-950">
                    Add New Travel Package
                </h1>

                <form onSubmit={handleAddDestination} className="mt-6 rounded-md border border-slate-200 bg-white p-6 shadow-[0_1px_1px_rgba(15,23,42,0.12)] sm:p-8">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="destination-name" className={labelClass}>
                                Destination Name
                            </label>
                            <input
                                id="destination-name"
                                name="destinationName"
                                type="text"
                                placeholder="Bali Paradise"
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
                                    placeholder="Indonesia"
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
                                        defaultValue="Beach"
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
                                    placeholder="e.g., 1299"
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
                                    placeholder="e.g., 7 Days/6 Nights"
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
                                placeholder="https://example.com/image.jpg"
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
                                placeholder="Describe the travel experience..."
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
                            Add Travel Package
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
