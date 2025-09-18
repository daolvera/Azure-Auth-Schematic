import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import * as path from "path";

const collectionPath = path.join(__dirname, "../collection.json");

describe("azure-auth-schematic", () => {
  it("works", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    const tree = await runner.runSchematic(
      "azure-auth-schematic",
      {},
      Tree.empty()
    );

    expect(tree.files).toEqual([
      "/src/app/app.config.authentication.ts",
      "/src/app/app.config.ts",
      "/src/app/app.html",
      "/src/app/app.routes.ts",
      "/src/app/app.ts",
      "/src/app/environments/environment.ts",
      "/src/app/sample/sample.ts",
      "/src/app/services/authentication.service.ts",
    ]);
  });
});
