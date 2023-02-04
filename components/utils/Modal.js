import ScanV2 from './ScanV2';

export default function Modal({ showModal, toggleModal, setId }) {
  return (
    <>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-auto max-w-3xl mx-auto my-6">
              <ScanV2 setId={setId} setOpenCamera={toggleModal} />
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black/75"></div>
        </>
      ) : null}
    </>
  );
}
