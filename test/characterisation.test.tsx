import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ReactMatrix from '../lib';
import { data } from '../src/data/risk5x5';
import oracle from './fixtures/grid-5x5.pre-1.0.json';
import { projectGrid } from './projectGrid';
import { readTable } from './readTable';

// The only declared 1.0 difference visible to this projection: axis titles keep
// their text as written and are upper-cased by CSS (the `axisCase` theme token),
// which also fixes 0.4.x's inverted `headerPrimaryUpper`.
const EXPECTED_1_0 = {
  ...oracle,
  axisTitles: { ...oracle.axisTitles, row: 'Likelihood' },
};

describe('characterisation against the 0.4.x rendering', () => {
  it('places every rating at the same likelihood and consequence as 0.4.x', () => {
    render(<ReactMatrix data={data} />);

    expect(projectGrid(readTable())).toEqual(EXPECTED_1_0);
  });
});
