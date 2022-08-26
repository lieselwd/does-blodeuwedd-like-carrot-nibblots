import TextTransition, { presets } from "react-text-transition";
import { Grouping } from "../types/Grouping";

interface Props {
    key: number,
    grouping: Grouping
}

export default function GroupingVotes({grouping}: Props) {
    return (
        <div className="flex flex-row justify-between items-center font-semibold px-4 w-1/6" style={{
            backgroundColor: `${grouping.colour}`,
            color: `${grouping.text_colour}`
        }}>
            <span>{ grouping.code }</span>
            <TextTransition springConfig={presets.gentle}>
                <span style={{
                    marginTop: '-20px'
                }}>
                    {grouping.vote_share}%
                </span>
            </TextTransition>
        </div>
    )
}