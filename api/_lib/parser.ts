import { IncomingMessage } from "http";
import { parse } from "url";
import { ParsedRequest } from "./types";

export function parseRequest(req: IncomingMessage) {
  console.log("HTTP " + req.url);
  const { pathname, query } = parse(req.url || "/", true);
  const {
    logo,
    secondaryLogo,
    backgroundImage,
    fontSize,
    title,
    description,
    theme,
    md,
  } = query || {};

  if (Array.isArray(fontSize)) {
    throw new Error("Expected a single fontSize");
  }
  if (Array.isArray(theme)) {
    throw new Error("Expected a single theme");
  }
  if (Array.isArray(backgroundImage)) {
    throw new Error("Expected a single backgroundImage");
  }
  if (Array.isArray(logo)) {
    throw new Error("Expected a single logo");
  }
  if (Array.isArray(secondaryLogo)) {
    throw new Error("Expected a single secondaryLogo");
  }

  if (Array.isArray(title)) {
    throw new Error("Expected a single title");
  }

  if (Array.isArray(description)) {
    throw new Error("Expected a single description");
  }

  const arr = (pathname || "/").slice(1).split(".");
  let extension = "";
  let text = "";
  if (arr.length === 0) {
    text = "";
  } else if (arr.length === 1) {
    text = arr[0];
  } else {
    extension = arr.pop() as string;
    text = arr.join(".");
  }

  const parsedRequest: ParsedRequest = {
    fileType: extension === "jpeg" ? extension : "jpeg",
    text: decodeURIComponent(text),
    theme: theme === "dark" ? "dark" : "light",
    md: md === "1" || md === "true",
    fontSize: fontSize || "96px",
    logo: logo || "",
    secondaryLogo: secondaryLogo || "",
    backgroundImage: backgroundImage || "",
    title: title || "",
    description: description || "",
  };
  return parsedRequest;
}
