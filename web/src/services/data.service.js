import axios from "axios"

const DataService = {
  get: async (name) => {
    const urls = {
      data: "/data/test_data.json",
      found_devices: "/data/test_data_found_devices.json",
    };

    const data = await fetch(urls[name]);
    // const data = await fetchHelper({ path: makeURL({ path: 'get_data' }) })
    return await data.json();
  },
  addDevice: async (data_) => {
    const { data } = await axios.post("/data/test_data.json", data_)
    return data
  }
};

export default DataService;
