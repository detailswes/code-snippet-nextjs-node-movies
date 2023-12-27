import { baseUrl } from "@/config";
import axios from "axios";

const customAxios = axios.create({
  baseURL: baseUrl,
});
export default customAxios;
