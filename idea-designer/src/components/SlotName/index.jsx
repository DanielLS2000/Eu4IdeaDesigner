import { useEffect, useState } from "react";
import "./SlotName.css";

const SlotName = ({id, image}) => {
    const [slotName, setSlotName] = useState(`Idea ${id}`);

    useEffect(() => {
        const savedValue = localStorage.getItem(`slotName-${id}`);
        if (savedValue) {
            setSlotName(savedValue)
        }
    }, [])

    useEffect(() => {
    localStorage.setItem(`slotName-${id}`, slotName);
    }, [slotName, id]);

    return(
        <span className="inline-content">
            <img src={`/images/ideaEu4/${image}.png`} alt="" className="idea-image" />
            <input
                type="text"
                placeholder={`Idea ${id}`}
                value={slotName}
                onChange={(e) => setSlotName(e.target.value)}
            />
        </span>
    )
}

export default SlotName;