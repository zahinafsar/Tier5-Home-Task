import { Panel, SelectPicker } from 'rsuite';
import countries, { languages } from "countries-list";
import Space from '../Space';
import { SegmentCard } from '.';
import { useState } from 'react';

interface IProps {
    value: string;
}

export function CountrySegment(props: IProps) {
    const countryCodes = Object.keys(countries.countries);
    const countryNames = countryCodes.map(code =>
    ({
        label: (countries.countries as any)[code].name,
        value: (countries.countries as any)[code].name
    }));
    const [active, setActive] = useState(props.value);
    return (
        <SegmentCard header='User Segment By Country' title={active} number="25k" data={countryNames} onChange={(value) => setActive(value)} value={active} />
    );
}
