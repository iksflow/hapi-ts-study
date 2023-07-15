"use strict";

import Hapi from "@hapi/hapi";
import { Request, Server } from "@hapi/hapi";
import hapiVision from "@hapi/vision";
import { helloRoutes } from "./hello";
import { peopleRoutes } from "./people";

export let server: Server;

export const init = async function (): Promise<Server> {
  server = Hapi.server({
    port: process.env.PORT || 4000,
    host: "0.0.0.0",
  });

  // 이 코드를 실행하지 않으면 ResponseToolKit에서 view 메서드를 사용할 수 없다. (h.view 가 undefined로 나옴)
  await registerVision(server);

  server.route({
    method: "GET",
    path: "/",
    handler: index,
  });
  server.route(helloRoutes);
  server.route(peopleRoutes);

  return server;
};

export const start = async function (): Promise<void> {
  console.log(`Listening on ${server.settings.host}:${server.settings.port}`);
  return server.start();
};

function index(request: Request): string {
  console.log("Processing request", request.info.id);
  return "Hello! Nice to have met you.";
}

process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection");
  console.error(err);
  process.exit(1);
});

async function registerVision(server: Server) {
  let cached: boolean;

  await server.register(hapiVision);

  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    cached = false;
  } else {
    cached = true;
  }

  server.log(["debug"], `Caching templates: ${cached}`);
  server.views({
    engines: {
      ejs: require("ejs"),
    },
    relativeTo: __dirname + "/../",
    path: "templates",
    isCached: cached,
  });
}
