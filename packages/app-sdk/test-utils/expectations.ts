export function expectAsset() {
  return expect.objectContaining({
    assetId: expect.any(String)
  });
}

export function expectProgram() {
  return expect.objectContaining({
    programId: expect.any(String),
    assetId: expect.any(String),
    startTime: expect.any(String),
    endTime: expect.any(String)
  });
}

export function expectTagType() {
  return expect.objectContaining({
    children: [],
    localized: expect.arrayContaining([expect.objectContaining({ title: expect.any(String) })]),
    parents: [],
    scheme: expect.any(String),
    tagId: expect.any(String)
  });
}
