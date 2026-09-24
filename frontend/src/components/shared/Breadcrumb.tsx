import { Fragment } from "react";
import { Link, useMatches } from "@tanstack/react-router"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Ellipsis } from "lucide-react";

export function AppBreadcrumb() {

    const matches = useMatches();
    const breadcrumbMatches = matches.filter((match, index, self) => {
        const normalizedPath = match.pathname.replace(/\/$/, "") || "/";
        if (normalizedPath === '/') return false;
        return index === self.findIndex((duplicateMatch) => {
            const duplicateMatchNormalized = duplicateMatch.pathname.replace(/\/$/, "") || "/";
            return duplicateMatchNormalized === normalizedPath;
        })

    });
    const breadcrumbLength: number = breadcrumbMatches.length;

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {/* Always Home first */}
                <BreadcrumbItem>
                    <BreadcrumbLink render={<Link to="/" />}>Home</BreadcrumbLink>
                </BreadcrumbItem>

                {/* Ellipsis - dropdown for middle breadcrumbs */}
                {(breadcrumbLength > 2) && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger 
                                    render={<Ellipsis className="size-7 p-1 rounded-lg hover:bg-[#f4f4f0] hover:cursor-pointer" />} 
                                />
                                <DropdownMenuContent>
                                    <DropdownMenuGroup>
                                        {breadcrumbMatches.map((match, index) => {
                                            const routeName = match.pathname.split("/").filter(pathnamePart => pathnamePart).pop() || "???";
                                            const displayTitle = routeName.charAt(0).toUpperCase() + routeName.slice(1);

                                            return (index < breadcrumbLength - 2) && (
                                                <Link key={match.id} to={match.pathname} className="w-full">
                                                    <DropdownMenuItem className="hover:cursor-pointer">
                                                        {displayTitle}
                                                    </DropdownMenuItem>
                                                </Link>
                                            )
                                        })}
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </BreadcrumbItem>
                    </>
                )}

                {/* 2 last  */}
                {breadcrumbMatches.map((match, index) => {
                    const routeName = match.pathname.split("/").filter(pathnamePart => pathnamePart).pop() || "???";
                    const displayTitle = routeName.charAt(0).toUpperCase() + routeName.slice(1);

                    if (index >= breadcrumbLength - 2) return (
                        <Fragment key={index}>
                            <BreadcrumbSeparator />

                            <BreadcrumbItem>
                                {(index == breadcrumbLength - 1) ? (
                                    <BreadcrumbPage className="font-semibold">{displayTitle}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink render={<Link to={match.pathname} />}>{displayTitle}</BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </Fragment>
                    )
                })}

            </BreadcrumbList>
        </Breadcrumb>
    )
}
