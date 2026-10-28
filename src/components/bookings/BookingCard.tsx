'use client'
import {
    formatPrice,
} from "@/lib/destinations";

const perks = [
    "Free cancellation up to 7 days",
    "Travel insurance included",
    "24/7 customer support",
];
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import type { Destination } from "@/lib/destinations";
import { authClient } from "@/lib/auth-client";
import { BASE_API_URL } from "@/lib/api";
import React from "react";
const BookingCard = ({ destination }: { destination: Destination }) => {
    const { data: session } = authClient.useSession()
    const user = session?.user

    const handleBooking = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const bookingData = Object.fromEntries(formData.entries())
        console.log(bookingData)
        const data = {
            username: user?.name,
            email: user?.email,
            ...destination,
            deparatureData: bookingData.departureDate,
            bookingDate: new Date()

        }
        console.log(data)
        const res = await fetch(`${BASE_API_URL}/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        if (!res.ok){
            console.log('amar vul hoiche')
            return
        }
        const result = await res.json()
        console.log('result: ',result)
        if (result.acknowledged){
            console.log('booking to koira dilam')
        }
    }
    return (
        <div>
            <aside className="h-fit rounded-sm border border-slate-200 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.06)]">
                <p className="text-[11px] text-slate-500">Starting from</p>
                <p className="mt-1 text-3xl font-semibold tracking-tight text-cyan-700">
                    {formatPrice(destination.price)}
                </p>
                <p className="text-[11px] text-slate-500">per person</p>

                <form onSubmit={handleBooking}>

                    <input
                        type="date"
                        aria-label="Departure date"
                        name="departureDate"
                        defaultValue={destination.departureDate}
                        className="mt-4 h-10 w-full rounded-sm border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition-colors scheme-light focus:border-[#1598ff] focus:ring-2 focus:ring-[#1598ff]/15"
                    />

                    <button type="submit" className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-sm bg-cyan-700 text-xs font-medium text-white transition-colors hover:bg-cyan-800"
                    >
                        Book Now
                        <ArrowRight aria-hidden="true" className="size-3.5" />
                    </button>

                </form>
                <ul className="mt-4 space-y-2.5 border-t border-slate-100 pt-4">
                    {perks.map((perk) => (
                        <li
                            key={perk}
                            className="flex items-start gap-2 text-[11px] leading-snug text-slate-600"
                        >
                            <Check
                                aria-hidden="true"
                                className="mt-0.5 size-3 shrink-0 text-cyan-700"
                            />
                            {perk}
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    );
};

export default BookingCard;