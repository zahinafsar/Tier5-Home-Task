import { Panel, SelectPicker } from 'rsuite';
import countries, { languages } from "countries-list";
import Space from '../Space';
import { SegmentCard } from '.';
import { useEffect, useState } from 'react';
import { useCustomDispatch, useCustomSelector } from '../../store';
import { setGlobalStore } from '../../store/reducers/global';
import { get_user_by_country } from '../../api/dashboard';

interface IProps {
    value: string;
    id: number;
}

export function CountrySegment(props: IProps) {
    const [totalUser, setTotalUser] = useState(0)
    const [persent, setPersent] = useState(0)
    const dispatch = useCustomDispatch();
    const { dashboard } = useCustomSelector(state => state.global)
    const itemData = dashboard.find(item => item.id === props.id)

    useEffect(() => {
        updateUser(itemData?.value)
    }, [itemData?.value])

    const updateUser = async (country?: string) => {
        const { data } = await get_user_by_country(country)
        setTotalUser(data.data.count)
        setPersent(data.data.persent)
    }

    const handleChange = (value: string) => {
        const newData = dashboard.map((item: any) => {
            const newItem = { ...item }
            if (newItem.id === props.id) {
                newItem.value = value;
            }
            return newItem;
        })
        dispatch(setGlobalStore({
            dashboard: newData
        }))
    }
    return (
        <SegmentCard header='User Segment By Country' title={itemData?.value} number={totalUser} persent={persent} data={countryNames} onChange={handleChange} value={itemData?.value} />
    );
}

const countryCodes = Object.keys(countries.countries);
const countryNames = countryCodes.map(code =>
({
    label: (countries.countries as any)[code].name,
    value: (countries.countries as any)[code].name
}));
