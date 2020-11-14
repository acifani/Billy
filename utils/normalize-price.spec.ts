import { normalizePrice } from './normalize-price';

describe('normalizePrice()', () => {
  it.each`
    amount | frequency | unit       | to         | expected
    ${1}   | ${1}      | ${'day'}   | ${'week'}  | ${7}
    ${7}   | ${1}      | ${'week'}  | ${'day'}   | ${1}
    ${1}   | ${1}      | ${'day'}   | ${'month'} | ${30}
    ${30}  | ${1}      | ${'month'} | ${'day'}   | ${1}
    ${1}   | ${1}      | ${'day'}   | ${'year'}  | ${360}
    ${360} | ${1}      | ${'year'}  | ${'day'}   | ${1}
    ${1}   | ${12}     | ${'month'} | ${'year'}  | ${1}
    ${80}  | ${2}      | ${'month'} | ${'month'} | ${40}
    ${120} | ${2}      | ${'month'} | ${'day'}   | ${2}
    ${30}  | ${1}      | ${'year'}  | ${'month'} | ${2.5}
  `(
    'should convert $amount € every $frequency $unit to $expected € each $to',
    ({ amount, frequency, unit, to, expected }) => {
      const output = normalizePrice(amount, frequency, unit, to);
      expect(output).toBe(expected);
    }
  );
});
