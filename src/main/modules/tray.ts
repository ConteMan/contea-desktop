import path from 'path'
import { Tray } from 'electron'

export function trayInit() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tray = new Tray(path.join(__dirname, '../public/images/logo_16.png'))
}
