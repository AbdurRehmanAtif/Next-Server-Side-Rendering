"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Data from "@/app/components/sidebars/dataSource";// Assuming Data contains your menu items

interface MenuItem {
  key: number;
  text: string;
  isSubmenu: boolean;
  submenuOptions?: any;
}

export interface drawerState {
  [drawers.mobile]: boolean;
  [drawers.profile]: boolean;
  [drawers.cart]: boolean;
  [drawers.wishlist]: boolean;
}

export enum drawers {
  mobile = "mobile",
  profile = "profile",
  cart = "cart",
  wishlist = "wishlist",
}

interface MenuContextType {
  isSliderToggle: drawerState;
  setSliderToggle: React.Dispatch<React.SetStateAction<drawerState>>;
  isNaveOpen: boolean;
  openNav: (text: string) => void;
  closeNav: () => void;
  navData: MenuItem[];
  toggleDrawer: any
}

interface MenuProviderProps {
  children: ReactNode;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const useMenuContext = (): MenuContextType => {

  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const MenuProvider = ({ children }: MenuProviderProps): JSX.Element => {

  const [navData, setNavData] = useState<any>();
  const [isNaveOpen, toggleNav] = useState(false);

  const [isSliderToggle, setSliderToggle] = useState({
    [drawers.mobile]: false,
    [drawers.profile]: false,
    [drawers.cart]: false,
    [drawers.wishlist]: false,
  });


  const toggleDrawer = (type: drawers) => {

    setSliderToggle(prevState => ({
      ...prevState,
      [type]: !prevState[type],
    }));

    // console.log(type)
    // console.log(isSliderToggle[type])
    // console.log(type)
  }

  const openNav = (value: string) => {
    toggleNav(true)
    setNavData(findSubMenuOptions(value))
  };

  const closeNav = () => {
    toggleNav(false)
  };

  const contextValue: MenuContextType = {
    isSliderToggle,
    setSliderToggle,
    isNaveOpen,
    openNav,
    closeNav,
    navData: Data,
    toggleDrawer
  };


  const findSubMenuOptions = (key: string): { text: string; value: string }[] | undefined => {
    const menuItem = Data.find(item => item.text === key && item.isSubmenu);
    return menuItem?.submenuOptions;
  };

  return (
    <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
  );
};
