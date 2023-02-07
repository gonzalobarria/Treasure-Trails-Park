import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { TreasureTrailsContext } from '../contexts/TreasureTrailsContext';
import DropDownMenu from './menu';

export default function Header() {
  const { account } = useContext(AppContext);
  const { credits } = useContext(TreasureTrailsContext);
  const menuMovil = {
    menu: [
      { glosa: 'Challenges', url: '/challenges' },
      { glosa: 'Restaurant', url: '/restaurant' },
      { glosa: 'Store', url: '/store' },
      { glosa: 'Attractions', url: '/attractions' },
    ],
  };

  return account ? (
    <div className="fixed inset-x-0 top-0 z-40 flex items-center w-full bg-white/90 h-14 drop-shadow-lg">
      <p className="w-full mx-3 text-xl font-semibold text-right text-[#180e30]">
        {credits.toString()} Credits
      </p>
      <DropDownMenu options={menuMovil} />
    </div>
  ) : null;
}
