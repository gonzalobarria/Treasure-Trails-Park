import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false });

export default function Scan({ setId, setOpenCamera }) {
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
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>
        Last Scan:
        {selected}
      </h2>

      <button
        className=""
        onClick={() => {
          setStartScan(!startScan);
          setLoadingScan(false);
          setOpenCamera(false);
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
      {loadingScan && <p className="text-3xl">Loading</p>}
      {data !== '' && <p>{data}</p>}
    </div>
  );
}
