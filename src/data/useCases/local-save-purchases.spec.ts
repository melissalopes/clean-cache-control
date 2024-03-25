/* classe de produção */
class LocalSavePurchases {
  constructor(private readonly cacheStore: ICacheStore) {}
}

interface ICacheStore {}
/* classe de produção */

/* mock do que está em produção */
class CacheStoreSpy implements ICacheStore {
  deleteCallsCount = 0;
}
/* mock do que está em produção */

describe('LocalSavePurchases', () => {
  test('Should not delete cache on init', () => {
    const cacheStore = new CacheStoreSpy();
    new LocalSavePurchases(cacheStore);
    expect(cacheStore.deleteCallsCount).toBe(0);
  });
});
