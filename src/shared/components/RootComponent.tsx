import { Outlet } from '@tanstack/react-router';
import Menu from './Menu';

export function RootComponent() {
  return (
    <>
      <Menu />
      <hr />
      <div className="max-w-[1400px] m-auto">
        <Outlet />
      </div>
    </>
  );
}
