/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { PureComponent } from 'react';

import history from 'Util/History';

import SidebarSearch from './SidebarSearch.component';

/** @namespace Scandiweb/MagefanBlog/Component/SidebarSearch/Container/SidebarSearchContainer */
export class SidebarSearchContainer extends PureComponent {
    containerFunctions = {
        handleChange: this.handleChange.bind(this),
        handleClick: this.handleClick.bind(this),
        handleKeyPress: this.handleKeyPress.bind(this)
    };

    __construct(props) {
        super.__construct(props);

        this.state = {
            input: ''
        };
    }

    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }

    containerProps() {
        const { input } = this.state;
        return {
            input
        };
    }

    handleClick() {
        const { input } = this.state;

        if (!input) {
            return;
        }
        history.push(`/blog/search/${input}`);
    }

    handleKeyPress(event) {
        const { input } = this.state;

        if (event.key === 'Enter') {
            if (!input) {
                return;
            }
            history.push(`/blog/search/${input}`);
        }
    }

    render() {
        return (
            <SidebarSearch
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default SidebarSearchContainer;
