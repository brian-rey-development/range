const MODULE = "^src/modules/([^/]+)";

/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "no-circular",
      severity: "error",
      from: {},
      to: { circular: true },
    },
    {
      name: "no-unresolvable",
      severity: "error",
      from: {},
      to: { couldNotResolve: true },
    },
    {
      name: "web-never-imports-landing",
      severity: "error",
      from: { path: "^src/" },
      to: { path: "^\\.\\./landing/" },
    },
    {
      name: "shared-is-a-leaf",
      severity: "error",
      from: { path: "^src/shared/" },
      to: { path: "^src/(core|modules|app)/" },
    },
    {
      name: "core-below-modules-and-app",
      severity: "error",
      from: { path: "^src/core/" },
      to: { path: "^src/(modules|app)/" },
    },
    {
      name: "modules-below-app",
      severity: "error",
      from: { path: "^src/modules/" },
      to: { path: "^src/app/" },
    },
    {
      name: "module-cross-import-via-index",
      severity: "error",
      from: { path: `${MODULE}/` },
      to: {
        path: "^src/modules/",
        pathNot: ["^src/modules/$1/", "^src/modules/[^/]+/index\\.ts$"],
      },
    },
    {
      name: "outside-modules-via-index",
      severity: "error",
      from: { path: "^src/(app|core|shared)/" },
      to: { path: "^src/modules/[^/]+/(?!index\\.ts$)" },
    },
    {
      name: "types-is-a-leaf",
      severity: "error",
      from: { path: `${MODULE}/types/` },
      to: { path: "^src/modules/$1/(application|infrastructure|hooks|ui)/" },
    },
    {
      name: "application-stays-inward",
      severity: "error",
      from: { path: `${MODULE}/application/` },
      to: { path: "^src/modules/$1/(infrastructure|hooks|ui)/" },
    },
    {
      name: "infrastructure-stays-below-ui",
      severity: "error",
      from: { path: `${MODULE}/infrastructure/` },
      to: { path: "^src/modules/$1/(hooks|ui)/" },
    },
    {
      name: "hooks-stay-below-ui",
      severity: "error",
      from: { path: `${MODULE}/hooks/` },
      to: { path: "^src/modules/$1/ui/" },
    },
    {
      name: "routes-only-from-router",
      severity: "error",
      from: { pathNot: "^src/app/router\\.tsx$" },
      to: { path: "^src/app/routes/" },
    },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    includeOnly: "^(src|\\.\\./landing)",
    tsConfig: { fileName: "tsconfig.json" },
    tsPreCompilationDeps: true,
  },
};
