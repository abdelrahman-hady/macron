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
                    <p>of</p>
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
