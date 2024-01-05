import { useRef, useState } from "react";
import DataService from "../../services/data.service";
import scss from "./FormAddDevice.module.scss"

const FormAddDevice = ({ onSubmit }) => {
    const [message, setMessage] = useState()
    const [loader, setLoader] = useState()
    const formAddDevice = useRef()

    function handleSubmitAddDevice(e){
        setLoader(true);
        e.preventDefault()

        const formData = new FormData(formAddDevice.current)
        const formProps = Object.fromEntries(formData)
        
        DataService.addDevice(formProps)
            .then(d => {
                onSubmit(d)
                setMessage('Добавлено')
            })
            .catch( e => setMessage('Ошибка при добавлении'))
            .finally(() => {
                setLoader(false);
            })
      }

    return (
    <>
        <form className={scss.form} method="post" onSubmit={handleSubmitAddDevice} ref={formAddDevice}>
            <div className={scss.formInput}>
                <label htmlFor="ip">IP</label>
                <input type="text" name="ip" id="ip" />
            </div>
            
            <div className={scss.formInput}>
                <label htmlFor="name">Имя</label>
                <input type="text" name="name" id="name" />
            </div>

            <div className={scss.formTextarea}>
                <label htmlFor="description">Описание</label>
                <textarea name="description" id="description" cols="30" rows="10"></textarea>
            </div>

            <div className={scss.formButton}>
                <button>
                    { loader && <div>отправка...</div> }
                    { !loader && <div>Добавить</div> }
                </button>
            </div>
          </form>
        { message && <div>{ message }</div>}
    </>
)}

export default FormAddDevice
