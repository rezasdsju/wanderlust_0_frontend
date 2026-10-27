'use client'
// import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
 
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { authClient } from "@/lib/auth-client";
type Session = typeof authClient.$Infer.Session

const PopOver = ({ session }: { session: Session | null }) => {
    const handleLogOut = async()=>{
        await authClient.signOut()
    }
    return (
        <Popover>
            <PopoverTrigger render={
                <div className="flex items-center justify-center gap-2">
                    <Avatar>
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                            className="grayscale"
                        />
                        <AvatarFallback>{session?.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{session?.user.name}</span>
                </div>
            } />
            <PopoverContent align="start">
                <PopoverHeader>
                    <PopoverTitle>Profile</PopoverTitle>
                    <PopoverTitle onClick={handleLogOut}>Logout</PopoverTitle>
                    {/* <PopoverDescription>
                        Set the dimensions for the layer.
                    </PopoverDescription> */}
                </PopoverHeader>
            </PopoverContent>
        </Popover>
    );
};

export default PopOver;