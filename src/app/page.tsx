import Home from "../components/Home";
import { fetchAllProductList } from "@/service";
export default async function Page() {
  //for initial server side rendering
  const limit = 8;
  const { data } = await fetchAllProductList(limit);

  return <Home data={data} limit={limit} />;
}
