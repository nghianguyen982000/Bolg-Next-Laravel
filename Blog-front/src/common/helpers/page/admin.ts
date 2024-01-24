import { PageStaticList } from './type'
const pageListAdmin: PageStaticList = {
  adminHome: {
    text: '企業/団体一覧',
    url: '/admin',
  },
  createComapny: {
    text: '契約企業/団体の新規登録',
    url: '/admin/company/create',
  },
  device: {
    text: 'デバイス一覧',
    url: '/admin/devices',
  },
  plan: {
    text: 'サービスプラン一覧',
    url: '/admin/plans',
  },
}
export default pageListAdmin

export const pageDynamicList = {
  adminCompanyDetail: (id: number) => `/admin/company/update/${id}`,
}
