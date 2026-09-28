import { Badge } from "@/components/ui/badge";
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import { Link } from "@tanstack/react-router";

interface GoalCardProps {
    id: string,
    goalStatus: string,
    title: string,
    description?: string,
    progress: number,
    tagTitles: string[]
}

export function GoalCard(props: GoalCardProps) {
    return (
        <div className="relative w-full bg-white px-5 py-4 rounded-lg border-[2px] border-[#eef1ed] overflow-hidden">
            <div className="bg-[#65dca1] w-[4px] h-full absolute left-0 top-0"></div>

            <p className="text-[12px] mb-[6px] tracking-wide text-[#85908a] uppercase">
                {props.goalStatus} goal
            </p>

            <Link
                to="/goals/$goalId"
                params={{ goalId: props.id }}
                className="text-[20px] font-semibold"
            >
                {props.title}
            </Link>

            <p className="text-[12px] text-[#85908a]">
                {props.description || "..."}
            </p>

            <Progress value={props.progress} className="w-full text-[#65dca1] gap-1 mt-4">
                <ProgressLabel className="text-[12px] text-[#85908a]">Progress</ProgressLabel>
                <ProgressValue className="text-[12px] text-[#85908a]" />
            </Progress>

            <div className="flex gap-1.5 mt-5">
                {props.tagTitles.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="rounded-sm py-3">
                        {tag}
                    </Badge>
                ))}
            </div>
        </div>
    )
}