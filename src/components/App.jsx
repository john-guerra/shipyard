import { Affix, Layout } from 'antd';
import React from 'react';
import HeaderComponent from './header/Header';
import FooterComponent from './footer/Footer';
import Playground from './playground/Playground';
import Loader from './loader/Loader';

const { Header, Content, Footer } = Layout;
const headerStyle = {
  marginBottom: '1em',
  padding: 0,
  backgroundColor: 'white',
  boxShadow: '0 5px 4px rgba(0,0,0,0.15), 0 4px 4px rgba(0,0,0,0.12)',
};
const mainStyle = {
  minHeight: '100vh',
};
const App = () => (
  <div style={mainStyle}>
    <Loader></Loader>
    <Layout>
      <Affix>
        <Header style={headerStyle}>
          <HeaderComponent />
        </Header>
      </Affix>
      <Content>
        <Playground />
      </Content>
      <Footer>
        <FooterComponent />
      </Footer>
    </Layout>
  </div>
);

export default App;
