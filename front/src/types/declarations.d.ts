declare module '*.png'
declare module '*.svg'

interface hydraPagination {
  totalPages: number | string
  page: number | string
  lastPage: number | string
  nextPage: number | string
  previous: number | string
}

interface HydraView {
  '@id': string
  'hydra:first': string
  'hydra:last': string
  'hydra:next': string
  'hydra:previous': string
}

interface Hydra {
  'hydra:totalItems': number
  'hydra:view': HydraView
}

interface ApiResponse {
  message: string
  status: 'success' | 'error'
}

interface IMediaObject {
  '@id': string
  id: number
  file: File
  source: 'product' | 'category' | 'notification'
  filePath: string
  createdAt: string
}

interface IURL {
  LINK: string
  LABEL: string
  ICON: JSX.Element
  FOR_AGENT: boolean
  SHOW_IN_PROFILE_MENU: boolean
  SHOW_IN_HEADER: boolean
  WITH_BADGE: boolean
}

interface GlobalSettings {
  erp: string
  api: string
  username: string
  password: string
  host: string
  usernameFtp: string
  passwordFtp: string
  db: string
  imageState: string
  title: string
  description: string
  primaryColor: string
  secondaryColor: string
  isWithStock: string
  isWithMigvan: string
  email: string
  phone: string
  fax: string
  location: string
  footerDescription1: string
  footerDescription2: string
  footerDescription3: string
  oneSignalApi: string
  oneSignalKey: string
  smsApi: string
  smsToken: string

  minimumPrice: number
  deliveryPrice: number
}

declare global {
  interface Window {
    settings: GlobalSettings
  }
}
const settings: GlobalSettings = window.settings
