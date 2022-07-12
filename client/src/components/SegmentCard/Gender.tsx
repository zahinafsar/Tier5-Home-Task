import { SegmentCard } from '.';
import { useState } from 'react';
import { GENDER } from '../../enums/user.js'

interface IProps {
    value: string;
}

export function GenderSegment(props: IProps) {
    const gender = Object.entries(GENDER).map(([key, value]) =>
    ({
        label: value,
        value
    }));
    const [active, setActive] = useState(props.value);
    return (
        <SegmentCard header='User Segment By Gender' title={active} number="25k" data={gender} onChange={(value) => setActive(value)} value={active} />
    );
}
