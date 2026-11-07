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
      name: "landing-never-imports-web",
      severity: "error",
      from: { path: "^src/" },
      to: { path: "^\\.\\./web/" },
    },
    {
      name: "shared-is-a-leaf",
      severity: "error",
      from: { path: "^src/shared/" },
      to: { path: "^src/(core|sections)/" },
    },
    {
      name: "core-below-sections",
      severity: "error",
      from: { path: "^src/core/" },
      to: { path: "^src/sections/" },
    },
    {
      name: "sections-are-independent",
      severity: "error",
      from: { path: "^src/sections/([^/]+)/" },
      to: { path: "^src/sections/", pathNot: "^src/sections/$1/" },
    },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    includeOnly: "^(src|\\.\\./web)",
    tsConfig: { fileName: "tsconfig.json" },
    tsPreCompilationDeps: true,
  },
};
