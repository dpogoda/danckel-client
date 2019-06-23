import React from 'react';
import Margin from '../components/cowo/mobile/margin/Margin';
import MenuItem from './menuItem';

const Main = () => (
  <Margin>
    <MenuItem
      title="News"
      description="Check the latest news from the SV. The SV will inform you about events, office hours and other things."
    />
    <MenuItem
      title="Report issue"
      description="Here you can report any issue directly to the Hausmeister so he can fix it."
      navigateTo="/request/"
    />
    <MenuItem
      title="Floor money"
      description="Check your floor money. Each floor has an amount of 30€ per semester."
      navigateTo="/floormoney/"
    />
  </Margin>
);

export default Main;
