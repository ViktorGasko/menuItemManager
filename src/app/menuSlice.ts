import {  createSlice, current, PayloadAction } from '@reduxjs/toolkit';

export type MenuType = {
  name: string, items: ItemType[]
}

export type ItemType = {
  name: string, price: string, img: string, menu: string
}

interface MenuState {
  newMenu: MenuType,
  menus: MenuType[],
}

const initialState: MenuState = {
  menus: [],
  newMenu: {name: '', items: []},
};

export const menuSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addMenu: (state, action: PayloadAction<string>) => {
      if(current(state.menus).filter((menu) => menu.name === action.payload).length > 0){
        alert(`Menu named ${action.payload} already exists. Choose different name.`)
        return;
      }
        else if( action.payload.length < 3 || action.payload.length > 30){
          alert(`Length must be between 3 and 30 characters`)
          return;
        }
      else{
        state.newMenu.name = action.payload
        state.newMenu.items.map((item  ) => item['menu'] = action.payload)
        state.menus = [state.newMenu,...state.menus];
        state.newMenu = {name: '', items: []}
      }
    },
    removeMenu: (state, action: PayloadAction<string>) => {
      state.menus = state.menus.filter(({name}) => !name.includes(action.payload))
    },

    changeMenusName: (state, action: PayloadAction<{name: string, oldName: string}>) =>{
      if(!action.payload.name || action.payload.name === action.payload.oldName){
        return;
      }
      else if(action.payload.name.length < 3 || action.payload.name.length > 30){
        alert(`Length must be between 3 and 30 characters`)
        return;
      }
      else if(state.menus.some((menu) => menu.name === action.payload.name)){
        alert(`Menu with name ${action.payload.name} already exists. Choose different name`)
        return;
      }
      else{
        state.menus[current(state.menus).findIndex(((menu) => menu.name === action.payload.oldName))]
        .items.map((item) => item.menu = action.payload.name)
        state.menus[current(state.menus).findIndex(((menu) => menu.name === action.payload.oldName))].name = action.payload.name
      }
    },

    addItem: (state, action: PayloadAction<ItemType>) => {
      if(!action.payload.name || !action.payload.price || !action.payload.img){
        alert('Choose image and fill all fields.')
        return;
      }
      else if( action.payload.name.length < 3 || action.payload.name.length > 30){
          alert(`Length must be between 3 and 30 characters`)
          return;
      }
      let menu 
      if(action.payload.menu){
        menu = current(state.menus).find((menu) => { return menu.name === action.payload.menu})
      }else{
        menu = current(state.newMenu)
      }
      if (menu?.items.some((item) => item.name === action.payload.name)) {
        alert(`Item ${action.payload.name} already exists in this menu. Choose different name.`)
        return;
      }
      else{
        if(action.payload.menu){
          state.menus[current(state.menus).findIndex(((menu) => menu.name === action.payload.menu))].items.unshift(action.payload)
        }else{
          state.newMenu.items.unshift(action.payload)
        }
      }
    },

    removeItem: (state, action: PayloadAction<{name: string, menu: string}>) => {
      if(action.payload.menu === ''){
        const arr = state.newMenu.items
        arr.splice(arr.findIndex((item) => item.name === action.payload.name),1)
      }else{
        const arr = [...state.menus].find((menu) => {return menu.name === action.payload.menu})!.items
        arr.splice(arr.findIndex(((item) => item.name === action.payload.name)),1)
      }
    },

    changeItem: (state, action: PayloadAction<{name: string, price: string, img: string, menu: string, oldName: string}>) => {
      if(!action.payload.name || !action.payload.price || !action.payload.img){
        alert('Please fill all fields and set image')
        return;
      }
      if( action.payload.name.length < 3 || action.payload.name.length > 30){
          alert(`Length must be between 3 and 30 characters`)
          return;
      }
      if(action.payload.menu === ''){
        const arr = state.newMenu.items
        if(arr.findIndex((item) => item.name === action.payload.name) > -1 && action.payload.name !== action.payload.oldName){
          alert("Item with same name already exists in this menu. Change name.")
          return;
        }
        arr[arr.findIndex((item) => item.name === action.payload.oldName)] = 
        {img: action.payload.img, name: action.payload.name, price: action.payload.price, menu: action.payload.menu}
      }else{
        const arr = [...state.menus].find((menu) => {return menu.name === action.payload.menu})!.items
         if(arr.findIndex((item) => item.name === action.payload.name) > -1 && action.payload.name !== action.payload.oldName){
          alert("Item with same name already exists in this menu. Change name.")
          return;
        }
        arr[arr.findIndex(((item) => item.name === action.payload.oldName))] = 
        {img: action.payload.img, name: action.payload.name, price: action.payload.price, menu: action.payload.menu} 
      }
    }
  },
});

export const { addMenu, removeMenu, addItem, removeItem, changeItem,changeMenusName } = menuSlice.actions;


export default menuSlice.reducer;
