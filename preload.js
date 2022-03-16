const { ipcRenderer, contextBridge } = require('electron')
contextBridge.exposeInMainWorld(
    'comunicacion',
    {
        regresar: () => ipcRenderer.send('go-index'),
        mostrarProducto: () => ipcRenderer.send('iu-producto'),
        mostrarEmpleado: () => ipcRenderer.send('iu-empleado'),
        mostrarPedido: () => ipcRenderer.send('iu-pedido')
    });

