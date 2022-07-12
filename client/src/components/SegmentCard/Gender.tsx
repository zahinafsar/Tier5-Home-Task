import { SegmentCard } from '.';
import { useEffect, useState } from 'react';
import { GENDER } from '../../enums/user.js'
import { useCustomDispatch, useCustomSelector } from '../../store';
import { setGlobalStore } from '../../store/reducers/global';
import { invert } from 'lodash';
import { get_user_by_device, get_user_by_gender } from '../../api/dashboard';

interface IProps {
    value: string;
    id: number
}

export function GenderSegment(props: IProps) {
    const [totalUser, setTotalUser] = useState(0)
    const [persent, setPersent] = useState(0)
    const dispatch = useCustomDispatch();
    const { dashboard } = useCustomSelector(state => state.global)
    const itemData = dashboard.find(item => item.id === props.id)

    useEffect(() => {
        updateUser(itemData?.value || '')
    }, [itemData?.value])

    const updateUser = async (gender: string) => {
        const { data } = await get_user_by_gender(invert(GENDER as any)[gender])
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
        <SegmentCard header='User Segment By Gender' title={itemData?.value} persent={persent} number={totalUser} data={gender} onChange={handleChange} value={itemData?.value} />
    );
}
const gender = Object.entries(GENDER).map(([key, value]) =>
({
    label: value,
    value
}));
