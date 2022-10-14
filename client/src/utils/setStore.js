import { instance } from "../apis/api.instance";

export const setStore = (StoreId) => {
  if (StoreId) {
    instance.defaults.headers.common["access_store"] = StoreId;
    localStorage.setItem("store", StoreId);
  } else {
    delete instance.defaults.headers.common["access_store"];
    localStorage.removeItem("store");
  }
};
