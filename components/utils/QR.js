import { QRCode } from 'react-qrcode-logo';

export default function QR({ value }) {
  return (
    <div className="p-8 bg-white md:p-12 rounded-xl">
      <QRCode
        value={value.toString()}
        logoImage="/images/logo-ttp.jpg"
        logoWidth={50}
        size={200}
        eyeRadius={[
          {
            // top/left eye
            outer: [10, 10, 0, 10],
            inner: [10, 10, 0, 10],
          },
          [10, 10, 10, 0], // top/right eye
          [10, 0, 10, 10], // bottom/left
        ]}
        eyeColor={[
          {
            // top/left eye
            outer: '#9f0b90',
            inner: '#4c4257',
          },
          {
            // top/left eye
            outer: '#9f0b90',
            inner: '#4c4257',
          },
          {
            // top/left eye
            outer: '#9f0b90',
            inner: '#4c4257',
          },
        ]}
      />
    </div>
  );
}
