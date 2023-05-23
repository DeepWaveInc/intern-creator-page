import { Trans, useTranslation } from 'react-i18next'

function CustomTrans(props) {
  const { t, i18n } = useTranslation(props.ns)
  const _props = { ...props, t, i18n }

  return Trans(_props)
}

export default CustomTrans
