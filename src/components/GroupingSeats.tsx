import TextTransition, { presets } from "react-text-transition";
import { Grouping } from "../types/Grouping";

interface Props {
    key: number,
    grouping: Grouping
}

export default function GroupingSeats({grouping}: Props) {
    return (
        <div className="flex flex-auto flex-row justify-between items-center font-semibold px-4" style={{
            backgroundColor: `${grouping.colour}`,
            color: `${grouping.text_colour}`
        }}>
            <span>{ grouping.code }</span>
            <TextTransition springConfig={presets.gentle}>
                <span>{ grouping.seats }</span>
            </TextTransition>
        </div>
    )
}