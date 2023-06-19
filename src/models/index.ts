import { PostProps } from "@/types/PostProps";
import { Models } from "@rematch/core";
// import { count } from "./count";
import { feed } from "./feed";

export interface RootModel extends Models<RootModel> {
  // count: typeof count;
  feed: typeof feed;
}
export const models: RootModel = { feed };
