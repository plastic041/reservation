import type { Shop } from "@prisma/client";
import { IconChevronLeft, IconDotsVertical } from "@tabler/icons";
import Link from "next/link";

type ShopHeaderProps = {
  shop: Shop;
  to: string;
};
const ShopHeader = ({ shop, to }: ShopHeaderProps) => {
  return (
    <header className="flex flex-row justify-between items-center">
      <nav>
        <Link href={to}>
          <a>
            <IconChevronLeft className="rounded" />
          </a>
        </Link>
      </nav>
      <h2 className="font-bold">{shop.name}</h2>
      <button>
        <IconDotsVertical />
      </button>
    </header>
  );
};
export default ShopHeader;
