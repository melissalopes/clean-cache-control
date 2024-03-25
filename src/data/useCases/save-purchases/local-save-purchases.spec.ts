import { ICacheStore } from '@/data/protocols/cache';
import { LocalSavePurchases } from '@/data/useCases';

/* mock do que está em produção */
class CacheStoreSpy implements ICacheStore {
  deleteCallsCount = 0;
  key: string;

  delete(key: string): void {
    this.deleteCallsCount++;
    this.key = key;
  }
}
/* mock do que está em produção */

type SutTypes = {
  sut: LocalSavePurchases;
  cacheStore: CacheStoreSpy;
};

/*  Design Patterns - Factory */
const makeSut = (): SutTypes => {
  const cacheStore = new CacheStoreSpy();
  const sut = new LocalSavePurchases(cacheStore);
  return {
    sut,
    cacheStore,
  };
};
/*  Design Patterns - Factory */

describe('LocalSavePurchases', () => {
  test('Should not delete cache on init', () => {
    const { cacheStore } = makeSut();
    expect(cacheStore.deleteCallsCount).toBe(0);
  });

  test('Should delete old cache on save', async () => {
    const { sut, cacheStore } = makeSut();
    await sut.save();
    expect(cacheStore.deleteCallsCount).toBe(1);
    expect(cacheStore.key).toBe('purchases');
  });
});
