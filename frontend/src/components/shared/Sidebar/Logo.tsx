import { Link } from "@tanstack/react-router"
import { StarCheck } from "lucide-react"

import { APP_NAME } from "@/utils/mockData"

export function Logo() {
    return (
        <Link to="/" className="flex gap-2 place-items-center">
            <div className="grid size-[27px] place-items-center rounded-[7px] bg-[#17201d] text-white">
                <StarCheck className="w-7" />
            </div>
            <span className="text-[16px] tracking-wide text-[#18211e] font-bold">{APP_NAME}</span>
        </Link>
    )
}
