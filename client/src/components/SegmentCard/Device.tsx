import { SegmentCard } from '.';
import { useEffect, useState } from 'react';
import { DEVICES } from '../../enums/user.js'
import { useCustomDispatch, useCustomSelector } from '../../store';
import { setGlobalStore } from '../../store/reducers/global';
import { get_user_by_device } from '../../api/dashboard';
import { invert } from 'lodash'

interface IProps {
    id: number;
    value: string;
}

export function DeviceSegment(props: IProps) {
    const [totalUser, setTotalUser] = useState(0)
    const [persent, setPersent] = useState(0)
    const dispatch = useCustomDispatch();
    const { dashboard } = useCustomSelector(state => state.global)
    const itemData = dashboard.find(item => item.id === props.id)

    useEffect(() => {
        updateUser(itemData?.value || '')
    }, [itemData?.value])

    const updateUser = async (device: string) => {
        const { data } = await get_user_by_device(invert(DEVICES as any)[device])
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
        <SegmentCard header='User Segment By Device' title={itemData?.value} persent={persent} number={totalUser} data={devices} onChange={handleChange} value={itemData?.value} />
    );
}

const devices = Object.entries(DEVICES).map(([key, value]) =>
({
    label: value,
    value
}));