import React, { useState, useEffect, useCallback } from 'react'
import Select from 'react-select'
import { fromJS, List } from 'immutable'
import { reactSelectStyles } from 'decap-cms-ui-default/dist/esm/styles'
import { stringTemplate } from 'decap-cms-lib-widgets'

const createLabel = ({ fieldDisplay, item }) => {
  return fieldDisplay.map(field => item[field]).filter(v => v).join(' ')
}

export const FileRelationWidgetControl = ({
  loadEntry,
  field,
  onChange,
  value,
  forID,
  classNameWrapper,
  setActiveStyle,
  setInactiveStyle,
}) => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    const loadOptions = async () => {
      const collection = field.get('collection')
      const file = field.get('file')
      const fieldName = field.get('target_field')
      const fieldId = field.get('id_field')
      const labelTemplate = field.get('display_summary')

      let fieldDisplay = List([fieldId])
      if (!labelTemplate) {
        const rawFieldDisplay = field.get('display_fields')
        if (typeof rawFieldDisplay === 'string') {
          fieldDisplay = List([rawFieldDisplay])
        } else if (List.isList(rawFieldDisplay)) {
          fieldDisplay = rawFieldDisplay
        }
      }

      const results = await loadEntry(collection, file)
      const data = Array.isArray(results.data?.[fieldName]) ? results.data[fieldName] : []

      const newOptions = data.map(option => {
        let optionValue, label

        if (typeof option === 'string') {
          optionValue = label = option
        } else {
          optionValue = option[fieldId]
          label = labelTemplate
            ? stringTemplate.compileStringTemplate(labelTemplate, null, null, fromJS(option))
            : createLabel({ item: option, fieldDisplay })
        }

        return { value: optionValue, label }
      })
      setOptions(newOptions)
    }

    loadOptions()
  }, [loadEntry, field])

  const changeHandle = useCallback((selected) => {
    if (!selected) onChange([])
    const newValue = Array.isArray(selected) ? selected : [selected]
    onChange(fromJS(newValue))
  }, [onChange])

  const getSelectedValue = useCallback((
    currentValue,
    currentOptions
  ) => {
    let selected = []
    if (!currentValue) return selected
    else if (typeof currentValue === 'string') {
      const maybeOption = currentOptions.find(option => option.value === currentValue)
      selected = maybeOption ? [maybeOption] : []
    }
    else selected = currentValue?.toJS ? currentValue.toJS() : null
    return selected
  }, [])

  const selected = getSelectedValue(value, options)
  const isMultiple = field.get('multiple')
  const placeholder = field.get('placeholder') || 'select...'

  return (
    <div>
      <Select
        inputId={forID}
        isMulti={isMultiple}
        onChange={changeHandle}
        className={classNameWrapper}
        onFocus={setActiveStyle}
        onBlur={setInactiveStyle}
        styles={reactSelectStyles}
        name="categories"
        isClearable={true}
        value={selected}
        options={options}
        placeholder={placeholder}
      />
    </div>
  )
}
