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
      <div className="flex cursor-pointer flex-row gap-2 rounded bg-gray-50 p-4 shadow transition duration-200 hover:-translate-y-1 hover:shadow-lg">
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
    <main className="container mx-auto flex flex-col">
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
