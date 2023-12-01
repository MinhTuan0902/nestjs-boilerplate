const { Command } = require('commander');
const { open, readFileSync, writeFile, existsSync } = require('fs');
const makeDir = require('make-dir');
const mustache = require('mustache');
const { join, resolve } = require('path');

const program = new Command();
const MIGRATION_STEP_TEMPLATE_PATH = join(
  resolve(),
  'src/apps/migrations/templates/mustache',
  'migration-step.mustache',
);
if (!existsSync(MIGRATION_STEP_TEMPLATE_PATH)) {
  throw new Error('Migration step template not found');
}

const MIGRATION_STEP_TEMPLATE_CONTENT = readFileSync(
  MIGRATION_STEP_TEMPLATE_PATH,
).toString();
if (MIGRATION_STEP_TEMPLATE_CONTENT.trim() === '') {
  throw new Error('Migration step template content is empty');
}

program.name('Create migration step');

program
  .description('Create a new migration step')
  .option('-n --name <string>', 'Migration step name')
  .action(async function (options) {
    if (!options.name) {
      throw new Error('-n, --name <string> option must be provided');
    }

    options.name = `${new Date().getTime()}_${options.name.toLowerCase()}`;
    const rendered = mustache.render(MIGRATION_STEP_TEMPLATE_CONTENT, {
      name: options.name,
    });
    const migrationStepsDir = join(resolve(), 'src/apps/migrations/steps');
    if (!existsSync(migrationStepsDir)) {
      await makeDir(migrationStepsDir);
    }

    const migrationStepPath = join(migrationStepsDir, `${options.name}.ts`);

    open(migrationStepPath, 'w', (err) => {
      if (err) throw err;
      console.log(
        `Migration step ${options.name} successfully created.\nGo to ${migrationStepPath} to update migrate logic`,
      );
    });

    writeFile(migrationStepPath, rendered, (err) => {
      if (err) throw err;
    });
  });

program.parse();
