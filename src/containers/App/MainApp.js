import React from 'react'
import { useRouteMatch } from "react-router-dom";
import { Layout } from "antd";


import App from "../../routes/index";
import Topbar from '../Topbar/Topbar';

const MainApp = () => {
    const match = useRouteMatch();
    const { Content, Footer } = Layout;

    return (
        <Layout className="container">
            <Topbar />
            <Layout>
                <Content>
                    <App match={match} />
                    {/* <Footer>
                            <div className="gx-layout-footer-content">
                                {footerText}
                            </div>
                        </Footer> */}
                </Content>
            </Layout>
        </Layout>
    )
}

export default MainApp