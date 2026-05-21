import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import * as path from "path";

const collectionPath = path.join(__dirname, "../collection.json");

describe("azure-auth-schematic", () => {
  it("generates all expected files with default options", async () => {
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
      "/src/app/environments/environment.prod.ts",
      "/src/app/environments/environment.ts",
      "/src/app/login-failed/login-failed.ts",
      "/src/app/sample/sample.ts",
      "/src/app/services/authentication.service.ts",
    ]);
  });

  it("injects MSAL v5 dependencies into target package.json", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    const baseTree = Tree.empty();
    baseTree.create(
      "/package.json",
      JSON.stringify({
        dependencies: { "@angular/core": "^19.0.0" },
      })
    );

    const tree = await runner.runSchematic(
      "azure-auth-schematic",
      {},
      baseTree
    );

    const pkg = JSON.parse(tree.readContent("/package.json"));
    expect(pkg.dependencies["@azure/msal-browser"]).toBe("^5.11.0");
    expect(pkg.dependencies["@azure/msal-angular"]).toBe("^5.2.5");
  });

  it("throws when Angular version is below 18", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    const baseTree = Tree.empty();
    baseTree.create(
      "/package.json",
      JSON.stringify({
        dependencies: { "@angular/core": "^17.0.0" },
      })
    );

    await expectAsync(
      runner.runSchematic("azure-auth-schematic", {}, baseTree)
    ).toBeRejectedWithError("Angular version 18+ required.");
  });

  it("pre-populates environment.ts with provided schema options", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    const tree = await runner.runSchematic(
      "azure-auth-schematic",
      {
        clientId: "test-client-id",
        tenantId: "test-tenant-id",
        apiUrl: "https://my-api.example.com",
        apiScope: "access_as_user",
        redirectUri: "http://localhost:4200/",
      },
      Tree.empty()
    );

    const envContent = tree.readContent("/src/app/environments/environment.ts");
    expect(envContent).toContain("test-client-id");
    expect(envContent).toContain("test-tenant-id");
    expect(envContent).toContain("https://my-api.example.com");
    expect(envContent).toContain("access_as_user");
    expect(envContent).toContain("http://localhost:4200/");
  });
});
