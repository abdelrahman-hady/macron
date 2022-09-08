/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { Field } from 'Util/Query';

/** @namespace Scandiweb/MagefanBlog/Query/BlogPathValidity/Query/BlogPathValidityQuery */
export class BlogPathValidityQuery {
    getPathValidity(path) {
        return new Field('sw_blogPath')
            .addArgument('path', 'String', path)
            .addFieldList(this.getPathFields());
    }

    getPathFields() {
        return [
            'id',
            'type',
            this.getDetailsField()
        ];
    }

    getDetailsField() {
        return new Field('details')
            .addFieldList([
                'title',
                'content',
                'meta_title',
                'meta_keywords',
                'meta_description',
                'og_title',
                'og_description',
                'og_img',
                'og_type',
                this.getBreadcrumbsField()
            ]);
    }

    getBreadcrumbsField() {
        return new Field('breadcrumbs')
            .addFieldList([
                'category_name',
                'category_url_path',
                'category_level'
            ]);
    }
}

export default new BlogPathValidityQuery();
