import { SegmentCard } from '.';
import { useState } from 'react';
import { DEVICES } from '../../enums/user.js'

interface IProps {
    value: string;
}

export function DeviceSegment(props: IProps) {
    const devices = Object.entries(DEVICES).map(([key, value]) =>
    ({
        label: value,
        value
    }));
    const [active, setActive] = useState(props.value);
    return (
        <SegmentCard header='User Segment By Device' title={active} number="25k" data={devices} onChange={(value) => setActive(value)} value={active} />
    );
}
