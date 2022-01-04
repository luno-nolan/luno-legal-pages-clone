import micromatch from 'micromatch'

export default {
  '*.{js,jsx,mjs,ts,tsx}': (filenames) => {
    const allowed = micromatch.not(filenames, ['.lintstagedrc.mjs'])
    const fixables = allowed.map((file) => `--file ${file}`).join(' ')

    return `npm run lint -- --fix ${fixables} --max-warnings 0`
  },
  '*': (filenames) => {
    const fixables = filenames.join(' ')

    return `npm run format ${fixables} -- --ignore-unknown`
  },
}
