import QRCode from './QRCode'

export default {
  title: 'component/Modal/QRCode',
  component: QRCode
}

const Template = () => {
  return <QRCode isOpen={true} />
}

export const Default = Template.bind({})

Default.storyName = 'Default'
Default.args = {}
