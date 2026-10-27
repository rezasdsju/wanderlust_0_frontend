'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import type { Destination } from "@/lib/destinations"
import { useRouter } from "next/navigation"

export function DeleteDestination({ destination }: { destination: Destination }) {
    const router = useRouter()

    const handleDelete = async () => {
        const res = await fetch(`http://localhost:5000/destinations/${destination._id}`, {
            method: 'DELETE'
        })
        if (!res.ok) {
            console.error(`Failed to delete destination (${res.status})`)
            return
        }
        router.push('/all-destinations')
        router.refresh()
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger render={<Button variant="outline">Delete</Button>} />
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete{" "}
                        {destination.destinationName} from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
