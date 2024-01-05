import { useEffect, useRef } from "react";
import scss from "./Modal.module.scss";

export default function Modal({ children, open, setOpen, imgUrl, headText="Информация" }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return (
    <dialog ref={dialog} className={scss.modal}>
      <div className={scss.head}>
        <span>{headText}</span>
        <button onClick={() => setOpen(false)}>X</button>
      </div>
      <div className={scss.content}>
        {imgUrl && <img src={imgUrl} alt="img" className={scss.img}/>}
        <div className={scss.detail}>{children}</div>
      </div>
    </dialog>
  );
}
