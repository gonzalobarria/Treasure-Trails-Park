import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false });

export default function ScanV2({ setId, setOpenCamera }) {
  const [selected, setSelected] = useState('environment');
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState('');

  useEffect(() => {
    setStartScan(!startScan);
    setLoadingScan(false);
  }, []);

  useEffect(() => {
    if (data !== '') setId(data);
  }, [data]);

  const handleScan = async (scanData) => {
    setLoadingScan(true);
    if (scanData && scanData !== '') {
      setData(scanData);
      setStartScan(false);
      setLoadingScan(false);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };
  return (
    <div className="text-center">
      {startScan && (
        <QrReader
          facingMode={selected}
          delay={1000}
          onError={handleError}
          onScan={handleScan}
          chooseDeviceId={() => selected}
          style={{ width: '450px' }}
        />
      )}

      <button
        className="mt-6 text-white bg-gradient-to-br from-green-400 to-purple-600 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-md px-4 py-1.5 text-center"
        onClick={() => {
          setStartScan(!startScan);
          setLoadingScan(false);
          setOpenCamera();
        }}
      >
        Close
      </button>
    </div>
  );
}
