import React, { useCallback, useEffect, useRef } from 'react'
import shortid from 'shortid'

export const IdWidgetControl = ({
  field,
  onChange,
  value,
  forID,
  classNameWrapper,
  setActiveStyle,
  setInactiveStyle
}) => {
  const inputRef = useRef()

  const generateId = useCallback(() => {
    const usePrefix = field?.get('prefix')
    const usePostfix = field?.get('postfix')
    const useTimestamp = field?.get('timestamp')

    const prefix = usePrefix ? usePrefix + '-' : ''
    const timestamp = useTimestamp ? Date.now() + '-' : ''
    const postfix = usePostfix ? '-' + usePostfix : ''

    const id = prefix + timestamp + shortid() + postfix

    onChange(id)
  }, [field, onChange])

  // Effect para generar ID inicial si no hay valor
  useEffect(() => {
    if (!value) {
      generateId()
    }
  }, [value, generateId])

  // Effect para manejar campos ocultos (reemplaza componentDidMount)
  useEffect(() => {
    if (!field?.get('hidden') || !inputRef.current) return

    const $container = inputRef.current.parentElement
    $container.style.display = 'none'

  }, [field])

  return (
    <input
      ref={inputRef}
      type='text'
      className={classNameWrapper}
      style={{
        color: '#cdcdcd',
      }}
      value={value || ''}
      id={forID}
      onFocus={setActiveStyle}
      onBlur={setInactiveStyle}
      disabled
    />
  )
}
