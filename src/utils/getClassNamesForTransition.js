export const getClassNamesForReactTransition = (styles, name) => {
  return {
    enterActive: styles[`${name}EnterActive`],
    enterDone: styles[`${name}EnterDone`],
    exit: styles[`${name}Exit`],
    exitActive: styles[`${name}ExitActive`],
  }
}
