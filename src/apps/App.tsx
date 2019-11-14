import React from 'react';
import Layout from '../layouts/Layout';
import '@reach/menu-button/styles.css';
import {
  selectShowInsecureApp,
  selectShowOnboardingApp,
  selectShowSecureApp,
} from '../selectors';
import { useSelector } from 'react-redux';
import SecureApp from './SecureApp';
import InsecureApp from './InsecureApp';
import OnboardingApp from './OnboardingApp';
import CommonRoutes from './CommonRoutes';

const App = () => {
  const showInsecureApp = useSelector(selectShowInsecureApp);
  const showOnboardingApp = useSelector(selectShowOnboardingApp);
  const showSecureApp = useSelector(selectShowSecureApp);
  return (
    <Layout>
      <React.Fragment>
        <CommonRoutes />
        {showInsecureApp && <InsecureApp />}
        {showOnboardingApp && <OnboardingApp />}
        {showSecureApp && <SecureApp />}
      </React.Fragment>
    </Layout>
  );
};

export default App;