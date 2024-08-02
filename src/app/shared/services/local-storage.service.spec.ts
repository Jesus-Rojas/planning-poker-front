import { LocalStorageService } from './local-storage.service';

fdescribe('LocalStorageService', () => {
  let service: LocalStorageService;
  let store: Record<string, unknown> = {};

  const mockLocalStorage = {
    getItem: jest.fn((key: string) => (store[key] as string) || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    key: jest.fn((index: number) => Object.keys(store)[index] || null),
    get length() {
      return Object.keys(store).length;
    }
  };

  beforeEach(() => {
    service = new LocalStorageService();
    store = {};
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    });
    jest.clearAllMocks();
  });

  it('should remove the game from localStorage', () => {
    store[service.keyGame] = 'exampleGame';
    service.removeGame();
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(service.keyGame);
    expect(store[service.keyGame]).toBeUndefined();
  });

  it('should update the game in localStorage', () => {
    service.updateGame('newGame');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(service.keyGame, 'newGame');
    expect(store[service.keyGame]).toEqual('newGame');
  });

  it('should get the game from localStorage', () => {
    store[service.keyGame] = 'exampleGame';
    expect(service.getGame()).toEqual('exampleGame');
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith(service.keyGame);
  });

  it('should remove the user from localStorage', () => {
    store[service.keyUser] = 'exampleUser';
    service.removeUser();
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(service.keyUser);
    expect(store[service.keyUser]).toBeUndefined();
  });

  it('should update the user in localStorage', () => {
    service.updateUser('newUser');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(service.keyUser, 'newUser');
    expect(store[service.keyUser]).toEqual('newUser');
  });

  it('should get the user from localStorage', () => {
    store[service.keyUser] = 'exampleUser';
    expect(service.getUser()).toEqual('exampleUser');
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith(service.keyUser);
  });

  // Pruebas adicionales para los métodos clear y key
  it('should clear all items in localStorage', () => {
    store[service.keyUser] = 'exampleUser';
    store[service.keyGame] = 'exampleGame';
    mockLocalStorage.clear();
    expect(store).toEqual({});
    expect(mockLocalStorage.clear).toHaveBeenCalled();
  });

  it('should return the key at the specified index in localStorage', () => {
    store[service.keyUser] = 'exampleUser';
    store[service.keyGame] = 'exampleGame';
    expect(mockLocalStorage.key(0)).toEqual(service.keyUser);
    expect(mockLocalStorage.key(1)).toEqual(service.keyGame);
  });
});
