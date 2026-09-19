import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ReactMatrix from '../lib';
import { data } from '../lib/utils/data';
import oracle from './fixtures/grid-5x5.pre-1.0.json';
import { projectGrid } from './projectGrid';
import { readTable } from './readTable';

describe('characterisation against the 0.4.x rendering', () => {
  it('places every rating at the same likelihood and consequence as 0.4.x', () => {
    render(<ReactMatrix data={data} />);

    expect(projectGrid(readTable())).toEqual(oracle);
  });
});
