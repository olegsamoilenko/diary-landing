import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import ts from 'typescript'

const exports = {}
const source = readFileSync(
  new URL('../lib/utils/adminGrowth.ts', import.meta.url),
  'utf8',
)
runInNewContext(
  ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText,
  { exports },
)
const { getGrowthDataError } = exports
const ids = ['ad-free-m1', 'ad-free-y1', 'lite-m1', 'base-m1', 'pro-m1']
const counts = (plan) =>
  Object.fromEntries(ids.map((id) => [id, id === plan ? 1 : 0]))
const valid = () => ({
  points: [
    { newUsers: 2, newPaidUsers: 1, paidByPlan: counts('ad-free-m1') },
    { newUsers: 0, newPaidUsers: 1, paidByPlan: counts('ad-free-y1') },
  ],
  totals: { newUsers: 2, newPaidUsers: 2 },
})

test('accepts two paid users split between monthly and annual AdFree', () => {
  assert.equal(getGrowthDataError(valid(), ids), '')
})
test('rejects retained pre-breakdown data instead of showing total 2 and empty bars', () => {
  const data = valid()
  for (const point of data.points) delete point.paidByPlan
  assert.notEqual(getGrowthDataError(data, ids), '')
})
test('rejects zero-filled series with a nonzero headline', () => {
  const data = valid()
  for (const point of data.points) point.paidByPlan = counts('none')
  assert.notEqual(getGrowthDataError(data, ids), '')
})
test('rejects a headline that does not equal the sum of the plotted dates', () => {
  const data = valid()
  data.totals.newPaidUsers = 3
  assert.notEqual(getGrowthDataError(data, ids), '')
})
for (const value of ['1', -1, 0.5, null, NaN])
  test(`rejects malformed series count ${value}`, () => {
    const data = valid()
    data.points[0].paidByPlan['ad-free-m1'] = value
    assert.notEqual(getGrowthDataError(data, ids), '')
  })
test('accepts an empty period with zero totals', () => {
  assert.equal(
    getGrowthDataError(
      { points: [], totals: { newUsers: 0, newPaidUsers: 0 } },
      ids,
    ),
    '',
  )
})
