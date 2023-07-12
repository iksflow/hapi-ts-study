import { Server } from "@hapi/hapi";
import { describe, it, beforeEach, afterEach } from "mocha";
import hcai, { expect } from "chai";

import { init } from "../src/server";
import exp from "constants";

describe("smoke test", async () => {
  let server: Server;

  beforeEach((done) => {
    init().then((s) => {
      server = s;
      done();
    });
  });
  afterEach((done) => {
    server.stop().then(() => done());
  });

  it("index responds", async () => {
    const res = await server.inject({
      method: "get",
      url: "/",
    });
    expect(res.statusCode).to.equal(200);
    expect(res.result).to.equal("Hello! Nice to have met you.");
  });
});
