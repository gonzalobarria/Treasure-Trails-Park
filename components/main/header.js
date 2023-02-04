import { useContext } from 'react';
import { TreasureTrailsContext } from '../contexts/TreasureTrailsContext';
import DropDownMenu from './menu';

export default function Header() {
  const { credits } = useContext(TreasureTrailsContext);
  const menuMovil = {
    menu: [
      { glosa: 'Challenges', url: '/challenges' },
      { glosa: 'Restaurant', url: '/restaurant' },
      { glosa: 'Shop', url: '/shop' },
    ],
  };

  return (
    <div className="fixed inset-x-0 top-0 z-40 flex items-center w-full bg-white/90 h-14 drop-shadow-lg">
      <p className="w-full mx-3 text-xl font-semibold text-right">
        {credits.toString()} Credits
      </p>
      <DropDownMenu options={menuMovil} />
    </div>
  );
}
