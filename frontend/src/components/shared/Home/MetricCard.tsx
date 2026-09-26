import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Link } from "@tanstack/react-router"
import { ChevronRight } from "lucide-react"

interface MetricCardProps {
    title: string,
    highlightedText: string,
    normalText?: string,
    linkText: string,
    link: string,
    commentText: string,
}

export function MetricCard(props: MetricCardProps) {
    return (
        <Card className="w-full gap-2 pt-3 pb-5">
            <CardHeader className="flex items-center justify-between px-0">
                <CardTitle className="ml-6 uppercase text-[14px] font-semibold text-muted-foreground">
                    {props.title}
                </CardTitle>
                <CardAction>
                    <Link to={props.link}>
                        <Button variant="link" className="mr-1 flex font-[8px] gap-0">
                            {props.linkText}
                            <ChevronRight />
                        </Button>
                    </Link>
                </CardAction>
            </CardHeader>
            <CardContent className="flex flex-row items-end gap-0">
                <span className="text-[32px] font-bold">{props.highlightedText}</span>
                {props.normalText && (
                    <span className="text-[16px] pl-[4px] pb-[5px]">/{props.normalText}</span>
                )}
            </CardContent>
            <CardFooter>
                <p className="text-[12px] mt-2 text-muted-foreground">
                    {props.commentText}
                </p>
            </CardFooter>
        </Card>
    )
}
