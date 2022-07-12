import { AxiosResponse } from "axios";
import { useAxios } from ".";
import { IDashboardProp } from "../interface/IDashboard";

export const get_dashboard_data = async (): Promise<AxiosResponse> => {
  return await useAxios.get("/dashboard");
};

export const set_dashboard_data = async (data: IDashboardProp[]): Promise<AxiosResponse> => {
  return await useAxios.post("/dashboard", { data });
};

export const get_user_by_country = async (country?: string): Promise<AxiosResponse> => {
  return await useAxios.get("user/users-country/" + country);
};

export const get_user_by_gender = async (gender?: string): Promise<AxiosResponse> => {
  return await useAxios.get("user/users-gender/" + gender);
};

export const get_user_by_device = async (device?: string): Promise<AxiosResponse> => {
  return await useAxios.get("user/users-device/" + device);
};

export const get_most_active_users = async (): Promise<AxiosResponse> => {
  return await useAxios.get("user/active-users");
};
