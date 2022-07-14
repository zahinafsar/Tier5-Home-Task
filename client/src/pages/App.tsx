import { useEffect, useState } from "react";
import {
    Sidenav,
    Container,
    Sidebar,
    CustomProvider,
    List,
    Input,
    Button,
    useToaster,
    Message,
} from "rsuite";
import Home from "./home";
import { AiOutlinePieChart } from "react-icons/ai";
import { AiOutlineLineChart } from "react-icons/ai";
import { BsBarChartLine } from "react-icons/bs";
import { BiTable } from "react-icons/bi";
import { AiOutlineRadarChart } from "react-icons/ai";
import { AiOutlineRightCircle, AiOutlineLeftCircle } from "react-icons/ai";
import { MdSegment } from "react-icons/md";
import { TbPoint } from "react-icons/tb";
import Space from "../components/Space";
import { IDashboardProp } from "../interface/IDashboard";
import { useCustomDispatch, useCustomSelector } from "../store";
import { setGlobalStore } from "../store/reducers/global";
import {
    get_dashboard_data,
    get_single_dashboard_data,
    set_dashboard_data,
} from "../api/dashboard";
import { theme } from "../style";

const headerStyles = {
    padding: 18,
    minHeight: 60,
    maxHeight: 60,
    fontWeight: "bolder",
    // background: "rgb(234 240 242)",
    // boxShadow: "-2px 6px 10px 0px #e6e6e6",
    borderBottom: "1px solid #dedede",
    overflow: "hidden",
    cursor: "pointer",
};

const Nav = ({
    title,
    icon,
    onClick,
}: {
    title: string;
    icon: React.ReactNode;
    onClick?: () => void;
}) => {
    return (
        <div
            onClick={onClick}
            style={{ cursor: "pointer" }}
            className="pa-5 d-flex justify-space-between align-center"
        >
            <h6>{title}</h6>
            {icon}
        </div>
    );
};
const SubNav = ({
    title,
    onClick,
}: {
    title: string;
    onClick?: () => void;
}) => {
    return (
        <div
            onClick={onClick}
            style={{ cursor: "pointer" }}
            className="py-2 pl-8 d-flex align-center"
        >
            <TbPoint />
            <Space width={5} />
            <h6>{title}</h6>
        </div>
    );
};

function App() {
    const {
        dashboard: items,
        dashboardId,
        dashboardName,
        allDashboard,
    } = useCustomSelector((state) => state.global);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const toaster = useToaster();

    const dispatch = useCustomDispatch();

    useEffect(() => {
        getDashboard();
    }, []);

    useEffect(() => {
        getSingleDashboard();
    }, [dashboardId]);

    const getSingleDashboard = async () => {
        if (dashboardId) {
            const { data } = await get_single_dashboard_data(dashboardId);
            dispatch(
                setGlobalStore({
                    dashboard: data.data.dashboard,
                    dashboardName: data.data.name,
                })
            );
        }
    };

    const getDashboard = async () => {
        const { data } = await get_dashboard_data();
        dispatch(
            setGlobalStore({
                allDashboard: data.data,
            })
        );
    };

    const open = (id?: string) => {
        dispatch(
            setGlobalStore({
                dashboardId: id,
            })
        );
    };

    const updateDashboard = async () => {
        if (!dashboardName && !items.length) return;
        try {
            setIsLoaded(true);
            const { data } = await set_dashboard_data({
                id: dashboardId,
                dashboard: items,
                name: dashboardName,
            });
            console.log(data.data);

            setIsLoaded(false);
            if (data.data.new) {
                dispatch(
                    setGlobalStore({
                        allDashboard: [
                            ...allDashboard,
                            {
                                _id: data.data._id,
                                name: dashboardName,
                            },
                        ],
                        dashboardId: data.data._id,
                        dashboardName: data.data.name,
                    })
                );
                toaster.push(<Message showIcon type="success">New Dashboard has been created!</Message>)
            } else {
                const newData = allDashboard.map((item) => {
                    const newItem = { ...item };
                    if (newItem._id === data.data._id) {
                        newItem.name = data.data.name;
                    }
                    return newItem;
                });
                dispatch(
                    setGlobalStore({
                        allDashboard: newData
                    })
                );
                toaster.push(<Message showIcon type="success">Dashboard updated successfully!</Message>)
            }
        } catch (error: any) {
            setIsLoaded(false);
            if (error.error) {
                toaster.push(<Message showIcon type="error">{error.error}</Message>)
            }
        }
    };

    const addItem = (type: string, category?: string, value?: string) => {
        const genId = () => {
            let id = items.length + 1;
            while (items.find((item) => item.id === id)) {
                id++;
            }
            return id;
        };
        let newData: IDashboardProp;
        if (category) {
            newData = {
                id: genId(),
                type: type,
                category,
                value,
            };
        } else {
            newData = {
                id: genId(),
                type: type,
            };
        }
        dispatch(
            setGlobalStore({
                dashboard: [...items, newData],
            })
        );
    };

    const handleNameChange = (value: string) => {
        dispatch(
            setGlobalStore({
                dashboardName: value,
            })
        );
    };

    const clear = () => {
        setIsCreating(false);
        dispatch(
            setGlobalStore({
                dashboard: [],
                dashboardId: "",
                dashboardName: "",
            })
        );
    }

    return (
        <CustomProvider>
            <div className="show-fake-browser sidebar-page">
                <Container
                    style={{ position: "fixed", height: "100vh", width: "100%" }}
                >
                    <Sidebar
                        style={{ display: "flex", flexDirection: "column" }}
                        width={260}
                        collapsible
                    >
                        <Sidenav.Header>
                            <div
                                onClick={() => setIsCreating((prev) => !prev)}
                                className="text-center d-flex justify-space-between align-center"
                                style={{
                                    ...headerStyles,
                                    backgroundColor: theme.red,
                                    color: "white",
                                }}
                            >
                                {!isCreating ? (
                                    <>
                                        <span style={{ fontSize: 16 }}>User Dashboards</span>
                                        <AiOutlineRightCircle size={20} />
                                    </>
                                ) : (
                                    <>
                                        <AiOutlineLeftCircle size={20} />
                                        <span style={{ fontSize: 16 }}>Create Dashboard</span>
                                    </>
                                )}
                            </div>
                        </Sidenav.Header>
                        <Sidenav style={{ height: "100%" }}>
                            {!isCreating ? (
                                <Sidenav.Body>
                                    <Nav
                                        onClick={() => addItem("pie")}
                                        title="Pie Chart"
                                        icon={<AiOutlinePieChart size={20} />}
                                    />
                                    <Nav
                                        onClick={() => addItem("line")}
                                        title="Line Chart"
                                        icon={<AiOutlineLineChart size={20} />}
                                    />
                                    <Nav
                                        onClick={() => addItem("bar")}
                                        title="Bar Chart"
                                        icon={<BsBarChartLine size={20} />}
                                    />
                                    <Nav
                                        onClick={() => addItem("radar")}
                                        title="Radar Chart"
                                        icon={<AiOutlineRadarChart size={20} />}
                                    />
                                    <Nav
                                        onClick={() => addItem("table")}
                                        title="Active User Table"
                                        icon={<BiTable size={20} />}
                                    />
                                    <Nav title="Segment" icon={<MdSegment size={20} />} />
                                    <SubNav
                                        onClick={() => addItem("segment", "country", "India")}
                                        title="Country"
                                    />
                                    <SubNav
                                        onClick={() => addItem("segment", "gender", "Male")}
                                        title="Gender"
                                    />
                                    <SubNav
                                        onClick={() => addItem("segment", "device", "Android")}
                                        title="Device"
                                    />
                                </Sidenav.Body>
                            ) : (
                                <Sidenav.Body className="overflow-auto">
                                    <List hover style={{ cursor: "pointer" }} bordered>
                                        {allDashboard.map((item, index) => (
                                            <List.Item
                                                style={{ background: "transparent" }}
                                                onClick={() => open(item._id)}
                                                key={index}
                                                index={index}
                                            >
                                                {item.name || `Dashboard ${index + 1}`}
                                            </List.Item>
                                        ))}
                                    </List>
                                </Sidenav.Body>
                            )}
                        </Sidenav>
                    </Sidebar>
                    <Container style={{ overflow: "auto" }}>
                        <div
                            className="text-center d-flex justify-space-between align-center"
                            style={headerStyles}
                        >
                            <Input
                                onChange={handleNameChange}
                                placeholder="Dashboard name"
                                style={{ maxWidth: 400 }}
                                value={dashboardName}
                            />
                            <div className="d-flex">
                                <Button
                                    loading={isLoaded}
                                    onClick={updateDashboard}
                                    color="red"
                                    appearance="primary"
                                >
                                    Save
                                </Button>
                                <Space width={20} />
                                {!!items.length && <Button
                                    onClick={clear}
                                    appearance="primary"
                                >
                                    New
                                </Button>}
                            </div>
                        </div>
                        <Home />
                    </Container>
                </Container>
            </div>
        </CustomProvider>
    );
}

export default App;
