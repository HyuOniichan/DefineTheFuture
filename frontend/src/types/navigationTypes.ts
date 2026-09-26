import type { LucideIcon } from "lucide-react" 
import type { INotification } from "./databaseSchemaTypes"

export interface NavigationLinkType {
    title: string,
    url: string,
}

export interface SidebarItemType extends NavigationLinkType {
    icon: LucideIcon
    newCount: number
}

export interface AvatarItemType extends NavigationLinkType {
    icon: LucideIcon
}

export interface NotificationType extends INotification {
    icon: LucideIcon,
}
