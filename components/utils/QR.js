import { QRCode } from 'react-qrcode-logo';

export default function QR({ value }) {
  return (
    <div className='p-8 bg-white'>
      <QRCode
        value={value.toString()}
        logoImage="https://www.gonzalobarria.com/images/logo-gb.jpg"
        eyeRadius={[
          {
            // top/left eye
            outer: [10, 10, 0, 10],
            inner: [10, 10, 0, 10],
          },
          [10, 10, 10, 0], // top/right eye
          [10, 0, 10, 10], // bottom/left
        ]}
      />
    </div>
  );
}
