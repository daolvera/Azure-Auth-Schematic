import {
  Rule,
  SchematicContext,
  Tree,
  chain,
  mergeWith,
  apply,
  url,
  move,
  template,
} from "@angular-devkit/schematics";
import { strings } from "@angular-devkit/core";
import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks";

interface SchemaOptions {
  clientId?: string;
  tenantId?: string;
  redirectUri?: string;
  apiUrl?: string;
  apiScope?: string;
}

export function azureAuthSchematic(_options: SchemaOptions): Rule {
  const options: Required<SchemaOptions> = {
    clientId: _options.clientId ?? "<YOUR_CLIENT_ID>",
    tenantId: _options.tenantId ?? "<YOUR_TENANT_ID>",
    redirectUri: _options.redirectUri ?? "/",
    apiUrl: _options.apiUrl ?? "https://graph.microsoft.com/v1.0/me",
    apiScope: _options.apiScope ?? "user.read",
  };

  return chain([
    (tree: Tree, context: SchematicContext) => {
      const filesToOverwrite = [
        "/src/app/app.config.ts",
        "/src/app/app.html",
        "/src/app/app.ts",
        "/src/app/app.routes.ts",
      ];
      filesToOverwrite.forEach((filePath) => {
        if (tree.exists(filePath)) {
          context.logger.warn(`Overwriting existing file: ${filePath}`);
          tree.delete(filePath);
        }
      });
      return tree;
    },
    (tree: Tree, context: SchematicContext) => {
      const pkgPath = "/package.json";
      if (tree.exists(pkgPath)) {
        const pkgBuffer = tree.read(pkgPath);
        if (pkgBuffer) {
          const pkg = JSON.parse(pkgBuffer.toString("utf-8"));
          const angularCore =
            pkg.dependencies && pkg.dependencies["@angular/core"];
          if (angularCore) {
            const versionMatch = angularCore.match(/\d+/);
            if (versionMatch && parseInt(versionMatch[0], 10) < 18) {
              context.logger.error(
                "This schematic requires Angular 18 or newer. MSAL v5 dropped support for Angular 17 and below. Please upgrade your project."
              );
              throw new Error("Angular version 18+ required.");
            }
          }
        }
      }
      return tree;
    },

    (tree: Tree, context: SchematicContext) => {
      const pkgPath = "/package.json";
      if (tree.exists(pkgPath)) {
        const pkgBuffer = tree.read(pkgPath);
        if (pkgBuffer) {
          const pkg = JSON.parse(pkgBuffer.toString("utf-8"));
          pkg.dependencies = pkg.dependencies || {};
          pkg.dependencies["@azure/msal-browser"] = "^5.11.0";
          pkg.dependencies["@azure/msal-angular"] = "^5.2.5";
          tree.overwrite(pkgPath, JSON.stringify(pkg, null, 2));
          context.addTask(new NodePackageInstallTask());
        }
      }
      return tree;
    },

    mergeWith(
      apply(url("./files"), [
        template({
          ...strings,
          ...options,
        }),
        move("src/app"),
      ])
    ),
  ]);
}
