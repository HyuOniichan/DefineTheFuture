import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar"
import {
    StarCheck,
    House,
    ListChecks,
    Goal,
    ChartColumn,
    Settings,
    UserRound,
    Ellipsis,
} from "lucide-react"
import type { SidebarItemType } from "@/types";

const APP_NAME = "DefineTheFuture";
const USER_NAME = "DND. HUY";
const DEFAULT_SIDEBAR_ITEM_TITLE = "Home";

const sidebarItems: SidebarItemType[] = [
    { title: "Home", url: "/", icon: House, newCount: 0 },
    { title: "Today", url: "/today", icon: ListChecks, newCount: 3 },
    { title: "Goals", url: "/goals", icon: Goal, newCount: 0 },
    { title: "Reports", url: "/reports", icon: ChartColumn, newCount: 0 },
]

export function AppSidebar() {
    const [activeSidebarItem, setActiveSidebarItem] = useState(DEFAULT_SIDEBAR_ITEM_TITLE);

    return (
        <Sidebar variant="inset" className="flex w-60 shrink-0 grow-0 flex-col bg-[#eef1ed] px-4.25 pb-4.5 pt-6.75">
            <SidebarHeader className="bg-[#eef1ed]">
                <Link to="/" className="flex gap-2 place-items-center">
                    <div className="grid size-[27px] place-items-center rounded-[7px] bg-[#17201d] text-white">
                        <StarCheck className="w-7" />
                    </div>
                    <span className="text-[16px] tracking-wide text-[#18211e] font-bold">{APP_NAME}</span>
                </Link>
            </SidebarHeader>

            <SidebarContent className="bg-[#eef1ed]">
                <SidebarGroup className="p-0">
                    <SidebarGroupLabel className="h-auto px-3 pb-[13px] pt-[48px] text-[14px] font-bold uppercase tracking-[0.17em] text-[#85908a]">
                        Workspace
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {sidebarItems.map((sidebarItem) => (
                                <SidebarMenuItem key={sidebarItem.title} className="bg-red">
                                    <Link
                                        to={sidebarItem.url}
                                        activeOptions={{ exact: sidebarItem.url === "/" }}
                                        activeProps={{ "data-active": "true" }}
                                        className="flex place-content-between w-full"
                                    >
                                        <SidebarMenuButton
                                            tooltip={sidebarItem.title}
                                            onClick={() => setActiveSidebarItem(sidebarItem.title)}
                                            isActive={sidebarItem.title === activeSidebarItem}
                                            className={`
                                                h-auto rounded-[7px] px-3 py-[11px] text-[14px] text-[#66706b]
                                                hover:bg-transparent hover:text-[#18211e]
                                                ${sidebarItem.title === activeSidebarItem ? '!bg-white text-[#18211e] font-semibold shadow-[0_1px_2px_rgba(30,45,36,0.06)]' : ''}
                                            `}
                                        >
                                            <div className="flex gap-2 place-items-center">
                                                <sidebarItem.icon className="size-4" />
                                                <span className="font-bold">{sidebarItem.title}</span>
                                            </div>

                                            {(sidebarItem.newCount > 0) && (
                                                <span className="ml-auto rounded-full bg-[#e0f8eb] px-[7px] py-[2px] text-[11px] font-normal text-[#258254]">
                                                    {sidebarItem.newCount}
                                                </span>
                                            )}
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-0 bg-[#eef1ed]">
                <div className="mb-4 h-px bg-border" />

                <SidebarMenu className="gap-1">
                    <SidebarMenuItem>
                        <Link
                            to="/settings"
                            activeProps={{ "data-active": "true" }}
                            className="flex gap-2 place-items-center w-full"
                        >
                            <SidebarMenuButton
                                tooltip="settings"
                                onClick={() => setActiveSidebarItem("settings")}
                                isActive={activeSidebarItem === "settings"}
                                className={`
                                    h-auto rounded-[7px] px-3 py-[11px] text-[14px] text-[#66706b]
                                    hover:bg-transparent hover:text-[#18211e]
                                    ${activeSidebarItem === "settings" ? '!bg-white text-[#18211e] font-semibold shadow-[0_1px_2px_rgba(30,45,36,0.06)]' : ''}
                                `}
                            >
                                <Settings className="size-4" />
                                <span className="font-bold">Settings</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
                
                {/* Account / Avatar */}
                <div className="flex items-center gap-[9px] p-1">
                    <div className="grid size-[31px] shrink-0 place-items-center rounded-full bg-[#d3e8dc] text-[10px] font-bold text-[#317456]">
                        <UserRound className="size-4" />
                    </div>

                    <div className="min-w-0">
                        <strong className="block text-[12px] text-[#18211e]">{USER_NAME}</strong>
                        <span className="block text-[10px] text-[#69736f]">Personal workspace</span>
                    </div>

                    <button
                        type="button"
                        className="ml-auto grid size-6 shrink-0 place-items-center rounded-md text-[#909a95] hover:bg-white"
                        aria-label="User menu"
                    >
                        <Ellipsis className="size-4" />
                    </button>
                </div>

            </SidebarFooter>
        </Sidebar>
    )
}