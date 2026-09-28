import { type ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface HeroProps {
    subtitle: string,
    title: string,
    buttonInnerHtml?: ReactNode
}

export function Hero(props: HeroProps) {
    return (
        <section className="flex justify-between items-end gap-[20px] pt-[45px] pb-[28px]">
            <div>
                <p className="text-[14px] tracking-wider text-[#85908a] font-[700]">
                    {props.subtitle}
                </p>

                <h1 className="mt-[10px] mb-[8px] text-[clamp(28px,3vw,38px)] tracking-tight leading-8 font-bold">
                    {props.title}
                </h1>
            </div>

            {props.buttonInnerHtml && (
                <Button className="flex gap-2 w-36 h-12 pr-4">
                    {props.buttonInnerHtml}
                </Button>
            )}

        </section>
    )
}
