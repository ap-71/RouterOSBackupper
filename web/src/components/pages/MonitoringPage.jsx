import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import DataService from "../../services/data.service";
import Table from "../Table/Table";
import scss from "./MonitoringPage.module.scss";
import Modal from "../Modal/Modal";
import AddButton from "../AddButton/AddButton";
import FormAddDevice from "../FormAddDevice/FormAddDevice";

export default function MonitoringPage(props) {
  const [data, setData] = useState();
  const [selectedData, setSelectedData] = useState([1, 2, 3, 4]);
  const [openModal, setOpenModal] = useState(false);
  const [ignore] = useState(["pic"]);
  const [dataFoundDevices, setDataFoundDevices] = useState([]);
  const [loader, setLoader] = useState(false);

  function handleError(e) {
    console.error(e);
  }

  useEffect(() => {
    const getData = async () => {
      setLoader(true);
  
      const data1 = await DataService.get("data").catch(handleError);
      setData(data1);
  
      const data2 = await DataService.get("found_devices").catch(handleError);
      setDataFoundDevices(data2);
  
      setLoader(false);
    }

    getData()
  }, []);

  function handleOpenModal(currentData) {
    setSelectedData(currentData);
    setOpenModal(true);
  }

  function handleOnSubmitAddDevice(e){
    console.debug(e)
  }
  
  return (
    <> 
      <AddButton 
        modalChildren={<FormAddDevice onSubmit={handleOnSubmitAddDevice}/>}
      />

      {loader && <div className="loader">Загрузка...</div>}
      {!loader && (
        <div className={scss.tables}>
          {dataFoundDevices.length > 0 && (
            <Table
              data={dataFoundDevices}
              columns={["host", "port", "proto"]}
              name="Найдено"
              color="#aac4f2"
            />
          )}

          {data?.filter((f) => f.state !== "active").length > 0 && (
            <Table
              data={data?.filter((f) => f.state !== "active")}
              columns={["name", "state"]}
              name="Недоступен"
              color="rgb(242 170 170)"
              onClickRow={handleOpenModal}
            />
          )}

          {data?.filter((f) => f.state === "active").length > 0 && (
            <Table
              data={data?.filter((f) => f.state === "active")}
              columns={["name", "state"]}
              name="В сети"
              color="#aaf2aa"
              onClickRow={handleOpenModal}
            />
          )}

          {data?.length > 0 && (
            <Table
              data={data}
              columns={["name", "state"]}
              name="Все устройства"
              color="gray"
              onClickRow={handleOpenModal}
            />
          )}
        </div>
      )}
      
      {openModal && createPortal(
          <Modal
            open={openModal}
            setOpen={setOpenModal}
            imgUrl={selectedData?.pic}
          >
            {Object.keys(selectedData)
              .filter((k) => !ignore.includes(k))
              .map((k, i) => (
                <div style={{ display: "flex", padding: "4px" }}>
                  <strong key={i}>{k}: </strong>
                  <span>{selectedData[k]}</span>
                </div>
              ))}
          </Modal>,
          document.getElementById("modal")
        )}
    </>
  );
}

{
  /* 
backup_interval_days: 7
description: "Test device"
host: "127.0.0.1"
id: 111
last_active: "11-12-2023"
last_backup: "11-12-2023"
model: "RB1100"
name: "mt-tl-01"
pic: "logo192.png"
port: "22"
proto: "ssh"
state: "active"
*/
}
