/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { MagefanBlogProvider } from '../context/MagefanBlog';

const addMagefanBlogContextProvider = (member) => [
    (children) => (
         <MagefanBlogProvider>
             { children }
         </MagefanBlogProvider>
    ),
    ...member
];

export default {
    'Component/App/Component': {
        'member-property': {
            contextProviders: addMagefanBlogContextProvider
        }
    }
};
