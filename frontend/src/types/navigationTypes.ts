import type { LucideIcon } from "lucide-react" 

export interface SidebarItemType {
    title: string,
    url: string,
    icon?: LucideIcon
    newCount?: number
}
