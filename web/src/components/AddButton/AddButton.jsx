import { useState } from 'react'
import scss from './AddButton.module.scss'
import { createPortal } from 'react-dom'
import Modal from '../Modal/Modal'

const AddButton = ({ modalChildren }) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className={scss.add} onClick={() => setShowModal((prev) => !prev)}>
                <span className={scss.addIcon}>+</span>
                <span className={scss.addText}>добавить</span>
            </div>

            {showModal && createPortal(
                <Modal
                    headText='Добавить устройство'
                    open={showModal}
                    setOpen={setShowModal}
                >
                    { modalChildren }
                </Modal>,
                document.getElementById("modal")
          )}
        </>
    )
}

export default AddButton
