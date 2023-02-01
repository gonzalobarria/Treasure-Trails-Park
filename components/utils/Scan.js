// versi "react-qr-reader" 1.0.0. component API harus disesuaikan dengan yg baru

// import "./styles.css";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false });

export default function Scan({ setId }) {
  const [selected, setSelected] = useState('environment');
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState('');

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
      <h1>Hello CodeSandbox</h1>
      <h2>
        Last Scan:
        {selected}
      </h2>

      <button
        className="bg-red-50"
        onClick={() => {
          setStartScan(!startScan);
          setLoadingScan(false);
        }}
      >
        {startScan ? 'Stop Scan' : 'Start Scan'}
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
            // chooseDeviceId={()=>selected}
            style={{ width: '300px' }}
          />
        </>
      )}
      {loadingScan && <p className="text-3xl">Loading</p>}
      {data !== '' && <p>{data}</p>}
    </div>
  );
}
