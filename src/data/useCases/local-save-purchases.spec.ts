/* classe de produção */
class LocalSavePurchases {
  constructor(private readonly cacheStore: ICacheStore) {}

  async save(): Promise<void> {
    this.cacheStore.delete();
  }
}

interface ICacheStore {
  delete: () => void;
}
/* classe de produção */

/* mock do que está em produção */
class CacheStoreSpy implements ICacheStore {
  deleteCallsCount = 0;

  delete(): void {
    this.deleteCallsCount++;
  }
}
/* mock do que está em produção */

describe('LocalSavePurchases', () => {
  test('Should not delete cache on init', () => {
    const cacheStore = new CacheStoreSpy();
    new LocalSavePurchases(cacheStore);
    expect(cacheStore.deleteCallsCount).toBe(0);
  });

  test('Should delete old cache on save', async () => {
    const cacheStore = new CacheStoreSpy();
    const sut = new LocalSavePurchases(cacheStore);
    await sut.save();
    expect(cacheStore.deleteCallsCount).toBe(1);
  });
});
