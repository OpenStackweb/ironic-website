import React from 'react'
import { Map } from 'immutable'

export const FileRelationPreviewWidgetControl = ({ value }) => {
  if (typeof value === 'undefined') return null

  const display = value
    .map(v => (Map.isMap(v)) ? v.get('label') : v)
    .filter(v => v)
    .join(', ')

  return <p>{display}</p>
}