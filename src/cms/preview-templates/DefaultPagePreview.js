import React from 'react'
import PropTypes from 'prop-types'
import { DefaultPageTemplate } from '../../templates/default-page'

const DefaultPagePreview = ({ entry, widgetFor }) => (
  <DefaultPageTemplate
    title={entry.getIn(['data', 'title'])}
    subTitle={entry.getIn(['data', 'subTitle'])}
    content={widgetFor('body')}
  />
)

DefaultPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default DefaultPagePreview
