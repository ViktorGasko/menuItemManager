import {  createSlice, current, PayloadAction } from '@reduxjs/toolkit';


export interface MenuState {
  newMenu: any,
  menus: any,
}

const initialState: MenuState = {
  menus: [],
newMenu: {name: '', items: []},
};

export const menuSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addMenu: (state, action: PayloadAction<any>) => {
      if(current(state.menus).filter((menu: any) => menu.name === action.payload).length > 0){
        alert(`Menu named ${action.payload.name} already exists. Choose different name.`)
        return;
      }
        else if( action.payload.length < 3 || action.payload.length > 30){
          alert(`Length must be between 3 and 30 characters`)
          return;
        }
      else{
        state.newMenu.name = action.payload
        state.newMenu.items.map((item :any ) => item['menu'] = action.payload)
        state.menus = [state.newMenu,...state.menus];
        state.newMenu = {name: '', items: []}
      }
    },
    removeMenu: (state, action: PayloadAction<string>) => {
      state.menus = state.menus.filter(({name}: any) => !name.includes(action.payload))
    },

    changeMenusName: (state, action: PayloadAction<any>) =>{
      if(!action.payload.name || action.payload.name === action.payload.oldName){
        return;
      }
      else if(action.payload.name.length < 3 || action.payload.length > 30){
        alert(`Length must be between 3 and 30 characters`)
        return;
      }
      else if(state.menus.some((obj: any) => obj.name === action.payload.name)){
        alert(`Menu with name ${action.payload.name} already exists. Choose different name`)
        return;
      }
      else{
        state.menus[current(state.menus).findIndex(((obj: any) => obj.name === action.payload.oldName))]
        .items.map((item: any) => item.menu = action.payload.name)
        state.menus[current(state.menus).findIndex(((obj: any) => obj.name === action.payload.oldName))].name = action.payload.name
      }
    },

    addItem: (state, action: PayloadAction<any>) => {
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
        menu = current(state.menus).find((obj: any) => { return obj.name === action.payload.menu})
      }else{
        menu = current(state.newMenu)
      }
      if (menu.items.some((e: any) => e.name === action.payload.name)) {
        alert(`Item ${action.payload.name} already exists in this menu. Choose different name.`)
        return;
      }
      else{
        if(action.payload.menu){
          state.menus[current(state.menus).findIndex(((obj: any) => obj.name === action.payload.menu))].items.unshift(action.payload)
        }else{
          state.newMenu.items.unshift(action.payload)
        }
      }
    },

    removeItem: (state, action: PayloadAction<any>) => {
      if(action.payload.menu === ''){
        const arr = state.newMenu.items
        arr.splice(arr.findIndex((item: any) => item.name === action.payload.name),1)
      }else{
        const arr = [...state.menus].find((obj: any) => {return obj.name === action.payload.menu}).items
        arr.splice(arr.findIndex(((item: any) => item.name === action.payload.name)),1)
      }
    },

    changeItem: (state, action: PayloadAction<any>) => {
      if( action.payload.name.length < 3 || action.payload.name.length > 30){
          alert(`Length must be between 3 and 30 characters`)
          return;
      }
      if(action.payload.menu === ''){
        const arr = state.newMenu.items
        if(arr.findIndex((item: any) => item.name === action.payload.name) > -1 && action.payload.name !== action.payload.oldName){
          alert("Item with same name already exists in this menu. Change name.")
          return;
        }
        arr[arr.findIndex((item: any) => item.name === action.payload.oldName)] = 
        {img: action.payload.img, name: action.payload.name, price: action.payload.price, menu: action.payload.menu}
      }else{
        const arr = [...state.menus].find((obj: any) => {return obj.name === action.payload.menu}).items
         if(arr.findIndex((item: any) => item.name === action.payload.name) > -1 && action.payload.name !== action.payload.oldName){
          alert("Item with same name already exists in this menu. Change name.")
          return;
        }
        arr[arr.findIndex(((item: any) => item.name === action.payload.oldName))] = 
        {img: action.payload.img, name: action.payload.name, price: action.payload.price, menu: action.payload.menu}
      }
    }
  },
});

export const { addMenu, removeMenu, addItem, removeItem, changeItem,changeMenusName } = menuSlice.actions;


export default menuSlice.reducer;
