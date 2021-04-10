/**
 * REACT - GA : https://www.npmjs.com/package/react-ga
 */
import ReactGA from 'react-ga';
export const initGA = () => {
  ReactGA.initialize('UA-194132994-1', {
    testMode: process.env.NODE_ENV === 'test',
    titleCase: false,
  });
};

/**
 * recordPageView - record pages visited.
 * @param {string} category
 * @param {string} action
 * @param {string} label
 */
export const recordPageViewGA = location => {
  ReactGA.pageview(location);
};

/**
 * event - Add custom tracking event.
 * @param {string} category
 * @param {string} action
 * @param {string} label
 */
export const eventGA = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};
