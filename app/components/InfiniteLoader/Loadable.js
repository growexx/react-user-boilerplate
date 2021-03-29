/**
 *
 * Asynchronously loads the component for InfiniteLoader
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
