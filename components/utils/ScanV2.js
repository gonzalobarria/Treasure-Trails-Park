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
    console.log('data :>> ', data);
    if (data !== '') {
      console.log('seteando id');
      setId(data);
    }
  }, [data]);

  const handleScan = async (scanData) => {
    setLoadingScan(true);
    console.log(`loaded data data`, scanData);
    if (scanData && scanData !== '') {
      console.log(`loaded >>>`, scanData);
      setData(scanData);
      setStartScan(false);
      setLoadingScan(false);
      // setPrecScan(scanData);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };
  return (
    <div className="App">
      <button
        className=""
        onClick={() => {
          setStartScan(!startScan);
          setLoadingScan(false);
          setOpenCamera();
        }}
      >
        Cancel Scan
      </button>
      {startScan && (
        <>
          <select onChange={(e) => setSelected(e.target.value)}>
            <option value={'environment'}>Back Camera</option>
            <option value={'user'}>Front Camera</option>
          </select>
          <QrReader
            facingMode={selected}
            delay={1000}
            onError={handleError}
            onScan={handleScan}
            chooseDeviceId={() => selected}
            style={{ width: '500px' }}
          />
        </>
      )}
    </div>
  );
}
