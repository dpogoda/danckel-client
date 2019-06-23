import React from 'react';
import { Link } from 'gatsby';
import Margin from '../components/cowo/mobile/margin/Margin';

const About = () => (
  <Margin>
    <h3>About</h3>
    <p>
      DanckelApp is in the beta phase right now. This project is completly based
      on voluntary work. If you want to participate send us an
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
        Feedback
      </Link>
      {
        ' ' // eslint-disable-line
      }
      😉
    </p>
    <p>Best, Doro and David</p>
  </Margin>
);

export default About;
