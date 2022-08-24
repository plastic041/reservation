import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import ShopHeader from "~/components/shop-header";
import { trpc } from "~/utils/trpc";

const ReservationShopPage = () => {
  const router = useRouter();
  const shopId = Number(router.query.shopId as string);

  const { data: menus } = trpc.useQuery(["reservation.menus", { shopId }]);
  const { data: shop } = trpc.useQuery(["reservation.shop", { shopId }]);

  if (!menus || !shop) {
    return <div>loading...</div>;
  }

  return (
    <div className="container mx-auto flex flex-col gap-4 p-4">
      <ShopHeader shop={shop} to="/" />
      <main>
        <ul className="flex flex-col gap-4">
          {menus.map((menu) => (
            <li key={menu.id}>
              <Link href={`/reservation/${shopId}/${menu.id}`}>
                <div className="flex cursor-pointer flex-row gap-4 rounded-lg bg-green-100 p-2 transition duration-200 hover:-translate-y-1 hover:shadow-md">
                  <Image
                    src={`https://picsum.photos/id/${menu.id}/128/128`}
                    alt="product"
                    width={128}
                    height={128}
                    layout="fixed"
                    className="rounded-md"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <span className="text-lg font-bold">{menu.name}</span>
                    <span>{menu.price.toLocaleString()}원</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
  // 메뉴를 보여주기
};

export default ReservationShopPage;
