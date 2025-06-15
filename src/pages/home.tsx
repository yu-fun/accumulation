import { useEffect, useRef, useState } from 'react';
import Menus, { type MenuIntance } from '../components/menu';
import MyComponent from '../components/MyComponent';
import withRef from '../components/WithRef';
import SimpleControlledComponent from '../components/SimpleControlledComponent';
const WithMeuns = withRef(Menus);
const Home = () => {
  const menusRef = useRef<MenuIntance>(null);
  const [menus, setMenus] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem('data', 'Hello, World!');
    setMenus(menusRef.current?.getMenus() || []);

    // fetch("https://jsonplaceholder.typicode.com/posts/10", {
    // fetch("/api/post", {
    //   method: "post",
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   });
  }, []);
  return (
    <>
      <MyComponent />
      {menus.map((menu, index) => (
        <div key={index}>{menu}</div>
      ))}
      <Menus ref={menusRef} /> home
      <WithMeuns />
      <SimpleControlledComponent />
    </>
  );
};

export default Home;
