import React from 'react';
import { navigate } from 'gatsby';
import Margin from '../components/cowo/mobile/margin/Margin';
import Button from '../components/cowo/mobile/button/Button';
import packageJson from '../../package.json';

const Settings = () => (
  <Margin>
    <Button text="About" onPress={() => navigate('/about')} />
    <Margin />
    <Button text="Send Feedback" onPress={() => navigate('/sendFeedback')} />
    <Margin />
    <Button
      text="Change password"
      onPress={() => navigate('/changePassword')}
    />
    <Margin />
    <Button
      text="Logout"
      onPress={() => {
        /* eslint-disable */
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('id');
          localStorage.removeItem('roles');
          navigate('/');
        }
        /* eslint-enable */
      }}
    />
    <Margin />
    <p style={{ textAlign: 'center' }}>
      Version:
      {packageJson.version}
    </p>
  </Margin>
);

export default Settings;
