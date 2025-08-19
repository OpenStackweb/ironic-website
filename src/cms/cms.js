import CMS from 'decap-cms-app'

import DefaultPagePreview from './preview-templates/DefaultPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'

import { FileRelationWidget, IdWidget } from '../widgets'

CMS.registerWidget(IdWidget)
CMS.registerWidget(FileRelationWidget)

CMS.registerPreviewStyle('style/styles.scss');

CMS.registerPreviewTemplate('indexPage', IndexPagePreview)
CMS.registerPreviewTemplate('pages', DefaultPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)