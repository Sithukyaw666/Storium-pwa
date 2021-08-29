import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-bottts-sprites";

export const createProfile = (id) => {
  const svg = createAvatar(style, {
    seed: id,
  });
  return svg;
};
