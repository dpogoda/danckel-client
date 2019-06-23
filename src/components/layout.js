import React from 'react';
import PropTypes from 'prop-types';
import './layout.css';
import { navigate } from 'gatsby';
import gear from '../images/gear.png';
import back from '../images/back.png';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSettings: false,
      showBack: false,
    };
    Layout.layoutRef = this;
  }

  componentDidMount() {
    /* eslint-disable */
    const OneSignal = (typeof window !== 'undefined' && window.OneSignal) || [];
    /* eslint-disable */
    OneSignal.push(function() {
      OneSignal.init({
        appId: 'a3a2ab9d-23b7-4526-bf77-689043a355fa',
        notifyButton: {
          enable: true,
        },
      });
    });
  }

  /* eslint-disable */
  handleRouteChange(newRoute, oldRoute) {
    console.log(newRoute === '/settings');
    if (
      newRoute !== '/' &&
      newRoute !== '/onboarding' &&
      newRoute !== '/settings' &&
      newRoute !== '/changePassword' &&
      newRoute !== '/about' &&
      newRoute !== '/sendFeedback'
    ) {
      this.setState({
        showSettings: true,
      });
    } else {
      this.setState({
        showSettings: false,
      });
    }
    if (
      newRoute !== '/' &&
      newRoute !== '/onboarding' &&
      newRoute !== '/main'
    ) {
      this.setState({
        showBack: true,
      });
    } else {
      this.setState({
        showBack: false,
      });
    }
  }
  /* eslint-disable */

  render() {
    const { children } = this.props;
    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: `10px`,
            height: `30px`,
          }}
        >
          {this.state.showBack ? (
            <button
              type="submit"
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                marginLeft: `10px`,
              }}
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.history.back();
                }
              }}
            >
              <img src={back} alt="Settings" width="15px" height="20px" />
            </button>
          ) : (
            <div />
          )}
          {this.state.showSettings ? (
            <button
              type="submit"
              style={{ background: 'none', border: 'none', color: 'white' }}
              onClick={() => {
                navigate('/settings');
              }}
            >
              <img src={gear} alt="Settings" width="20px" height="20px" />
            </button>
          ) : null}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <h2>DanckelApp</h2>
        </div>
        {children}
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
