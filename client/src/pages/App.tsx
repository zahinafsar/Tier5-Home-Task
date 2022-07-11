import { Sidenav, Nav, Container, Content, Header, Navbar, Sidebar, CustomProvider } from 'rsuite';
import { Dashboard } from '@rsuite/icons';
import Home from './home';


const headerStyles = {
    padding: 18,
    fontSize: 18,
    height: 56,
    fontWeight: 'bolder',
    background: '#34c3ff',
    color: ' #fff',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textAlign: 'center'
};

function App() {
    return (
        <CustomProvider>
            <div className="show-fake-browser sidebar-page">
                <Container>
                    <Sidebar
                        style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
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
                                <Nav>
                                    <Nav.Item eventKey="1" active icon={<Dashboard />}>
                                        Dashboard
                                    </Nav.Item>
                                    <Nav.Item eventKey="2">
                                        User Group
                                    </Nav.Item>
                                </Nav>
                            </Sidenav.Body>
                        </Sidenav>
                    </Sidebar>
                    <Container>
                        <Home />
                    </Container>
                </Container>
            </div>
        </CustomProvider>
    )
}

export default App
