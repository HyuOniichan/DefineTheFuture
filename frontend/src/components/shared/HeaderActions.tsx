import type { AvatarItemType } from "@/types";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
    User,
    Settings,
    LogOut,
    Search,
    Bell,
    UserRound,
    Dot,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { mockNotifications } from "@/utils/mockData";

const avatarDropdownItems: AvatarItemType[] = [
    { icon: User, title: "Profile", url: "/profile" },
    { icon: Settings, title: "Settings", url: "/settings" },
    { icon: LogOut, title: "Log out", url: "/logout" },
]

export function HeaderActions() {
    return (
        <div className="flex items-center gap-[4px]">
            {/* Search */}
            <Button variant="ghost" className="size-[32px] p-2 rounded-full">
                <Search />
            </Button>

            {/* Notifications */}
            <DropdownMenu>
                <DropdownMenuTrigger
                    render={
                        <Button variant="ghost" className="size-[32px] p-2 rounded-full">
                            <Bell />
                        </Button>
                    }
                />
                <DropdownMenuContent className="w-[380px]">
                    <DropdownMenuGroup>
                        {mockNotifications.map(item => (
                            <Link key={item.notification_id} to={item.url} className="w-full hover:">
                                <DropdownMenuItem className="flex justify-between min-h-[70px] px-4 py-3 hover:bg-muted focus:bg-muted hover:cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <item.icon className="size-6" />
                                        <div className="flex flex-col">
                                            <span className="text-[15px] font-bold">{item.title}</span>
                                            <span className="text-[12px]">{item.description}</span>
                                        </div>
                                    </div>
                                    {item.is_read && <Dot className="size-12 -mr-3" />}
                                </DropdownMenuItem>
                            </Link>
                        ))}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Avatar */}
            <DropdownMenu>
                <DropdownMenuTrigger
                    render={
                        <div className="grid size-[36px] shrink-0 ml-[12px] mr-[4px] place-items-center rounded-full bg-[#d3e8dc] text-[10px] font-bold text-[#317456] hover:cursor-pointer">
                            <UserRound className="size-6" />
                        </div>
                    }
                />
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        {avatarDropdownItems.map((item, index) => (
                            <Link key={index} to={item.url} className="w-full">
                                <DropdownMenuItem className="hover:bg-muted focus:bg-muted hover:cursor-pointer">
                                    <item.icon />
                                    {item.title}
                                </DropdownMenuItem>
                            </Link>
                        ))}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
