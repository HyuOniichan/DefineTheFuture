import { AppBreadcrumb } from "./Breadcrumb";
import { HeaderActions } from "./HeaderActions";

export function Header() {
    return (
        <header className="flex h-[52px] items-center justify-between border-b-[1px] border-[#e2e6e2]">
            <AppBreadcrumb />
            <HeaderActions />
        </header>
    );
}
