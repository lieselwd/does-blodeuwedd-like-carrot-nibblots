import TextTransition, { presets } from "react-text-transition";
import { Grouping } from "../types/Grouping";

interface Props {
    key: number,
    grouping: Grouping
}

export default function GroupingVotes({grouping}: Props) {
    return (
        <div className="flex flex-auto flex-row justify-between items-center font-semibold px-4" style={{
            backgroundColor: `${grouping.colour}`,
            color: `${grouping.text_colour}`
        }}>
            <span>{ grouping.code }</span>
            <TextTransition springConfig={presets.gentle}>
                <div className="flex flex-col justify-end -mt-2 text-right">
                    <div className="text-[26px]">{grouping.votes.toLocaleString("en-GB")}</div>
                    <div className="text-[18px] -mt-2">{grouping.vote_share}%</div>
                </div>
            </TextTransition>
        </div>
    )
}