import { IdWidgetControl } from './IdWidgetControl'
import { FileRelationWidgetControl } from './FileRelationWidgetControl'
import { FileRelationPreviewWidgetControl } from './FileRelationPreviewWidgetControl'

const IdWidget = {
  name: 'ncw-id',
  controlComponent: IdWidgetControl,
}

const FileRelationWidget = {
  name: 'ncw-file-relation',
  controlComponent: FileRelationWidgetControl,
  previewComponent: FileRelationPreviewWidgetControl,
}

export { IdWidget, FileRelationWidget }