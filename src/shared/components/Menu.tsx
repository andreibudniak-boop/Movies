import { Link as RouterLink } from '@tanstack/react-router';
import * as React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/shared/components/ui/navigation-menu';
import GradientLogo from './icons/GradientLogo';

const movies: { title: string; to: string }[] = [
  {
    title: 'Популярное',
    to: '/movie',
  },
  {
    title: 'Сейчас игарет',
    to: '/movie/now-playing',
  },
  {
    title: 'Скоро выйдет',
    to: '/movie/upcoming',
  },
  {
    title: 'Лучшие',
    to: '/movie/top-rated',
  },
];

const tvs: { title: string; to: string }[] = [
  {
    title: 'Популярное',
    to: '/tv',
  },
  {
    title: 'В эфире сегодня',
    to: '/tv/airing-today',
  },
  {
    title: 'По телевидению ',
    to: '/tv/on-the-air',
  },
  {
    title: 'Лучшие',
    to: '/tv/top-rated',
  },
];

function ListItem({
  title,
  href,
  ...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <RouterLink to={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
          </div>
        </RouterLink>
      </NavigationMenuLink>
    </li>
  );
}
export default function Menu() {
  return (
    <div className="max-w-[1600px] mx-auto flex justify-between items-center py-2">
      <div className="flex items-center">
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <RouterLink to="/">
                <GradientLogo
                  width={130}
                  height={26}
                  className="mr-2 transition-all duration-200 hover:opacity-80 hover:scale-102 hover:drop-shadow-lg"
                />
              </RouterLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="hidden md:flex relative">
              <NavigationMenuTrigger>Фильмы</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-1 lg:w-[200px]">
                  {movies.map((movie) => (
                    <ListItem key={movie.title} title={movie.title} href={movie.to} />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="hidden md:flex relative">
              <NavigationMenuTrigger>Сериалы</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-1 lg:w-[200px]">
                  {tvs.map((tv) => (
                    <ListItem key={tv.title} title={tv.title} href={tv.to} />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center">
        <h2>profile</h2>
      </div>
    </div>
  );
}
