import { AxiosResponse } from "axios";
import { useAxios } from ".";
import { IDashboardProp } from "../interface/IDashboard";

export const get_dashboard_data = async (): Promise<AxiosResponse> => {
  return await useAxios.get("/dashboard");
};

export const get_single_dashboard_data = async (id: string): Promise<AxiosResponse> => {
  return await useAxios.get("/dashboard/" + id);
};

interface IDashboardRequest {
  id?: string,
  name?: string,
  dashboard?: IDashboardProp[]
}
export const set_dashboard_data = async ({ id, dashboard, name }: IDashboardRequest): Promise<AxiosResponse> => {
  return await useAxios.post("/dashboard", { id, dashboard, name });
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

export const get_usage_table_data = async (): Promise<AxiosResponse> => {
  return await useAxios.get("dashboard/table");
};
