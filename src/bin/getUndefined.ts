import { RuleFinder } from '../index';

const smile = String.fromCodePoint(0x1f600);

interface Options {
  includeDeprecated: boolean;
  showErrors: boolean;
}

export function getUndefined(
  file: string | undefined = undefined,
  options: Options
) {
  const ruleFinder = new RuleFinder(file);
  const rules = ruleFinder.getUndefinedRules(options.includeDeprecated);

  if (rules.size === 0) {
    console.log(`All Rules Defined, Good Job ${smile}`);
  } else {
    rules.forEach((rule, name) => {
      // Should it thow and error for each rule?
      if (rule.meta && rule.meta.docs) {
        console.log(`undefined: ${name} (${rule.meta.docs.url})`);
      } else {
        console.log(`undefined: ${name}`);
      }
    });

    const message = `There were ${rules.size} rules left undefined`;

    if (options.showErrors) {
      throw new Error(message);
    } else {
      console.log(message);
    }
  }
}
