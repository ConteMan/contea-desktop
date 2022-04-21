import koa from 'koa'
import koaBody from 'koa-body'

import router from './router'
import { getStore } from '~/main/store'
import { Socket } from 'net'

async function start(port: number | string | undefined = undefined) {
  try {
    global.koaApp = new koa()
  
    const store = getStore()
    if (!port && store) {
      port = await store.get('server.port', 3333) as number
    }
  
    global.koaApp.use(koaBody())
    global.koaApp.use(router.routes()).use(router.allowedMethods())
  
    global.server = global.koaApp.listen(port)

    global.server.on("connection", socket => {
      if (!global.serverSockets) {
        global.serverSockets = new Set()
      }
      global.serverSockets.add(socket);
        socket.on("close", () => {
          serverSockets.delete(socket);
        });
    });

    return true
  }
  catch(e) {
    return false
  }
}

function destroySockets(sockets: Set<Socket>) {
    for (const socket of sockets.values()) {
        socket.destroy();
    }
}

async function stop() {
  if (global.server) {
    try {
      destroySockets(global.serverSockets)
      await global.server?.close(() => {
        global.server = null
      })
      return true
    }
    catch(e) {
      return false
    }
  } else {
    return false
  }
}


export { start, stop }
