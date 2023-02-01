import { TreasureTrailsProvider } from '@/components/contexts/TreasureTrailsContext';
import { AppProvider } from '@/components/contexts/AppContext';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <TreasureTrailsProvider>
        <div>
          <Component {...pageProps} />
        </div>
      </TreasureTrailsProvider>
    </AppProvider>
  );
}
