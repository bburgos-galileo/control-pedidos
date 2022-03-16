const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const path = require('path');

// main window
let mainWindow = null

app.on('ready', () => {
    // don't show the main window
    mainWindow = new BrowserWindow({
        show: false,
        minimizable: false, 
        maximizable: false, 
        resizable: false,
        title: 'Pedidos',        
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        },
    });

    // load index.html on the main window
    mainWindow.loadURL(`file://${__dirname}/render.html`)

    // when the app is ready, the main window is showed
    mainWindow.once('ready-to-show', async () => {
        mainWindow.show()
        //list_users()
    })

    // close the app
    mainWindow.on('closed', () => {
        mainWindow = null
    })

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTempale)
    // Insert Menu
    Menu.setApplicationMenu(mainMenu);

})

// menu items
// create menu template 
const mainMenuTempale = [
    {
        label: 'Mantenimiento',
        submenu: [
            {
                label: 'Empleados',
                click() {
                    mainWindow.setMenuBarVisibility(false)
                    mainWindow.loadURL(`file://${__dirname}/componentes/empleados.html`)
                }
            },
            {
                label: 'Productos',
                click() {
                    mainWindow.setMenuBarVisibility(false)
                    mainWindow.loadURL(`file://${__dirname}/componentes/productos.html`)
                }
            },
            {
                label: 'Salir',
                click() {
                    app.quit()
                }
            }
        ]
    },
    {
        label: 'Procesos',
        submenu: [
            {
                label: 'Pedidos',
                click() {
                    mainWindow.loadURL(`file://${__dirname}/componentes/pedidos.html`)
                }
            }
        ]
    }
]

ipcMain.on('go-index', async () => {
    mainWindow.loadURL(`file://${__dirname}/render.html`)
    mainWindow.setMenuBarVisibility(true);
})

ipcMain.on('iu-producto', async () => {

    const child = new BrowserWindow({
        width: 600,
        height: 450, 
        minimizable: false, 
        maximizable: false, 
        resizable: false,
        title: 'Productos',
        movable: false,
        parent: mainWindow, 
        modal: true
    })

    // when the app is ready, the modal window is showed
    child.once('ready-to-show', async () => {
        child.show()
        //list_users()
    });

    child.setMenuBarVisibility(false);

    child.loadURL(`file://${__dirname}/componentes/productoIU.html`)

})

ipcMain.on('iu-empleado', async () => {

    const child = new BrowserWindow({
        width: 600,
        height: 450, 
        minimizable: false, 
        maximizable: false, 
        resizable: false,
        title: 'Empleados',
        movable: false,
        parent: mainWindow, 
        modal: true
    })

    // when the app is ready, the modal window is showed
    child.once('ready-to-show', async () => {
        child.show()
        //list_users()
    });

    child.setMenuBarVisibility(false);

    child.loadURL(`file://${__dirname}/componentes/empleadoIU.html`)

})

ipcMain.on('iu-pedido', async () => {

    const child = new BrowserWindow({
        width: 700,
        height: 400, 
        minimizable: false, 
        maximizable: false, 
        resizable: false,
        title: 'Pedidos',
        movable: false,
        parent: mainWindow, 
        modal: true
    })

    // when the app is ready, the modal window is showed
    child.once('ready-to-show', async () => {
        child.show()
        //list_users()
    });

    child.setMenuBarVisibility(false);

    child.loadURL(`file://${__dirname}/componentes/pedidosIU.html`)

})