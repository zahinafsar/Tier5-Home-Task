import { Panel, SelectPicker } from 'rsuite';
import { ItemDataType } from 'rsuite/esm/@types/common';
import Space from '../Space';


type dataProp = { label: string; value: string; }
interface IProps {
    header?: string;
    title: string;
    number: string | number;
    data: dataProp[];
    onChange: (value: string) => void;
    value: string;
}

export function SegmentCard(props: IProps) {
    return (
        <Panel title={props.header} style={{ height: '100%' }}>
            <SelectPicker value={props.value} onChange={props.onChange} data={props.data} block />
            <Space height={30} />
            <h2 className='text-center'>{props.title}</h2>
            <Space height={10} />
            <h6 className='text-center'>Total number of user: {props.number}</h6>
        </Panel>
    );
}
