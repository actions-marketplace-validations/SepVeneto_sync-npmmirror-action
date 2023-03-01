import * as core from '@actions/core'
import * as process from 'process'
import * as main from '../src/main'
import {expect, jest, test} from '@jest/globals'

test('with no name', async () => {
  const warningSpy = jest.spyOn(core, 'warning')
  main.run()
  expect(warningSpy).toHaveBeenCalledWith('without name, change to use the name from package.json')
})

test('set name', async () => {
  process.env['INPUT_NAME'] = 'foo'
  const debugSpy = jest.spyOn(core, 'debug')
  await main.run()
  expect(debugSpy).toHaveBeenCalledWith('package name: foo')
})

test('set multiple name', async () => {
  process.env['INPUT_NAME'] = 'foo\nbar'
  const debugSpy = jest.spyOn(core, 'debug')
  await main.run()
  expect(debugSpy).toHaveBeenNthCalledWith(1, 'package name: foo')
  expect(debugSpy).toHaveBeenNthCalledWith(2, 'package name: bar')
})
