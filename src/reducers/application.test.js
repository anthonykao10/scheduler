import reducer from "reducers/application";

describe('reducer', () => {
  it('throws an error with an unsupported type', () => {
    expect(() => reducer({}, { type: null }))
      .toThrow(/tried to reduce with unsupported action type/i);
  });
});