import axios from "axios"
import { MENU_URL, MENU_UTILISATEUR } from "./Utils/urls"
import * as Icon from 'react-feather'
import { Fragment } from "react"

// ** modèle du menu par défaut
/*
    menu = {
        id: 'menu_id',
        title: 'menu_title',
        icon: 'menu_icon',
        navLink: 'menu_link',
        children: menu[]
    }
*/    

const menuList = async () => {
    console.log(" MENU_UTILISATEUR ", MENU_UTILISATEUR)
    return await axios.get(MENU_UTILISATEUR)
}

const menuRender = (menuList) => {
    let menu = []
    //console.log(menuList)
    for (const menuData of menuList) {
        let icon =  <Fragment/>

        if (menuData.icon !== '') {
            const MenuIcon = Icon[menuData.icon]
            icon = <MenuIcon size={10} />
        }

        const newMenuData = {
            id: menuData.menu_new_id,
            title: menuData.libelle,
            icon,
            navLink: menuData.lien,
            lien_old: menuData.lien_old,
            destination: menuData.destination
        }
        
        if (menuData.children?.length > 0) {
            newMenuData.children = menuRender(menuData.children)
        }

        menu = [
            ...menu,
            newMenuData
        ]
    }

    return menu
}

const allMenu = async() => {
    const res = await axios.get(`${MENU_URL}`)

    return res.data
}

const addMenu = async (data) => {
    const res = await axios.post(`${MENU_URL}`, {
        data
    })

    return res.data
}

const editMenu = async(id, data) => {
    const res = await axios.put(`${MENU_URL}`, {
        id,
        data
    })

    return res.data
}

const deleteMenu = async(id) => {
    const res = await axios.delete(`${MENU_URL}`, {
        params: {
            id
        }
    })

    return res.data
}

const orderMenus = async (menus) => {
    const res = await axios.post(`${MENU_URL}/order`, {
        menus
    })

    return res.data
}

const menuEntity = async (poste_id, utilisateur_id) => {
    const res = await axios.get(`${MENU_URL}/active`, {
        params: {
            poste_id,
            utilisateur_id
        }
    })

    return res.data
}

const saveMenuEntity = async (menus, poste_id, utilisateur_id) => {
    const res = await axios.post(`${MENU_URL}/save`, {
        menus,
        poste_id,
        utilisateur_id
    })

    return res.data
}

const resetToMenuPoste = async (utilisateur_id) => {
    const res = await axios.post(`${MENU_URL}/reset`, {
        utilisateur_id
    })

    return res.data
}

const menuForUser = async () => {
    const res = await axios.get(`${MENU_URL}/for/user`)
    return res.data
}

const allMenuNotTree = async () => {
    const res = await axios.get(`${MENU_URL}/all`)
    return res.data
}

export default { 
    menuList,
    menuRender,
    addMenu,
    allMenu,
    editMenu,
    deleteMenu,
    orderMenus,
    menuEntity,
    saveMenuEntity,
    resetToMenuPoste,
    menuForUser,
    allMenuNotTree
}