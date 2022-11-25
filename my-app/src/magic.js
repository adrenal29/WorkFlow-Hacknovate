import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";

export const socialLogins = ["google"];

export const magic = new Magic("pk_live_AEAA1DE6BC49A2CC", {
  extensions: [new OAuthExtension()],
});
