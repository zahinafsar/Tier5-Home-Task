import { useEffect } from 'react';
import { Sidenav, Container, Sidebar, CustomProvider } from 'rsuite';
import Home from './home';
import { AiOutlinePieChart } from 'react-icons/ai';
import { AiOutlineLineChart } from 'react-icons/ai';
import { BsBarChartLine } from 'react-icons/bs';
import { AiOutlineRadarChart } from 'react-icons/ai';
import { MdSegment } from 'react-icons/md';
import { TbPoint } from 'react-icons/tb';
import Space from '../components/Space';
import { IDashboardProp } from '../interface/IDashboard';
import { useCustomDispatch, useCustomSelector } from '../store';
import { setGlobalStore } from '../store/reducers/global';


const headerStyles = {
    padding: 18,
    fontSize: 18,
    height: 56,
    fontWeight: 'bolder',
    background: '#34c3ff',
    color: ' #fff',
    overflow: 'hidden',
};

const Nav = ({ title, icon, onClick }: {
    title: string;
    icon: React.ReactNode;
    onClick?: () => void;
}) => {
    return (
        <div onClick={onClick} style={{ cursor: "pointer" }} className='pa-5 d-flex justify-space-between align-center'>
            <h6>{title}</h6>
            {icon}
        </div>
    )
}
const SubNav = ({ title, onClick }: {
    title: string
    onClick?: () => void;
}) => {
    return (
        <div onClick={onClick} style={{ cursor: "pointer" }} className='py-2 pl-8 d-flex align-center'>
            <TbPoint />
            <Space width={5} />
            <h6>{title}</h6>
        </div>
    )
}


function App() {
    const { dashboard: items } = useCustomSelector(state => state.global)

    const dispatch = useCustomDispatch()

    useEffect(() => {
        // updateDashboard()
    }, [items])

    const addItem = (type: string, category?: string, value?: string) => {
        let newData: IDashboardProp;
        if (category) {
            newData = {
                id: items.length + 1,
                type: type,
                category,
                value
            }
        } else {
            newData = {
                id: items.length + 1,
                type: type,
            }
        }
        dispatch(setGlobalStore({
            dashboard: [
                ...items,
                newData
            ]
        }))
    }
    return (
        <CustomProvider>
            <div className="show-fake-browser sidebar-page">
                <Container style={{ position: 'fixed', height: '100vh', width: '100%' }}>
                    <Sidebar
                        style={{ display: 'flex', flexDirection: 'column' }}
                        width={260}
                        collapsible
                    >
                        <Sidenav.Header>
                            <div style={headerStyles}>
                                <span style={{ marginLeft: 12 }}>Tier5 Home Task</span>
                            </div>
                        </Sidenav.Header>
                        <Sidenav style={{ height: '100%' }}>
                            <Sidenav.Body>
                                <Nav onClick={() => addItem('pie')} title="Pie Chart" icon={<AiOutlinePieChart size={20} />} />
                                <Nav onClick={() => addItem('line')} title="Line Chart" icon={<AiOutlineLineChart size={20} />} />
                                <Nav onClick={() => addItem('bar')} title="Bar Chart" icon={<BsBarChartLine size={20} />} />
                                <Nav onClick={() => addItem('radar')} title="Radar Chart" icon={<AiOutlineRadarChart size={20} />} />
                                <Nav title="Segment" icon={<MdSegment size={20} />} />
                                <SubNav onClick={() => addItem('segment', 'country', 'India')} title='Country' />
                                <SubNav onClick={() => addItem('segment', 'gender', 'Male')} title='Gender' />
                                <SubNav onClick={() => addItem('segment', 'device', 'Android')} title='Device' />
                            </Sidenav.Body>
                        </Sidenav>
                    </Sidebar>
                    <Container style={{ overflow: 'auto' }}>
                        <Home />
                    </Container>
                </Container>
            </div>
        </CustomProvider>
    )
}

export default App

