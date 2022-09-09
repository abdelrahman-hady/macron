/*
 * @category Macron
 * @author    Shehab Mohsen <shehab.mohsen@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { Pagination as SourcePagination } from 'SourceComponent/Pagination/Pagination.component';

import './Pagination.override.style.scss';

/** @namespace Scandipwa/Component/Pagination/Component */
export class PaginationComponent extends SourcePagination {
    renderPageLinks() {
        const { currentPage, totalPages } = this.props;

        return (
            <>
                { this.renderPageLink(
                    currentPage,
                    __('Page %s', currentPage),
                    currentPage.toString()
                ) }
                <li block="Pagination" elem="ListItem">
                    <p>{ __('Of') }</p>
                </li>
                <li block="Pagination" elem="ListItem">
                    <p>{ totalPages }</p>
                </li>
            </>
        );
    }

    renderNextPageLink() {
        const { anchorTextNext, currentPage, totalPages } = this.props;

        if (currentPage > totalPages - 1) {
            return <li block="Pagination" elem="ListItem" />;
        }

        return this.renderPageLink(
            currentPage + 1,
            __('Next page'),
            anchorTextNext || this.renderPageIcon(true)
        );
    }

    renderPreviousPageLink() {
        const {
            anchorTextPrevious,
            currentPage
        } = this.props;

        if (currentPage <= 1) {
            return (
                <li block="Pagination" elem="ListItem" />
            );
        }

        return this.renderPageLink(
            currentPage - 1,
            __('Previous page'),
            anchorTextPrevious || this.renderPageIcon()
        );
    }
}

export default PaginationComponent;
