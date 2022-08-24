import { createRouter } from "./context";
import { z } from "zod";

export const ReservationRouter = createRouter()
  .query("menu", {
    input: z.object({
      menuId: z.number(),
    }),
    async resolve({ input, ctx }) {
      const menu = await ctx.prisma.menu.findUnique({
        where: {
          id: input.menuId,
        },
      });
      return menu;
    },
  })
  .query("menus", {
    input: z.object({
      shopId: z.number(),
    }),
    async resolve({ input, ctx }) {
      const menus = await ctx.prisma.menu.findMany({
        where: {
          shopId: input.shopId,
        },
      });

      return menus;
    },
  })
  .query("menu-options", {
    input: z.object({
      menuId: z.number(),
    }),
    async resolve({ input, ctx }) {
      const menuOptions = await ctx.prisma.menuOption.findMany({
        where: {
          menuId: input.menuId,
        },
      });
      return menuOptions;
    },
  })
  .query("shop", {
    input: z.object({
      shopId: z.number(),
    }),
    async resolve({ input, ctx }) {
      const shop = await ctx.prisma.shop.findUnique({
        where: {
          id: input.shopId,
        },
      });
      return shop;
    },
  })
  .query("shops", {
    async resolve({ ctx }) {
      const shops = await ctx.prisma.shop.findMany();
      return shops;
    },
  });
