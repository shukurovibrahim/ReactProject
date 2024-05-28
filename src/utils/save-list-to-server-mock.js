import { v4 } from "uuid";

export const saveListToServerMock = async (list) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { ...list, id: v4() };
};
