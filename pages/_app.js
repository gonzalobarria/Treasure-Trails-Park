import { TreasureTrailsProvider } from '@/components/contexts/TreasureTrailsContext';
import { AppProvider } from '@/components/contexts/AppContext';
import { Toaster } from 'react-hot-toast';
import '@/styles/globals.css';
import ParkLayout from '@/components/layouts/park';

export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <TreasureTrailsProvider>
        <ParkLayout>
          <Component {...pageProps} />
          <Toaster />
        </ParkLayout>
      </TreasureTrailsProvider>
    </AppProvider>
  );
}
