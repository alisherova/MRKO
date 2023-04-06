import React, { useState } from "react";
import Button from "./button/Button";
import Modal from "./modal/Modal";

function TableUi() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="h-[100vh]">
      <div className={"max-w-7xl mx-auto px-4  sm:pt-10 sm:px-6 lg:px-8"}>
        <div className="py-5 flex justify-end">
          <Button onClick={() => setShowModal(true)} children="Add user" classes="max-sm:hidden block"/>
          <Button onClick={() => setShowModal(true)} classes="max-sm:block hidden">+</Button>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-full max-sm:overflow-scroll">
            <table className="border border-slate-500 dark:border-white min-w-full">
              <thead className=" text-left h-10 sm:h-14 bg-slate-300 dark:bg-indigo-600">
                <tr>
                  <th className="border-slate-500 border dark:border-white  px-2 sm:px-4">#</th>
                  <th className="border-slate-500 border dark:border-white px-2 sm:px-4">Name</th>
                  <th className="border-slate-500 border dark:border-white px-2 sm:px-4">Phone</th>
                  <th className="border-slate-500 border dark:border-white px-2 sm:px-4">Role</th>
                  <th className="border-slate-500 border dark:border-white px-2 sm:px-4">Created</th>
                  <th className="border-slate-500 border dark:border-white px-2 sm:px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className=" border-slate-500  dark:border-white border-r px-2 sm:px-4 sm:py-2">1</td>
                  <td className=" border-slate-500 dark:border-white border-r px-2 sm:px-4 sm:py-2 ">item</td>
                  <td className=" border-slate-500 dark:border-white border-r px-2 sm:px-4 sm:py-2 ">item</td>
                  <td className=" border-slate-500 dark:border-white border-r px-2 sm:px-4 sm:py-2 ">item</td>
                  <td className=" border-slate-500 dark:border-white border-r px-2 sm:px-4 sm:py-2 ">item</td>
                  <td className=" px-4">item</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <Modal
        show={showModal}
        setShow={setShowModal}
      >
        <ModalHeader>
          <h2>Modal Header</h2>
        </ModalHeader>
        <ModalBody>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam
            dignissimos nihil eius totam obcaecati dolores.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setShowModal(false)}>Close modal</Button>
        </ModalFooter>
      </Modal> */}
    </div>
  );
}

export default TableUi;
