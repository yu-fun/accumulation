import { useImperativeHandle } from "react";

export type MenuIntance = {
  getMenus: () => string[];
};

const Menus: React.FC<{
  ref: React.Ref<MenuIntance>;
}> = ({ ref }) => {
  console.log(ref);

  useImperativeHandle(ref, () => ({
    getMenus: () => {
      console.log("getMenus called");
      return ["Menu1", "Menu2", "Menu3"];
    },
  }));

  return <>menus</>;
};

export default Menus;
