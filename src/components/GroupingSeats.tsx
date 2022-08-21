import TextTransition, { presets } from "react-text-transition";
import { Grouping } from "../types/Grouping";

interface Props {
    key: number,
    grouping: Grouping
    previous: boolean
}

export default function GroupingSeats({grouping, previous}: Props) {
    return (
        <div className="flex flex-auto flex-row justify-between items-center font-semibold px-4" style={{
            backgroundColor: `${grouping.colour}`,
            color: `${grouping.text_colour}`
        }}>
            <span>{ grouping.code }</span>
            <TextTransition springConfig={presets.gentle}>
                <span>
                    {previous == true ?   
                        <>
                            {!grouping.previous_seats &&
                                <span style={{
                                    marginTop: '-20px'
                                }}>
                                    None
                                </span>
                            }
                            {grouping.previous_seats && 
                                <span style={{
                                    marginTop: '-20px'
                                }}>
                                    {grouping.previous_seats}
                                </span>
                            }
                        </>
                        :
                        <>
                            {grouping.seats}
                        </>
                    }

                </span>
            </TextTransition>
        </div>
    )
}