import React, { useState } from 'react';
import { Link } from 'gatsby';
import Margin from '../components/cowo/mobile/margin/Margin';
import MenuItem from './menuItem';

const Main = () => {
  const OneSignal = typeof window !== 'undefined' && window.OneSignal;
  if (OneSignal) {
    OneSignal.push(function() {
      OneSignal.showNativePrompt();
    });
  }

  return (
    <Margin>
      <p>
        DanckelApp is in the beta phase right now and currently written for
        mobile. This project is completly based on voluntary work. If you want
        to participate send us an
        {
          ' ' // eslint-disable-line
        }
        <a
          href="mailto:feedback@danckel.app"
          style={{ color: 'white', textDecoration: 'underline' }}
        >
          email
        </a>
        {
          ' ' // eslint-disable-line
        }
        🙂
      </p>
      <p>
        Feel also free to give us some
        {
          ' ' // eslint-disable-line
        }
        <Link to="/sendFeedback" style={{ color: 'white' }}>
          feedback
        </Link>
        {
          ' ' // eslint-disable-line
        }
        😉
      </p>
      <MenuItem
        title="News"
        description="Check the latest news from the SV. The SV will inform you about events, office hours and other things."
        navigateTo="/news"
      />
      <MenuItem
        title="Report issue"
        description="Here you can report any issue directly to the Hausmeister so he can fix it."
        navigateTo="/request"
      />
      <MenuItem
        title="Floor money"
        description="Check your floor money. Each floor has an amount of 30€ per semester."
        navigateTo="/floormoney"
      />
      <MenuItem
        title="FAQ"
        description="Check out the FAQs. Please note that the FAQs will updated time by time. Please contact us if you think something is wrong."
        navigateTo="/faq"
      />
    </Margin>
  );
};

export default Main;
