import DeviceIcon from './assets/icons/device-icon'
import HouseIcon from './assets/icons/house-icon'
import pageListAdmin from './helpers/page/admin'

export const ADMIN_SIDE_BAR_MENU = [
  {
    key: '1',
    label: '企業/団体',
    to: pageListAdmin.adminHome.url,
    icon: <HouseIcon />,
  },
  {
    key: '2',
    label: 'デバイス',
    to: pageListAdmin.device.url,
    icon: <DeviceIcon />,
  },
]
