'use client';

import * as React from 'react';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

export function Filters() {
  const [position, setPosition] = React.useState('');

  // 'popularity.asc',
  //   'popularity.desc',
  //   'revenue.asc',
  //   'revenue.desc',

  return (
    <div className="w-[260px]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
              <DropdownMenuRadioItem value="popularity.asc">
                Популярности(возрастание)
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="popularity.desc">
                Популярности(убвыанеи)
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="revenue.asc">revenue.asc</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="revenue.desc">revenue.desc</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
