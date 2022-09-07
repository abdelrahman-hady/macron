/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';

export const archiveType = PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string
});

export const AuthorType = PropTypes.shape({
    author_id: PropTypes.number,
    identifier: PropTypes.string,
    title: PropTypes.string,
    name: PropTypes.string,
    meta_description: PropTypes.string,
    meta_title: PropTypes.string,
    url: PropTypes.string,
    author_url: PropTypes.string,
    is_active: PropTypes.number,
    creation_time: PropTypes.string,
    role: PropTypes.string,
    featured_image: PropTypes.string,
    content: PropTypes.string,
    filtered_content: PropTypes.string,
    short_content: PropTypes.string,
    short_filtered_content: PropTypes.string,
    facebook_page_url: PropTypes.string,
    twitter_page_url: PropTypes.string,
    instagram_page_url: PropTypes.string,
    linkedin_page_url: PropTypes.string,
    page_layout: PropTypes.string,
    layout_update_xml: PropTypes.string,
    custom_theme: PropTypes.string,
    custom_layout: PropTypes.string,
    custom_theme_from: PropTypes.string,
    custom_theme_to: PropTypes.string,
    custom_layout_update_xml: PropTypes.string
});

export const tagType = PropTypes.shape({
    tag_id: PropTypes.number,
    tag_url: PropTypes.string,
    identifier: PropTypes.string,
    title: PropTypes.string,
    meta_robots: PropTypes.string,
    meta_description: PropTypes.string,
    meta_keywords: PropTypes.string,
    meta_title: PropTypes.string,
    page_layout: PropTypes.string,
    is_active: PropTypes.number,
    content: PropTypes.string,
    layout_update_xml: PropTypes.string,
    custom_theme: PropTypes.string,
    custom_layout: PropTypes.string,
    custom_layout_update_xml: PropTypes.string,
    custom_theme_from: PropTypes.string,
    custom_theme_to: PropTypes.string
});

export const tagsType = PropTypes.arrayOf(tagType);

export const categoryType = PropTypes.shape({
    category_id: PropTypes.number,
    parent_category_id: PropTypes.number,
    category_url: PropTypes.string,
    category_level: PropTypes.number,
    identifier: PropTypes.string,
    title: PropTypes.string,
    meta_title: PropTypes.string,
    meta_keywords: PropTypes.string,
    meta_description: PropTypes.string,
    canonical_url: PropTypes.string,
    content_heading: PropTypes.string,
    content: PropTypes.string,
    path: PropTypes.string,
    position: PropTypes.number,
    posts_sort_by: PropTypes.number,
    include_in_menu: PropTypes.number,
    is_active: PropTypes.number,
    display_mode: PropTypes.number,
    page_layout: PropTypes.string,
    layout_update_xml: PropTypes.string,
    custom_theme: PropTypes.string,
    custom_layout: PropTypes.string,
    custom_layout_update_xml: PropTypes.string,
    custom_theme_from: PropTypes.string,
    custom_theme_to: PropTypes.string,
    category_url_path: PropTypes.string,
    posts_count: PropTypes.number
});

export const replyType = PropTypes.shape({
    post_id: PropTypes.number,
    comment_id: PropTypes.number,
    parent_id: PropTypes.number,
    customer_id: PropTypes.number,
    admin_id: PropTypes.number,
    status: PropTypes.number,
    author_type: PropTypes.number,
    author_nickname: PropTypes.string,
    author_email: PropTypes.string,
    text: PropTypes.string,
    creation_time: PropTypes.string,
    update_time: PropTypes.string
});

export const repliesType = PropTypes.arrayOf(replyType);

export const commentType = PropTypes.shape({
    post_id: PropTypes.number,
    comment_id: PropTypes.number,
    parent_id: PropTypes.number,
    customer_id: PropTypes.number,
    admin_id: PropTypes.number,
    status: PropTypes.number,
    author_type: PropTypes.number,
    author_nickname: PropTypes.string,
    author_email: PropTypes.string,
    text: PropTypes.string,
    creation_time: PropTypes.string,
    update_time: PropTypes.string,
    replies: repliesType
});

export const commentsType = PropTypes.arrayOf(commentType);
export const archivesType = PropTypes.arrayOf(archiveType);
export const categoriesType = PropTypes.arrayOf(categoryType);
export const relatedProductsType = PropTypes.arrayOf(PropTypes.string); // ? Do we need this in new line?

export const relatedPostType = PropTypes.shape({
    post_id: PropTypes.number,
    post_url: PropTypes.string,
    identifier: PropTypes.string,
    title: PropTypes.string,
    meta_title: PropTypes.string,
    meta_keywords: PropTypes.string,
    meta_description: PropTypes.string,
    og_title: PropTypes.string,
    og_description: PropTypes.string,
    og_image: PropTypes.string,
    og_type: PropTypes.string,
    canonical_url: PropTypes.string,
    content_heading: PropTypes.string,
    content: PropTypes.string,
    filtered_content: PropTypes.string,
    short_filtered_content: PropTypes.string,
    creation_time: PropTypes.string,
    update_time: PropTypes.string,
    publish_time: PropTypes.string,
    is_active: PropTypes.number,
    include_in_recent: PropTypes.number,
    position: PropTypes.number,
    first_image: PropTypes.string,
    featured_image: PropTypes.string,
    featured_img_alt: PropTypes.string,
    featured_list_image: PropTypes.string,
    featured_list_img_alt: PropTypes.string,
    author: AuthorType,
    author_id: PropTypes.number,
    search: PropTypes.string,
    tag_id: PropTypes.number,
    category_id: PropTypes.number,
    tags: tagsType,
    categories: categoriesType,
    page_layout: PropTypes.string,
    layout_update_xml: PropTypes.string,
    custom_theme: PropTypes.string,
    custom_layout: PropTypes.string,
    custom_layout_update_xml: PropTypes.string,
    custom_theme_from: PropTypes.string,
    custom_theme_to: PropTypes.string,
    media_gallery: PropTypes.arrayOf(PropTypes.string),
    secret: PropTypes.string,
    views_count: PropTypes.number,
    is_recent_posts_skip: PropTypes.number,
    short_content: PropTypes.string,
    // ? just ro prevent nesting :(
    // related_posts: relatedpostsType,
    related_products: relatedProductsType,
    relatedproduct_id: PropTypes.number,
    comment_total_count: PropTypes.number
});
export const relatedPostsType = PropTypes.arrayOf(relatedPostType);

export const postType = PropTypes.shape({
    post_id: PropTypes.number,
    post_url: PropTypes.string,
    identifier: PropTypes.string,
    title: PropTypes.string,
    meta_title: PropTypes.string,
    meta_keywords: PropTypes.string,
    meta_description: PropTypes.string,
    og_title: PropTypes.string,
    og_description: PropTypes.string,
    og_image: PropTypes.string,
    og_type: PropTypes.string,
    canonical_url: PropTypes.string,
    content_heading: PropTypes.string,
    content: PropTypes.string,
    filtered_content: PropTypes.string,
    short_filtered_content: PropTypes.string,
    creation_time: PropTypes.string,
    update_time: PropTypes.string,
    publish_time: PropTypes.string,
    is_active: PropTypes.number,
    include_in_recent: PropTypes.number,
    position: PropTypes.number,
    first_image: PropTypes.string,
    featured_image: PropTypes.string,
    featured_img_alt: PropTypes.string,
    featured_list_image: PropTypes.string,
    featured_list_img_alt: PropTypes.string,
    author: AuthorType,
    author_id: PropTypes.number,
    search: PropTypes.string,
    tag_id: PropTypes.number,
    category_id: PropTypes.number,
    tags: tagsType,
    categories: categoriesType,
    page_layout: PropTypes.string,
    layout_update_xml: PropTypes.string,
    custom_theme: PropTypes.string,
    custom_layout: PropTypes.string,
    custom_layout_update_xml: PropTypes.string,
    custom_theme_from: PropTypes.string,
    custom_theme_to: PropTypes.string,
    media_gallery: PropTypes.arrayOf(PropTypes.string),
    secret: PropTypes.string,
    views_count: PropTypes.number,
    is_recent_posts_skip: PropTypes.number,
    short_content: PropTypes.string,
    // ? just ro prevent nesting :(
    related_posts: relatedPostsType,
    related_products: relatedProductsType,
    relatedproduct_id: PropTypes.number,
    comment_total_count: PropTypes.number
});

export const postsType = PropTypes.arrayOf(postType);

export const sidebarItemType = PropTypes.shape({
    data: tagsType,
    dataLength: PropTypes.number,
    isEnabled: PropTypes.bool,
    name: PropTypes.string,
    order: PropTypes.number
});

export const sidebarItemsType = PropTypes.arrayOf(sidebarItemType);

export const postInfoType = PropTypes.shape({
    publishTime: PropTypes.string,
    categories: categoriesType,
    commentsCount: PropTypes.number,
    postUrl: PropTypes.string,
    tags: tagsType,
    author: PropTypes.shape({
        name: PropTypes.string,
        authorUrl: PropTypes.string
    },),
    viewsCount: PropTypes.number
});

export const itemType = PropTypes.shape({
    author_id: PropTypes.number,
    canonical_url: PropTypes.string,
    content: PropTypes.string,
    custom_theme: PropTypes.string,
    custom_theme_from: PropTypes.string,
    custom_theme_to: PropTypes.string,
    featured_image: PropTypes.string,
    featured_img_alt: PropTypes.string,
    featured_list_image: PropTypes.string,
    featured_list_img_alt: PropTypes.string,
    filtered_content: PropTypes.string,
    first_image: PropTypes.string,
    identifier: PropTypes.string,
    is_active: PropTypes.number,
    layout_update_xml: PropTypes.string,
    position: PropTypes.number,
    post_id: PropTypes.number,
    post_url: PropTypes.string,
    publish_time: PropTypes.string,
    short_content: PropTypes.string,
    short_filtered_content: PropTypes.string,
    tag_id: PropTypes.string,
    title: PropTypes.string,
    index: PropTypes.number,
    update_time: PropTypes.string,
    comments_count: PropTypes.number,
    categories: PropTypes.arrayOf(PropTypes.shape({})),
    author: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        author_url: PropTypes.string
    })),
    tags: PropTypes.arrayOf(PropTypes.shape({}))
});
