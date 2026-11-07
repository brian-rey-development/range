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
      name: "lib-is-a-leaf",
      severity: "error",
      from: { path: "^src/lib/" },
      to: { path: "^src/(primitives|poker)/" },
    },
    {
      name: "primitives-do-not-know-poker",
      severity: "error",
      from: { path: "^src/primitives/" },
      to: { path: "^src/poker/" },
    },
    {
      name: "poker-types-is-a-leaf",
      severity: "error",
      from: { path: "^src/poker/types/" },
      to: { path: "^src/poker/(application|hooks|ui)/" },
    },
    {
      name: "poker-application-stays-inward",
      severity: "error",
      from: { path: "^src/poker/application/" },
      to: { path: "^src/poker/(hooks|ui)/" },
    },
    {
      name: "poker-hooks-stay-below-ui",
      severity: "error",
      from: { path: "^src/poker/hooks/" },
      to: { path: "^src/poker/ui/" },
    },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    includeOnly: "^src",
    tsConfig: { fileName: "tsconfig.json" },
    tsPreCompilationDeps: true,
  },
};
