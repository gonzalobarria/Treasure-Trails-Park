import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import { TreasureTrailsContext } from '../contexts/TreasureTrailsContext';
import DropDownMenu from './menu';

export default function Header() {
  const { account } = useContext(AppContext);
  const { credits, isLoading, hasValidTicket, isOwner } = useContext(
    TreasureTrailsContext
  );
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      const theMenu = {
        menu: [
          { glosa: 'Challenges', url: '/challenges' },
          { glosa: 'Attractions', url: '/attractions' },
          { glosa: 'Restaurant', url: '/restaurant' },
          { glosa: 'Store', url: '/store' },
        ],
      };
      if (isOwner) theMenu.menu.push({ glosa: 'Admin', url: '/admin' });

      setMenu(theMenu);
    }
  }, [isLoading, isOwner]);

  return account ? (
    <div className="fixed inset-x-0 top-0 z-40 flex items-center w-full bg-white/90 h-14 drop-shadow-lg">
      <p className="w-full mx-3 text-xl font-semibold text-right text-[#180e30]">
        {credits.toString()} Credits
      </p>
      {!isLoading && (hasValidTicket || isOwner) && menu && (
        <DropDownMenu options={menu} />
      )}
    </div>
  ) : null;
}
