import { Divider, Panel, SelectPicker } from 'rsuite';
import { ItemDataType } from 'rsuite/esm/@types/common';
import { theme } from '../../style';
import Space from '../Space';
import GaugeChart from 'react-gauge-chart'

type dataProp = { label: string; value: string; }
interface IProps {
    header?: string;
    title?: string;
    number: string | number;
    data: dataProp[];
    onChange: (value: string) => void;
    value?: string;
    persent: number;
}

export function SegmentCard(props: IProps) {
    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        }}>
            <div>
                <p className="text-center">{props.header}</p>
                <Space height={20} />
                <SelectPicker value={props.value} onChange={props.onChange} data={props.data} block />
            </div>
            {/* <h4 className='text-center'>{props.title}</h4> */}
            <GaugeChart id="gauge-chart2"
                animate={false}
                hideText
                colors={["#FF5F6D", "#FFC371"]}
                percent={props.persent / 100}
                nrOfLevels={20}
            />
            <div style={{
                padding: '20px 0',
            }} className='d-flex justify-space-between align-center'>
                <p className='text-center'>Total number of user</p>
                <h5 style={{ color: theme.red }} className='text-center'>{props.number}</h5>
            </div>
        </div>
    );
}
