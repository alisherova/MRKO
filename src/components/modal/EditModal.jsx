import React, { useContext, useEffect, useRef } from "react";
import { MainCtx } from "../../contexts/MainContext";
import "./modal.css";

const EditModal = (props) => {
    const { setEditModal, showEditModal, setIsEditing} = useContext(MainCtx);
    const modalRef = useRef();

    useEffect(() => {
        const clickOutsideContent = (e) => {
            if (e.target === modalRef.current) {
                setEditModal(false);
                setIsEditing(false)
            }
        };
        window.addEventListener("click", clickOutsideContent);
        return () => {
            window.removeEventListener("click", clickOutsideContent);
        };
    }, [props]);

    const closeModals = () => {
        setEditModal(false);
        setIsEditing(false)
    }

    return (
        <div ref={modalRef} className={`modal fixed top-0 left-0 z-10 w-full h-[100%] overflow-auto ${showEditModal ? "active" : ""}`}>
            <div className="modal__content border-4 border-indigo-300 rounded-xl text-black bg-white my-[15%] mx-auto relative w-[40%]">
                {!props.hideCloseButton && (
                    <span onClick={() => closeModals()} className="py-1.5 px-3.5 cursor-pointer float-right text-2xl text-gray-500 hover:text-black">
            &times;
          </span>
                )}
                <div className="modal__header px-5 py-4 text-3xl text-indigo-800">{props.headerContext}</div>
                <div className="modal__body px-5">{props.children}</div>
            </div>
        </div>
    );
};

export default EditModal;
