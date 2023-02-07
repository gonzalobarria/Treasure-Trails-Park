import { useContext, useState } from 'react';
import { TreasureTrailsContext } from '../contexts/TreasureTrailsContext';
import Modal from '../utils/Modal';
import { notify } from '../utils/Toaster';

export default function Items({
  openCamera,
  setActivityIndex,
  title,
  setOpenCamera,
  arrayItems,
  action,
}) {
  const { activities, credits } = useContext(TreasureTrailsContext);
  const [menuAdded, setMenuAdded] = useState([]);
  const [total, setTotal] = useState(0);

  const addIt = (t, i) => {
    const price = parseInt(t.discountCredits.toString());
    if (total + price > credits) {
      notify({
        title: 'No more Credits',
        msg: "You don't have enough credits to buy this item",
        type: 'error',
      });

      return;
    }

    setMenuAdded((m) => [...m, i]);
    setTotal((total) => (total += price));

    notify({
      title: 'Item added',
      msg: 'Item added successfully to the cart',
      type: 'info',
    });
  };

  const removeIt = (t, i) => {
    setMenuAdded((m) => menuAdded.filter((ma) => ma !== i));
    setTotal((total) => (total -= parseInt(t.discountCredits.toString())));

    notify({
      title: 'Item removed',
      msg: 'Item removed successfully from the cart',
      type: 'info',
    });
  };

  const payForIt = async () => {
    if (menuAdded.length === 0) {
      notify({
        title: 'Empty Cart',
        msg: 'You need to add an item to the cart',
        type: 'error',
      });
      return;
    }

    try {
      await action(menuAdded);
      setMenuAdded([]);
      setTotal(0);
    } catch (error) {}
  };

  return (
    <>
      {openCamera ? (
        <div className="w-full h-screen">
          <Modal
            setId={setActivityIndex}
            showModal={openCamera}
            toggleModal={() => setOpenCamera(false)}
          />
        </div>
      ) : (
        <div className="glass">
          <div className="pb-8 text-center">
            <h1>{title}</h1>
          </div>
          {arrayItems.length === 0 ? (
            <div className="text-center">
              <button
                className="text-white bg-gradient-to-br from-green-400 to-purple-600 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-md px-4 py-1.5 text-center"
                onClick={() => setOpenCamera(true)}
              >
                Scan {title}
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 ">
                {activities.map((t, i) => {
                  if (t.isActive && arrayItems?.includes(i))
                    return (
                      <div
                        key={t.name}
                        className="w-full px-5 py-4 rounded-lg bg-white/70 "
                      >
                        <div className="grid content-between h-full">
                          <div className="pb-3">
                            <h2 className="pb-2 font-bold">{t.name}</h2>

                            <div className="flex flex-row justify-between pb-2">
                              <p className="text-lg">
                                {t.description.toString()}
                              </p>
                            </div>
                          </div>
                          <div className="relative flex justify-between w-full pt-5 text-right">
                            <div className="absolute bottom-0">
                              {t.discountCredits.toString()} Credits
                            </div>
                            <div className="w-full">
                              {menuAdded?.includes(i) ? (
                                <div className="flex flex-row justify-end w-full space-x-3">
                                  <button
                                    className="text-xs underline"
                                    onClick={() => removeIt(t, i)}
                                  >
                                    Remove
                                  </button>
                                  <p>Added</p>
                                </div>
                              ) : (
                                <button
                                  className="text-white bg-gradient-to-br from-green-400 to-purple-600 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-md px-4 py-1.5 text-center"
                                  onClick={() => addIt(t, i)}
                                >
                                  Add it!
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                })}
              </div>
              <div className="flex flex-row items-center justify-end px-5 py-4 mt-5 space-x-5 bg-white rounded-lg">
                <h3 className="font-medium">
                  Total: <span className="font-semibold">{total}</span> Credits
                </h3>
                <button
                  className="text-white bg-gradient-to-br from-green-400 to-purple-600 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-md px-4 py-1.5 text-center"
                  onClick={payForIt}
                >
                  Pay for it!
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
