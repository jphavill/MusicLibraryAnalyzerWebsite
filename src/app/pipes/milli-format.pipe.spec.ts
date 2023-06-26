import { MilliFormatPipe } from './milli-format.pipe';

describe('MilliFormatPipe', () => {
  let pipe: MilliFormatPipe;
  beforeEach(() => {
    pipe = new MilliFormatPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should correctly translate dates from milliseconds', () => {
    let result = pipe.transform(180122000)
    expect(result).toBe('2 days, 2 hours, 2 mins, 2 secs')
  })
});
