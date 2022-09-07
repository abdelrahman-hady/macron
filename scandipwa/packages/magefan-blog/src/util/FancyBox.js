/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { Fancybox as NativeFancybox } from '@fancyapps/ui/dist/fancybox.esm.js';
import { useEffect } from 'react';

import '@fancyapps/ui/dist/fancybox.css';

export function Fancybox(props) {
    const { delegate = '[data-fancybox]' } = props;

    useEffect(() => {
        const { options: opts = {} } = props;

        NativeFancybox.bind(delegate, opts);

        return () => {
            NativeFancybox.destroy();
        };
    }, []);

    return props.children;
}

export default Fancybox;
