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

export function azureAuthSchematic(_options: any): Rule {
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
            if (versionMatch && parseInt(versionMatch[0], 10) < 16) {
              context.logger.error(
                "This schematic requires Angular 16 or newer for signal support. Please upgrade your project."
              );
              throw new Error("Angular version 16+ required.");
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
          pkg.dependencies["@azure/msal-browser"] = "^3.0.0";
          pkg.dependencies["@azure/msal-angular"] = "^3.0.0";
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
          ..._options,
        }),
        move("src/app"),
      ])
    ),
  ]);
}
