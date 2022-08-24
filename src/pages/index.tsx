import type { Shop } from "@prisma/client";
import Link from "next/link";
import { trpc } from "~/utils/trpc";

type ShopItemProps = {
  shop: Shop;
};
const ShopItem = ({ shop }: ShopItemProps) => {
  const url = `/reservation/${shop.id}`;
  return (
    <Link href={url}>
      <div className="flex flex-row gap-2 shadow p-4 bg-white rounded">
        <a className="text-xl">{shop.name}</a>
      </div>
    </Link>
  );
};

const Home = () => {
  const { data: shops } = trpc.useQuery(["reservation.shops"]);

  if (!shops) {
    return <div>loading...</div>;
  }

  return (
    <main className="container flex flex-col mx-auto">
      <ul className="flex flex-col gap-4 p-4">
        {shops.map((shop) => (
          <li key={shop.id}>
            <ShopItem shop={shop} />
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
