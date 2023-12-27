import ProductDetail from "@/components/Product/details";
import { fetchProductDetail } from "@/service";
export default async function Page(props: any) {
  const id = props.params.id;
  const { data } = await fetchProductDetail(id);
  return <ProductDetail data={data} />;
}
