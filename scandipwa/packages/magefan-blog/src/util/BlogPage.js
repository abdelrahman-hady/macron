/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import {
    BLANK_PAGE_TYPE,
    DISPLAY_MODE_FEATURED_POSTS,
    DISPLAY_MODE_RECENT_POSTS
} from '../route/BlogPage/BlogPage.config';

// vvv Modifies path to return post's path for Link tag's to attribute
export function parsePostPath(path) {
    // vvv Removes first item from the path
    const splittedPath = path.split('/').filter((item) => item !== '');
    // vvv Gets base URL for the post
    const leftoverUrl = splittedPath.filter((item, index) => (index === 0 || index === 1 ? null : item));

    return `/${leftoverUrl.join('/')}`;
}

export const getFilterKeyByLabel = {
    author: 'author_id',
    post: 'post_id',
    tag: 'tag_id',
    category: 'category_id',
    search: 'search',
    archive: 'publish_time'
};

export function convertNumToBool(number) {
    return number.toString() === '1';
}

export function convertStringToBool(string) {
    return string.toLowerCase() === 'true';
}

export function getIndexPageDisplayMode(displayMode) {
    if (displayMode === '0') {
        return DISPLAY_MODE_RECENT_POSTS;
    }

    if (displayMode === '1') {
        return DISPLAY_MODE_FEATURED_POSTS;
    }

    return BLANK_PAGE_TYPE;
}

export function getShortMonthString(monthNumber) {
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
    ];

    return months[monthNumber];
}

export function getTwoDigitNumber(number) {
    const maxSingleDigitNumber = 9;

    return number < maxSingleDigitNumber ? `0${number}` : number;
}

export function formatDate(publishTime) {
    const date = new Date(publishTime);
    const year = date.getFullYear();
    const month = getShortMonthString(date.getMonth());
    const day = getTwoDigitNumber(date.getDate());

    return `${month} ${day}, ${year}`;
}
