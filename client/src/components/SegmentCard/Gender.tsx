import { SegmentCard } from '.';
import { useState } from 'react';
import { GENDER } from '../../enums/user.js'
import { useCustomDispatch, useCustomSelector } from '../../store';
import { setGlobalStore } from '../../store/reducers/global';

interface IProps {
    value: string;
    id: number
}

export function GenderSegment(props: IProps) {
    const dispatch = useCustomDispatch();
    const { dashboard } = useCustomSelector(state => state.global)
    const itemData = dashboard.find(item => item.id === props.id)
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
        <SegmentCard header='User Segment By Gender' title={itemData?.value} number="25k" data={gender} onChange={handleChange} value={itemData?.value} />
    );
}
const gender = Object.entries(GENDER).map(([key, value]) =>
({
    label: value,
    value
}));
