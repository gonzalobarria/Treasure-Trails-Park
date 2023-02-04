import { TreasureTrailsProvider } from '@/components/contexts/TreasureTrailsContext';
import { AppProvider } from '@/components/contexts/AppContext';
import { Toaster } from 'react-hot-toast';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <TreasureTrailsProvider>
        <Component {...pageProps} />
        <Toaster />
      </TreasureTrailsProvider>
    </AppProvider>
  );
}
